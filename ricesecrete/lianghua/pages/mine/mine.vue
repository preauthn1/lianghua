<template>
  <view class="container">
    <image class="bg_color" :src="getImagePath('bg_color.png')" />
    <image class="bg_img" :src="getImagePath('my_bg.png')" />
    <view class="user_box">
      <view class="avatr">
        <image class="avatr_img" :src="getImagePath('avatr.png')" />
        <view class="right_box">
          <view class="num_box">
            <view class="phone">{{ formatPhoneNumber(phone) }}</view>
            <view class="num">{{ t('邀请码') }}:648545</view>
          </view>

          <view class="vip_icon">
            <image class="vip_img" :src="getImagePath('vip.png')" />
            <view class="txt">{{ t('免费版') }}</view>
          </view>
        </view>
      </view>
      <view class="dashbord">
        <image class="dashboard_bg" :src="getImagePath('dashboard_bg.png')" />
        <view class="card_box">
          <view class="yue">
            <view class="top">0.00</view>
            <view class="bottom">{{ t('余额') }}</view>
          </view>
          <view class="yue" @click="toyongjin">
            <view class="top">0.00</view>
            <view class="bottom">{{ t('佣金') }}</view>
          </view>
          <view class="yue">
            <view class="top">0</view>
            <view class="bottom">{{ t('积分') }}</view>
          </view>
        </view>
      </view>

      <view class="group">
        <view
          class="icon_group"
          v-for="(item, index) in iconList"
          :key="index"
          @click="handleIconClick(item)"
        >
          <image class="img" :src="getImagePath(item.path)" />
          <view class="txt">{{ item.txt }}</view>
        </view>
      </view>

      <view class="function_area">
        <view
          v-for="(item, index) in functionList"
          :key="index"
          class="function_item"
          @click="handleFunctionClick(item)"
        >
          <view class="left">{{ item.txt }}</view>
          <view class="right">
            <image class="img" :src="getImagePath('arrow.png')" />
          </view>
        </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
import CustomTabBar from "../../components/CustomTabBar.vue";
const { t } = useI18n();

const phone = "18912349654";

const formatPhoneNumber = phoneNumber => {
  if (!phoneNumber) return "";
  if (phoneNumber.length < 11) return phoneNumber;
  return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};

// 使用计算属性来实现动态翻译
const iconList = computed(() => [
  { path: "my_icon1.png", txt: t("会员升级"), route: "/pages/profile/vip" },
  { path: "my_icon2.png", txt: t("USDT充值"), route: "/pages/wallet/wallet" },
  { path: "my_icon3.png", txt: t("邀请好友"), route: "/pages/invite/invite" },
  { path: "my_icon4.png", txt: t("余额明细"), route: null }
]);

const functionList = computed(() => [
  { txt: t("个人设置"), route: "/pages/profile/settings" },
  { txt: t("联系客服"), route: "/pages/contact/contact" },
  { txt: t("问题反馈"), route: "/pages/mine/feedback" },
  { txt: t("帮助中心"), route: "/pages/help/help" },
  { txt: t("关于我们"), route: null },
  { txt: t("切换语言"), route: "/pages/profile/language" },
  { txt: t("下载APP"), route: null }
]);

const handleNavigation = item => {
  if (item.route) {
    uni.navigateTo({ url: item.route });
  } else {
    handleSpecialFunction(item.txt);
  }
};

// 处理没路由的功能
const handleSpecialFunction = txt => {
  // 直接比较翻译后的文本
  if (txt === t("余额明细")) {
    console.log("余额明细----------");
  } else if (txt === t("问题反馈")) {
    console.log("问题反馈----------");
  } else if (txt === t("关于我们")) {
    console.log("关于我们----------");
  }  else if (txt === t("下载APP")) {
    console.log("下载APP----------");
  } else {
    console.log(`${txt} 功能暂未实现`);
  }
};

const handleIconClick = item => {
  handleNavigation(item);
};

const handleFunctionClick = item => {
  handleNavigation(item);
};

const toyongjin = () => {
  uni.navigateTo({
    url: "/pages/mine/yongjin"
  });
};
</script>

<style scoped lang="scss">
.container {
  padding: 0;
  min-height: calc(100vh - 130rpx);

  .bg_color {
    position: absolute;
    right: 0;
    top: 60rpx;
  }

  .bg_img {
    width: 100%;
    height: 480rpx;
    position: absolute;
  }

  .user_box {
    padding: 0 30rpx;
    padding-bottom: 220rpx;

    .avatr {
      display: flex;
      text-align: center;
      position: relative;
      padding-top: 117rpx;
      justify-content: center;
      margin-bottom: 50rpx;

      .avatr_img {
        width: 160rpx;
        height: 160rpx;
        margin-right: 60rpx;
      }

      .right_box {
        display: flex;
        padding-top: 40rpx;

        .num_box {
          display: flex;
          flex-direction: column;
          margin-right: 33rpx;
          letter-spacing: 1rpx;

          .phone {
            font-size: 24rpx;
            color: #292929;
            font-weight: 800;
            margin-bottom: 20rpx;
          }

          .num {
            font-size: 20rpx;
            color: #808080;
          }
        }

        .vip_icon {
          width: 120rpx;
          height: 36rpx;
          background: #fbefd5;
          border-radius: 18rpx;
          border: 1rpx solid #ff9500;
          display: flex;
          align-items: center;

          .vip_img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }

          .txt {
            font-size: 20rpx;
            color: #ff9500;
          }
        }
      }
    }

    .dashbord {
      position: relative;
      width: 100%;
      margin-bottom: 50rpx;

      .dashboard_bg {
        height: 170rpx;
        width: 100%;
      }

      .card_box {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: space-around;

        .yue {
          text-align: center;

          .top {
            font-size: 28rpx;
            color: #292929;
          }

          .bottom {
            font-size: 24rpx;
            color: #808080;
          }
        }
      }
    }

    .group {
      display: flex;
      justify-content: space-around;
      margin-bottom: 50rpx;

      .icon_group {
        display: flex;
        flex-direction: column;
        align-items: center;

        .img {
          width: 40rpx;
          height: 40rpx;
          margin-bottom: 16rpx;
        }

        .txt {
          font-size: 24rpx;
          color: #292929;
        }
      }
    }

    .function_area {
      height: 700rpx;
      background: #ffffff;
      border-radius: 30rpx;
      justify-content: space-between;

      .function_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100rpx;
        padding: 0 26rpx;

        .left {
          font-size: 28rpx;
          color: #333;
        }

        .right {
          .img {
            width: 32rpx;
            height: 32rpx;
          }
        }
      }
    }
  }
}
</style>