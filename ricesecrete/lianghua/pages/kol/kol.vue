<template>
  <view class="kol">
    <image :src="getImagePath('kol_bg.png')" class="bg_img" />
    <view class="content">
      <view class="title">
        <view>TO DINF YOU</view>
        <view class="title_text" style="margin-left: 10rpx;">{{ t('XX招募') }}</view>
      </view>

      <view class="img_box">
        <image :src="getImagePath('kol_bg1.png')" class="img" />
        <view class="txt">{{ t('XX博主') }}</view>
        <view class="txt2">{{ t('高额佣金') }}</view>
      </view>

      <view class="bg_box">
        <image :src="getImagePath('kol_bg2.png')" class="img" />
        <view class="con_box">
          <view class="txt1">{{ t('招募要求') }}</view>
          <view class="txt2">{{ t('要求在主流社交媒体平台有一定粉丝量、高互动率,具备优秀内容创作能力、与品牌高度契合且有良好合作态度与职业操守的博主。') }}</view>
          <view class="txt1">{{ t('其他要求') }}</view>
          <view class="txt2">{{ t('有一定营销能力、深入了解加密货币与Ai量化交易、具备内容创作能力、与品牌契合且合作态度良好的 KOL。') }}</view>
          <view class="txt1">{{ t('您将获得') }}</view>
          <!-- <view
            class="txt2"
            v-html="formatContent(t('1.可定制化付费模式、分佣比例、分销层级;<br />2.多种带单工具、代理商管理后台提供;<br />3.可独立带单,设置抽佣比例等多种扣费模式;<br />4.首单立返50-150U,永久分成最高50%!'))"
          ></view>-->
          <view class="txt2" v-html="formatContent(t('您将获得内容'))"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const formatContent = content => {
  return content.replace(/\n/g, "<br>");
};
</script>

<style scoped lang="scss">
.kol {
  box-sizing: border-box;
  min-height: 100vh;

  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    height: 1421rpx;
    background-color: #dc21b8;
  }

  .content {
    padding-top: 344rpx;
    padding-left: 34rpx;
    position: relative;

    .title {
      font-size: 74rpx;
      color: #ffffff;
      transform: skew(-10deg);
      margin-bottom: 20rpx;

      .title_text {
        margin-left: 10rpx;
      }
    }

    .img_box {
      position: relative;
      margin-bottom: 31rpx;

      .img {
        width: 500rpx;
        height: 90rpx;
      }

      .txt {
        position: absolute;
        top: 14rpx;
        left: 24rpx;
        font-size: 50rpx;
        color: #232323;
        letter-spacing: 2px;
        font-weight: 800;
      }

      .txt2 {
        position: absolute;
        top: 20rpx;
        right: 240rpx;
        font-size: 40rpx;
        color: #ffffff;
        letter-spacing: 4px;
        font-weight: 800;
        transform: skew(-10deg);
      }
    }

    .bg_box {
      position: relative;
      width: 686rpx;

      .img {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 662rpx;
      }

      .con_box {
        padding-top: 79rpx;
        color: #ffffff;
        letter-spacing: 1px;
        padding-left: 24rpx;
        padding-right: 24rpx;

        .txt1 {
          font-weight: 800;
          font-size: 30rpx;
          margin-bottom: 10rpx;
        }

        .txt2 {
          font-size: 24rpx;
          margin-bottom: 40rpx;
        }
      }
    }
  }
}
</style>