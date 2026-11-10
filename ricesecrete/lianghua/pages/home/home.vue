<template>
  <view class="container">
    <uv-status-bar></uv-status-bar>
    <image class="bg_color" :src="getImagePath('bg_color.png')" />

    <view class="banner">
      <image class="banner-image" :src="getImagePath('shouyebg.png')" />
    </view>
    <view class="grid_box">
      <view class="grid_item" v-for="item in gridItems" :key="item.id" @click="handleGridItemClick(item)">
        <image class="grid_icon" :src="getImagePath(item.path)" />
        <text class="grid_text" :class="{ 'english_txt': currentLang === 'en' }">{{ t(item.text) }}</text>
      </view>
    </view>

    <view class="hangqing">
      <view class="title">{{ t('最新行情') }}
      </view>
      <view class="hangqing_box">
        <view class="hang1">
          <view class="hang1_left">
            <view>{{ t('币种') }}</view>
          </view>
          <view class="hang1_right">
            <view class="new">{{ t('最新价') }}</view>
            <view class>{{ t('24小时涨跌幅') }}</view>
          </view>
        </view>
        <view class="con" v-for="item in marketData" :key="item.instId">
          <view class="left">
            <image class="icon_money" :src="getImagePath(item.icon)" />
            <view class="zm">
              <view class="big">{{ item.name }} /&nbsp;</view>
              <view class="sml">{{ item.unit }}</view>
            </view>
          </view>
          <view class="right">
            <view class="num" :class="{ 'price-updating': item.priceUpdating }">{{ formatPrice(item.price) }}</view>
            <view class="biaoqian" :style="{ background: item.change >= 0 ? '#16AB16' : '#EC3329' }">
              <view class="txt">{{ formatChange(item.change) }}%</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
import CustomTabBar from "../../components/CustomTabBar.vue";
import WebSocketClient from "@/utils/websocket.js";

const { t, locale } = useI18n();

// 获取当前语言
const currentLang = computed(() => locale.value);

// WebSocket相关状态
const wsConnected = ref(false);
const wsClient = ref(null);
const subscriptionId = ref(0);

const gridItems = ref([
  { id: 1, path: "icon_1.png", text: "API绑定", route: "/pages/bind/bind" },
  { id: 2, path: "icon_2.png", text: "Kol招募", route: "/pages/kol/kol" },
  {
    id: 3,
    path: "icon_3.png",
    text: "邀请好友",
    route: "/pages/invite/invite"
  },
  { id: 4, path: "icon_4.png", text: "帮助中心", route: "/pages/help/help" },
  {
    id: 5,
    path: "icon_5.png",
    text: "秒级跟单",
    route: "/pages/strategy/strategy"
  },
  {
    id: 6,
    path: "icon_6.png",
    text: "AI策略",
    route: "/pages/strategy/strategy"
  },
  {
    id: 7,
    path: "icon_7.png",
    text: "联系客服",
    route: "/pages/contact/contact"
  },
  {
    id: 8,
    path: "icon_8.png",
    text: "下载APP",
    route: "/pages/download/download"
  }
]);

const marketData = ref([
  {
    instId: "BTC-USDT",
    icon: "btc.png",
    name: "BTC",
    unit: "USDT",
    price: "0",
    change: 0,
    open24h: "0",
    high24h: "0",
    low24h: "0",
    priceUpdating: false
  },
  {
    instId: "ETH-USDT",
    icon: "eth.png",
    name: "ETH",
    unit: "USDT",
    price: "0",
    change: 0,
    open24h: "0",
    high24h: "0",
    low24h: "0",
    priceUpdating: false
  },
  {
    instId: "BNB-USDT",
    icon: "bnb.png",
    name: "BNB",
    unit: "USDT",
    price: "0",
    change: 0,
    open24h: "0",
    high24h: "0",
    low24h: "0",
    priceUpdating: false
  },
  {
    instId: "ADA-USDT",
    icon: "ada.png",
    name: "ADA",
    unit: "USDT",
    price: "0",
    change: 0,
    open24h: "0",
    high24h: "0",
    low24h: "0",
    priceUpdating: false
  },
  {
    instId: "SOL-USDT",
    icon: "sol.png",
    name: "SOL",
    unit: "USDT",
    price: "0",
    change: 0,
    open24h: "0",
    high24h: "0",
    low24h: "0",
    priceUpdating: false
  }
]);

