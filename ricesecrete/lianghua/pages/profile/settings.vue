<template>
  <view class="container">
    <view class="con" v-for="(item, index) in settingsList" :key="index" :style="index > 0 ? 'margin-top: 10rpx;' : ''"
      @click="handleRowClick(item.action)">
      <view class="left">{{ item.label }}</view>
      <view class="right">
        <view class="phone" v-if="item.phone">{{ item.phone }}</view>
        <view class="img" v-if="item.avatar"></view>
        <image class="arrow" :src="getImagePath('setting_arrow.png')" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getImagePath } from "@/utils/image.js";

const { t } = useI18n();

const settingsList = ref([
  { label: '头像', avatar: true, action: 'avatar' },
  { label: '昵称', phone: '18932156212', action: 'nickname' },
  { label: '手机号', phone: '18932156212', action: 'phone' },
  { label: '修改支付密码', action: 'changePayPassword' },
  { label: '修改密码', action: 'changePassword' },
  { label: '切换账号', action: 'switchAccount' },
  { label: '退出登录', action: 'logout' }
]);

const handleRowClick = (action) => {
  console.log(`点击了 ${action} 的整行`);
  // 在这里添加具体的点击处理逻辑

  if (action == 'nickname') {
    uni.navigateTo({
      url: '/pages/profile/nickname'
    })
  }

  if (action == 'phone') {
    uni.navigateTo({
      url: '/pages/profile/phone'
    })
  }

  if (action == 'changePayPassword') {
    uni.navigateTo({
      url: '/pages/profile/changePayPassword'
    })
  }

  if (action == 'changePassword') {
    uni.navigateTo({
      url: '/pages/profile/changePassword'
    })
  }

  if (action == 'logout') {
    uni.navigateTo({
      url: '/pages/login/login'
    })
  }
};

onMounted(() => {
  console.log("个人设置页面已加载");
});
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;

  .con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30rpx;
    padding-right: 19rpx;
    height: 100rpx;
    background: #FFFFFF;
    border-radius: 18rpx;
    display: flex;

    .left {
      font-size: 24rpx;
      color: #808080;
      font-weight: 700;
    }

    .right {
      font-size: 24rpx;
      color: #808080;
      font-weight: 700;
      display: flex;
      align-items: center;

      .phone {
        font-size: 22rpx;
        color: #232323;
        letter-spacing: 1px;
        margin-right: 20rpx;
      }

      .img {
        width: 70rpx;
        height: 70rpx;
        background-color: red;
        margin-right: 20rpx;
      }

      .arrow {
        width: 20rpx;
        height: 20rpx;
      }
    }
  }
}
</style>