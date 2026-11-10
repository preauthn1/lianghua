<template>
  <view class="container">
    <image class="bg_color" :src="getImagePath('bg_color.png')" />
    <view class="title">
      <view class="txt1">XX</view>
      <view class="txt1" style="margin-bottom: 0;">官网:www.ifnfgvg.com</view>
    </view>

    <scroll-view class="chat-messages" scroll-y :scroll-top="scrollTop">
      <view class="date">2025年08月19日 16:45:21</view>

      <view class="message-item customer-service-message">
        <view class="touxiang"></view>
        <view class="message_content">您好,欢迎使用xx在线客服,很高兴为您服务,请问有什么可用帮到您</view>
      </view>

      <view class="date" style="margin-bottom: 50rpx;">昨天 13:25</view>

      <view class="message-item user-message">
        <view class="message_content">您好?</view>
      </view>

      <view class="message-item customer-service-message">
        <view class="touxiang"></view>
        <view class="message_content">您好?</view>
      </view>

      <view v-for="(message, index) in messages" :key="index" class="message-item"
        :class="message.sender === 'user' ? 'user-message' : 'customer-service-message'">
        <view v-if="message.sender !== 'user'" class="touxiang"></view>
        <view class="message_content">
          <image v-if="message.type === 'image'" :src="message.content" mode="aspectFit" class="message-image" />
          <text v-else>{{ message.content }}</text>
        </view>
      </view>
    </scroll-view>

    <view class="message_input_container">
      <view v-if="showEmojiPanel" class="emoji-panel">
        <view class="emoji-grid">
          <view v-for="emoji in emojiList" :key="emoji" class="emoji-item" @click="selectEmoji(emoji)">
            {{
              emoji }}
          </view>
        </view>
      </view>
      <view class="input-actions">
        <image class="action-icon" :src="getImagePath('picture.png')" @click="sendImage" />
        <image class="action-icon" :src="getImagePath('expression.png')" @click="sendEmoji" />
      </view>

      <view class="input-box">
        <input v-model="inputMessage" class="message-input" type="text" placeholder="请输入" confirm-type="send"
          @confirm="sendMessage" />
        <button class="send-button" @click="sendMessage">发送</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
import WebSocketClient from "@/utils/websocket.js";
const { t } = useI18n();

const messages = ref([]);
const showEmojiPanel = ref(false);
const scrollTop = ref(0);
const inputMessage = ref("");
const wsClient = ref(null);
const connectionStatus = ref('disconnected'); // disconnected, connecting, connected

const emojiList = [
  "😀",
  "😊",
  "😂",
  "🤣",
  "😍",
  "🥰",
  "😘",
  "😋",
  "😎",
  "🤔",
  "😴",
  "😇",
  "👍",
  "👎",
  "👌",
  "✌️",
  "🤞",
  "👏",
  "🙌",
  "❤️",
  "💕",
  "💖",
  "💗",
  "💙",
  "💚",
  "💛",
  "🧡",
  "💜",
  "🖤",
  "🤍"
];

// 初始化WebSocket连接
const initWebSocket = () => {
  const token = uni.getStorageSync('token');
  const wsUrl = `wss://your-websocket-server.com/chat?token=${token}`;

  wsClient.value = new WebSocketClient(wsUrl);

  wsClient.value.onOpen(() => {
    console.log('客服WebSocket连接成功');
    connectionStatus.value = 'connected';

    // 发送用户信息
    wsClient.value.send({
      type: 'user_join',
      userId: uni.getStorageSync('userId') || 'anonymous',
      timestamp: Date.now()
    });
  });

  wsClient.value.onMessage((data) => {
    console.log('收到客服消息:', data);

    if (data.type === 'message') {
      // 收到新消息
      addMessageToChat({
        type: data.messageType || 'text',
        content: data.content,
        sender: data.sender === 'user' ? 'user' : 'customer-service',
        timestamp: data.timestamp,
        messageId: data.messageId
      });
    } else if (data.type === 'typing') {
      // 处理正在输入状态
      handleTypingStatus(data);
    } else if (data.type === 'user_join') {
      // 处理用户加入
      console.log('用户加入聊天:', data.userId);
    }
  });

  wsClient.value.onClose((res) => {
    console.log('客服WebSocket连接关闭:', res);
    connectionStatus.value = 'disconnected';
  });

  wsClient.value.onError((err) => {
    console.error('客服WebSocket错误:', err);
    connectionStatus.value = 'disconnected';
  });

  connectionStatus.value = 'connecting';
  wsClient.value.connect();
};

// 发送WebSocket消息
const sendWebSocketMessage = (messageData) => {
  if (wsClient.value && connectionStatus.value === 'connected') {
    wsClient.value.send({
      type: 'message',
      messageType: messageData.type,
      content: messageData.content,
      sender: 'user',
      timestamp: Date.now(),
      messageId: Date.now().toString()
    });
  } else {
    console.warn('WebSocket未连接，无法发送消息');
    uni.showToast({
      title: '网络连接断开，请稍后重试',
      icon: 'none'
    });
  }
};

// 发送消息
const sendMessage = () => {
  if (inputMessage.value.trim()) {
    const messageData = {
      type: "text",
      content: inputMessage.value,
      sender: "user"
    };

    // 添加到本地聊天
    addMessageToChat(messageData);

    // 通过WebSocket发送
    sendWebSocketMessage(messageData);

    inputMessage.value = "";
  }
};

