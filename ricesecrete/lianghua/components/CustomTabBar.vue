<template>
  <view class="custom-tab-bar">
    <view class="tab-item" :class="{ active: currentPath === item.pagePath }" v-for="(item, index) in tabBarList"
      :key="index" @click="switchTab(item.pagePath)">
      <image :src="currentPath === item.pagePath ? item.selectedIconPath : item.iconPath" />
      <text v-if="currentPath === item.pagePath" class="active">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
import { onShow } from '@dcloudio/uni-app';

// 定义 tabBar 列表
const tabBarList = [
  {
    text: "首页",
    pagePath: "/pages/home/home",
    iconPath: "/static/image/tabbar/tab1.png",
    selectedIconPath: "/static/image/tabbar/tab1_1.png"
  },
  {
    text: "绑定",
    pagePath: "/pages/bind/bind",
    iconPath: "/static/image/tabbar/tab2.png",
    selectedIconPath: "/static/image/tabbar/tab2_1.png"
  },
  {
    text: "策略",
    pagePath: "/pages/strategy/strategy",
    iconPath: "/static/image/tabbar/tab3.png",
    selectedIconPath: "/static/image/tabbar/tab3_1.png"
  },
  {
    text: "我的",
    pagePath: "/pages/mine/mine",
    iconPath: "/static/image/tabbar/tab4.png",
    selectedIconPath: "/static/image/tabbar/tab4_1.png"
  }
];

// 当前页面路径
const currentPath = ref("");

const switchTab = url => {
  const fullPath = url.startsWith('/') ? url : '/' + url;
  uni.switchTab({ url: fullPath });
};

// 更新当前路径的方法
const updateCurrentPath = () => {
  console.log("尝试更新当前路径");
  try {
    const pages = getCurrentPages();
    console.log("当前页面信息:", pages);

    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1];
      // 注意：这里可能需要根据实际路由情况调整
      const route = currentPage.route || currentPage.$page.fullPath || "";
      currentPath.value = route.startsWith("/") ? route : "/" + route;
      console.log("当前路径:", currentPath.value);
    }
  } catch (e) {
    console.error("获取当前页面路径失败:", e);
  }
};

// 在挂载时更新路径
onMounted(() => {
  console.log("组件挂载时更新路径");
  updateCurrentPath();
});

// 监听页面显示事件，确保路径更新
onShow(() => {
  console.log("页面显示时更新路径");
  updateCurrentPath();
});
</script>

<style scoped>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 130rpx;
  background-color: #232323;
  border-radius: 0rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
  padding-left: 115rpx;
  padding-right: 115rpx;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-item.active {
  width: 180rpx;
  height: 70rpx;
  border-radius: 35rpx;
  border: 1rpx solid #FFFFFF;
}

.tab-item image {
  width: 50rpx;
  height: 50rpx;
  margin-right: 15rpx;
}

.tab-item text {
  color: #767676;
  font-size: 24rpx;
}

.tab-item text.active {
  color: #FFFFFF;
}
</style>