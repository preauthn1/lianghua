// utils/websocket.js
class WebSocketClient {
    constructor(url, options = {}) {
        this.url = url;
        this.options = {
            heartbeatInterval: 30000, // 心跳间隔30秒
            reconnectInterval: 5000, // 重连间隔5秒
            maxReconnectTimes: 5, // 最大重连次数
            enableHeartbeat: false, // 默认禁用心跳，因为OKX不需要
            ...options
        };

        this.ws = null;
        this.reconnectTimes = 0;
        this.heartbeatTimer = null;
        this.reconnectTimer = null;
        this.isConnected = false;
        this.messageQueue = []; // 消息队列

        // 事件监听器
        this.onOpenCallbacks = [];
        this.onMessageCallbacks = [];
        this.onCloseCallbacks = [];
        this.onErrorCallbacks = [];
    }

    // 连接WebSocket
    connect() {
        try {
            this.ws = uni.connectSocket({
                url: this.url,
                success: () => {
                    console.log('WebSocket 连接初始化成功');
                },
                fail: (err) => {
                    console.error('WebSocket 连接失败:', err);
                    this.handleReconnect();
                }
            });

            this.ws.onOpen(() => {
                console.log('WebSocket 连接已打开');
                this.isConnected = true;
                this.reconnectTimes = 0;

                // 只有启用心跳时才开始心跳
                if (this.options.enableHeartbeat) {
                    this.startHeartbeat();
                }

                // 发送队列中的消息
                this.flushMessageQueue();

                // 触发onOpen回调
                this.onOpenCallbacks.forEach(callback => callback());
            });

            this.ws.onMessage((res) => {
                console.log('收到WebSocket消息:', res.data);
                let data = res.data;

                // 处理pong响应（字符串形式）
                if (data === 'pong') {
                    console.log('收到心跳响应');
                    return;
                }

                // 尝试解析JSON
                try {
                    data = JSON.parse(res.data);
                } catch (e) {
                    // 如果不是JSON，保持原样
                    console.log(e, '如果不是JSON，保持原样');
                }

                // 处理心跳响应
                if (data.type === 'pong') {
                    return;
                }

                // 触发onMessage回调
                this.onMessageCallbacks.forEach(callback => callback(data));
            });

            this.ws.onClose((res) => {
                console.log('WebSocket 连接已关闭:', res);
                this.isConnected = false;
                this.stopHeartbeat();

                // 触发onClose回调
                this.onCloseCallbacks.forEach(callback => callback(res));

                // 如果不是主动关闭，尝试重连
                if (res.code !== 1000) {
                    this.handleReconnect();
                }
            });

            this.ws.onError((err) => {
                console.error('WebSocket 错误:', err);
                this.isConnected = false;

                // 触发onError回调
                this.onErrorCallbacks.forEach(callback => callback(err));

                this.handleReconnect();
            });

        } catch (error) {
            console.error('创建WebSocket连接失败:', error);
            this.handleReconnect();
        }
    }

    // 发送消息
    send(data) {
        const message = typeof data === 'string' ? data : JSON.stringify(data);

        if (this.isConnected && this.ws) {
            this.ws.send({
                data: message,
                success: () => {
                    console.log('消息发送成功:', message);
                },
                fail: (err) => {
                    console.error('消息发送失败:', err);
                    // 将失败的消息加入队列
                    this.messageQueue.push(message);
                }
            });
        } else {
            // 连接断开时，将消息加入队列
            this.messageQueue.push(message);
            console.log('连接断开，消息已加入队列');
        }
    }

    // 发送队列中的消息
    flushMessageQueue() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.send(message);
        }
    }

    // 开始心跳
    startHeartbeat() {
        this.stopHeartbeat();
        this.heartbeatTimer = setInterval(() => {
            // if (this.isConnected) {
            //     this.send({ type: 'ping', timestamp: Date.now() });
            // }
            if (this.isConnected) {
                // 发送字符串形式的ping
                this.send('ping');
            }
        }, this.options.heartbeatInterval);
    }

    // 停止心跳
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    // 处理重连
    handleReconnect() {
        if (this.reconnectTimes >= this.options.maxReconnectTimes) {
            console.error('已达到最大重连次数，停止重连');
            return;
        }

        this.reconnectTimes++;
        console.log(`第${this.reconnectTimes}次重连中...`);

        this.reconnectTimer = setTimeout(() => {
            this.connect();
        }, this.options.reconnectInterval);
    }

    // 关闭连接
    close() {
        this.stopHeartbeat();

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }

        if (this.ws) {
            this.ws.close({
                code: 1000,
                reason: '客户端主动关闭'
            });
        }

        this.isConnected = false;
    }

    // 事件监听方法
    onOpen(callback) {
        this.onOpenCallbacks.push(callback);
    }

    onMessage(callback) {
        this.onMessageCallbacks.push(callback);
    }

    onClose(callback) {
        this.onCloseCallbacks.push(callback);
    }

    onError(callback) {
        this.onErrorCallbacks.push(callback);
    }
}

export default WebSocketClient;