// 选择表情函数
const selectEmoji = emoji => {
  inputMessage.value += emoji;
  showEmojiPanel.value = false;
};

const sendEmoji = () => {
  console.log("点击了发送表情");
  showEmojiPanel.value = !showEmojiPanel.value;
};

// 发送图片
const sendImage = () => {
  console.log("点击了发送图片");

  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: res => {
      const tempFilePath = res.tempFilePaths[0];

      // 上传图片
      uni.uploadFile({
        url: "https://your-api-endpoint/upload",
        filePath: tempFilePath,
        name: "image",
        header: {
          'Authorization': 'Bearer ' + uni.getStorageSync('token')
        },
        success: uploadRes => {
          try {
            const result = JSON.parse(uploadRes.data);

            const imageMessage = {
              type: "image",
              content: result.imageUrl,
              sender: "user"
            };

            // 添加到本地聊天
            addMessageToChat(imageMessage);

            // 通过WebSocket发送
            sendWebSocketMessage(imageMessage);

          } catch (error) {
            console.error("解析上传结果失败:", error);
            uni.showToast({
              title: "图片上传失败",
              icon: "none"
            });
          }
        },
        fail: error => {
          console.error("图片上传失败:", error);
          uni.showToast({
            title: "图片上传失败",
            icon: "none"
          });
        }
      });
    },
    fail: error => {
      console.log("chooseImage fail 回调触发:", error);

      if (error.errMsg && (error.errMsg.includes('cancel') || error.errMsg.includes('用户取消'))) {
        console.log("用户取消选择图片");
        return;
      }

      console.error("选择图片失败:", error);
      uni.showToast({
        title: "选择图片失败",
        icon: "none",
        duration: 2000
      });
    }
  });
};

// 添加消息到聊天
const addMessageToChat = message => {
  messages.value.push({
    ...message,
    timestamp: new Date().toLocaleTimeString(),
    id: Date.now() // 添加唯一ID
  });

  // 滚动到底部
  nextTick(() => {
    scrollToBottom();
  });
};

// 滚动到底部
const scrollToBottom = () => {
  uni.createSelectorQuery().select(".chat-messages").boundingClientRect(rect => {
    if (rect) {
      scrollTop.value = rect.height;
    }
  }).exec();
};

// 生命周期钩子
onMounted(() => {
  // initWebSocket();
});

onUnmounted(() => {
  if (wsClient.value) {
    wsClient.value.close();
  }
});
</script>

<style scoped lang="scss">
.container {
  padding: 0 15rpx;
  min-height: 100vh;

  .bg_color {
    position: absolute;
    right: 0;
    top: 60rpx;
  }

  .title {
    position: relative;
    box-sizing: border-box;
    height: 180rpx;
    background: #ffffff;
    padding-top: 44rpx;
    padding-left: 44rpx;
    margin-bottom: 30rpx;

    .txt1 {
      font-size: 26rpx;
      color: #000000;
      letter-spacing: 1px;
      font-weight: 600;
      margin-bottom: 20rpx;
    }
  }

  .chat-messages {
    overflow-y: auto;
    height: calc(100vh - 300rpx);
    /* 给聊天区域设置固定高度 */
    padding-bottom: 20rpx;

    .date {
      font-size: 24rpx;
      color: #808080;
      letter-spacing: 1px;
      text-align: center;
      margin-bottom: 26rpx;
    }

    .message-item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      padding-right: 76rpx;

      .touxiang {
        width: 80rpx;
        height: 80rpx;
        background-color: pink;
        margin-right: 20rpx;
        flex-shrink: 0;
      }

      .message_content {
        font-size: 24rpx;
        color: #232323;
        letter-spacing: 1px;
        background: #ffffff;
        padding: 21rpx 30rpx;
        box-sizing: border-box;

        max-width: 500rpx;
        word-wrap: break-word;

        .message-image {
          max-width: 200rpx;
          max-height: 200rpx;
          border-radius: 6rpx;
        }
      }
    }

    .user-message {
      //   justify-content: flex-end;

      justify-content: flex-end;
      padding-right: 0;
      padding-left: 76rpx;

      .message_content {
        background: #22ad78;
        color: #ffffff;
      }
    }
  }

  .message_input_container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #ffffff;
    padding: 22rpx 10rpx 50rpx 30rpx;

    .emoji-panel {
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      background: #ffffff;
      border-top: 1rpx solid #e5e5e5;
      padding: 20rpx;
      max-height: 400rpx;

      .emoji-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 20rpx;

        .emoji-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60rpx;
          height: 60rpx;
          font-size: 40rpx;
          border-radius: 10rpx;
          background: #f5f5f5;
          cursor: pointer;

          &:active {
            background: #e0e0e0;
          }
        }
      }
    }

    .input-actions {
      display: flex;
      margin-bottom: 25rpx;

      .action-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
    }

    .input-box {
      display: flex;
      align-items: center;
      letter-spacing: 1px;
      font-size: 24rpx;
      font-weight: 600;

      .message-input {
        width: 530rpx;
        height: 84rpx;
        background: #f3f4f8;
        border-radius: 10rpx;
        color: #aaaaaa;
        padding-left: 25rpx;
        box-sizing: border-box;
        margin-right: 10rpx;
      }

      .send-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 170rpx;
        height: 76rpx;
        background: #22ad78;
        border-radius: 10rpx;
        color: #ffffff;
      }
    }
  }
}
</style>