const tabPages = [
  "/pages/home/home",
  "/pages/bind/bind",
  "/pages/strategy/strategy",
  "/pages/mine/mine"
];

// 初始化WebSocket连接
const initWebSocket = () => {
  try {
    const wsUrl = "wss://ws.okx.com/ws/v5/public";

    wsClient.value = new WebSocketClient(wsUrl, {
      heartbeatInterval: 30000,
      reconnectInterval: 5000,
      maxReconnectTimes: 10,
      enableHeartbeat: false
    });

    // 连接成功回调
    wsClient.value.onOpen(() => {
      console.log("WebSocket连接成功");
      wsConnected.value = true;

      // 订阅所有币种的行情数据
      subscribeMarketData();

      // uni.showToast({
      //   title: "行情连接成功",
      //   icon: "success",
      //   duration: 2000
      // });
    });

    // 消息接收回调
    wsClient.value.onMessage(data => {
      handleMarketData(data);
    });

    // 连接关闭回调
    wsClient.value.onClose(() => {
      console.log("WebSocket连接关闭");
      wsConnected.value = false;
    });

    // 连接错误回调
    wsClient.value.onError(error => {
      console.error("WebSocket连接错误:", error);
      wsConnected.value = false;

      uni.showToast({
        title: "行情连接失败",
        icon: "none",
        duration: 2000
      });
    });

    // 开始连接
    wsClient.value.connect();
  } catch (error) {
    console.error("初始化WebSocket失败:", error);
    uni.showToast({
      title: "初始化失败",
      icon: "none"
    });
  }
};

// 订阅行情数据
const subscribeMarketData = () => {
  marketData.value.forEach(item => {
    const subscribeMsg = {
      id: (++subscriptionId.value).toString(),
      op: "subscribe",
      args: [
        {
          channel: "index-tickers",
          instId: item.instId
        }
      ]
    };

    console.log("订阅行情:", subscribeMsg);
    wsClient.value.send(subscribeMsg);
  });
};

// 处理行情数据
const handleMarketData = data => {
  try {
    // 处理订阅响应
    if (data.event === "subscribe") {
      console.log("订阅成功:", data.arg.instId);
      return;
    }

    // 处理错误响应
    if (data.event === "error") {
      console.error("订阅错误:", data.msg);
      uni.showToast({
        title: "订阅失败: " + data.msg,
        icon: "none"
      });
      return;
    }

    // 处理行情推送数据
    if (data.arg && data.arg.channel === "index-tickers" && data.data) {
      data.data.forEach(tickerData => {
        updateMarketItem(tickerData);
      });
    }
  } catch (error) {
    console.error("处理行情数据错误:", error);
  }
};

// 更新单个行情项目
const updateMarketItem = tickerData => {
  const { instId, idxPx, open24h, high24h, low24h } = tickerData;

  const itemIndex = marketData.value.findIndex(item => item.instId === instId);
  if (itemIndex !== -1) {
    const item = marketData.value[itemIndex];
    const oldPrice = parseFloat(item.price);
    const newPrice = parseFloat(idxPx);
    const openPrice = parseFloat(open24h);

    // 计算24小时涨跌幅
    const changePercent = openPrice > 0 ? ((newPrice - openPrice) / openPrice) * 100 : 0;

    // 更新数据
    marketData.value[itemIndex] = {
      ...item,
      price: idxPx,
      change: changePercent,
      open24h: open24h,
      high24h: high24h,
      low24h: low24h,
      priceUpdating: true
    };

    // 价格更新动画效果
    setTimeout(() => {
      if (marketData.value[itemIndex]) {
        marketData.value[itemIndex].priceUpdating = false;
      }
    }, 500);

    console.log(
      `${instId} 价格更新:`,
      newPrice,
      "涨跌幅:",
      changePercent.toFixed(2) + "%"
    );
  }
};

// 格式化价格显示
const formatPrice = price => {
  const num = parseFloat(price);
  if (isNaN(num) || num === 0) return "--";

  if (num >= 1000) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } else if (num >= 1) {
    return num.toFixed(4);
  } else {
    return num.toFixed(6);
  }
};

// 格式化涨跌幅显示
const formatChange = change => {
  const num = parseFloat(change);
  if (isNaN(num)) return "0.00";

  const formatted = Math.abs(num).toFixed(2);
  return num >= 0 ? `+${formatted}` : `-${formatted}`;
};

// 统一的导航处理函数
const handleNavigation = item => {
  if (item.route) {
    // 判断是否是tab页面
    if (tabPages.includes(item.route)) {
      uni.switchTab({ url: item.route });
    } else {
      uni.navigateTo({ url: item.route });
    }
  } else {
    // 处理没有路由的特殊功能
    handleSpecialFunction(item.text);
  }
};

// 处理特殊功能
const handleSpecialFunction = text => {
  switch (text) {
    case "秒级跟单":
      uni.showToast({
        title: "秒级跟单功能开发中",
        icon: "none"
      });
      break;
    default:
      console.log(`${text} 功能暂未实现`);
  }
};

// 网格项点击处理
const handleGridItemClick = item => {
  handleNavigation(item);
  console.log("点击了:", item.text);
};

// 生命周期
onMounted(() => {
  console.log("首页加载完成，初始化WebSocket");
  // 延迟初始化，确保页面完全加载
  // setTimeout(() => {
  //   initWebSocket();
  // }, 1000);
});

onUnmounted(() => {
  console.log("首页卸载，关闭WebSocket连接");
  if (wsClient.value) {
    wsClient.value.close();
    wsClient.value = null;
  }
});
</script>

<style scoped lang="scss">
.container {
  .bg_color {
    position: absolute;
    right: 0;
    top: 60rpx;
  }

  .banner {
    width: 100%;
    height: 266rpx;
    padding-bottom: 20rpx;
    position: relative;

    .banner-image {
      width: 100%;
      height: 100%;
    }
  }

  .grid_box {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20rpx;
    background: #ffffff;
    border-radius: 42rpx;
    padding: 20rpx 0;

    .grid_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      grid-gap: 16rpx;

      .grid_icon {
        width: 40rpx;
        height: 40rpx;
      }

      .grid_text {
        font-size: 24rpx;
        color: #292929;
      }

      .english_txt {
        font-size: 22rpx;
      }
    }
  }

  .hangqing {
    padding-top: 20rpx;

    .title {
      margin-bottom: 20rpx;
      font-size: 24rpx;
      color: #808080;
      padding-left: 34rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 34rpx;

      .connection-status {
        display: flex;
        align-items: center;
        font-size: 20rpx;

        .status-dot {
          width: 12rpx;
          height: 12rpx;
          border-radius: 50%;
          margin-right: 8rpx;
          background-color: #ccc;
        }

        &.connected .status-dot {
          background-color: #16ab16;
          animation: pulse 2s infinite;
        }

        &.disconnected .status-dot {
          background-color: #ec3329;
        }

        .status-text {
          color: #808080;
        }
      }
    }

    .hangqing_box {
      padding-bottom: 140rpx;

      .hang1 {
        display: flex;
        justify-content: space-between;
        font-size: 24rpx;
        color: #292929;
        font-weight: 700;
        margin-bottom: 20rpx;
        padding: 0 34rpx;

        .hang1_right {
          display: flex;

          .new {
            margin-right: 73rpx;
          }
        }
      }

      .con {
        height: 108rpx;
        padding-left: 34rpx;
        background: #ffffff;
        border-radius: 22rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10rpx;

        .left {
          display: flex;
          align-items: center;

          .icon_money {
            width: 50rpx;
            height: 50rpx;
            margin-right: 20rpx;
          }

          .zm {
            display: flex;
            align-items: baseline;

            .big {
              font-weight: 600;
              font-size: 24rpx;
              color: #000;
            }

            .sml {
              font-weight: 500;
              font-size: 20rpx;
              color: #8a8a90;
            }
          }
        }

        .right {
          display: flex;
          align-items: center;

          .num {
            font-weight: 600;
            font-size: 24rpx;
            color: #292929;
            margin-right: 71rpx;
            transition: all 0.3s ease;

            &.price-updating {
              color: #1890ff;
              transform: scale(1.05);
            }
          }

          .biaoqian {
            margin-right: 50rpx;
            width: 120rpx;
            height: 50rpx;
            line-height: 50rpx;
            text-align: center;
            border-radius: 10rpx;

            .txt {
              font-size: 24rpx;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>