<template>
  <view class="container">
    <image class="bg_color" :src="getImagePath('bg_color.png')" />
    <uv-status-bar></uv-status-bar>

    <view class="title">{{ activeTab === 'tab1' ? t('API授权') : t('交易所开户') }}</view>

    <view class="tabs">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab"
        :class="{ active: activeTab === tab.key }"
        @click="switchTab(tab.key)"
      >{{ t(tab.label) }}</view>
    </view>

    <view class="content">
      <view
        v-for="item in currentTabData"
        :key="item.id"
        class="con"
        @click="handleItemAction(item)"
      >
        <view class="left">
          <image class="icon_money" :src="getImagePath(item.icon)" />
          <view class="zm">
            <view class="big">{{ t(item.name) }}</view>
          </view>
        </view>
        <view
          class="bind_box"
          :style="{ backgroundColor: activeTab === 'tab1' ? '#22ad78' : 'blue' }"
        >
          <view class="bind">{{ activeTab === 'tab1' ? t('绑定') : t('开户') }}</view>
        </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
import CustomTabBar from "../../components/CustomTabBar.vue";

const { t } = useI18n();

const tabs = ref([
  { key: "tab1", label: "API授权" },
  { key: "tab2", label: "交易所开户" }
]);

const activeTab = ref("tab1");

const marketData = ref([
  { id: 1, icon: "bian.png", name: "Binance - 币安" },
  { id: 2, icon: "oxk.png", name: "OKX - 欧易" },
  { id: 3, icon: "bitget.png", name: "Bitget" },
  { id: 4, icon: "gate.png", name: "Gate.io" },
  { id: 5, icon: "bybit.png", name: "Bybit" },
  { id: 6, icon: "coinbase.png", name: "Coinbase" }
]);

const jiaoyisuokaihu = ref([
  {
    id: 1,
    icon: "bina.png",
    name: "通过该链接注册Binance赠送100U"
  },
  {
    id: 2,
    icon: "oxk.png",
    name: "通过该链接注册OKX赠送100U"
  }
]);

const currentTabData = computed(() =>
  activeTab.value === "tab1" ? marketData.value : jiaoyisuokaihu.value
);

const switchTab = tab => {
  activeTab.value = tab;
};

const handleItemAction = item => {
  if (activeTab.value === "tab1") {
    handleBind(item);
  } else {
    handleOpenAccount(item);
  }
};

const handleBind = item => {
  console.log("绑定", item.name);
};

const handleOpenAccount = item => {
  console.log("开户", item.name);
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;

  .bg_color {
    position: absolute;
    right: 0;
    top: 60rpx;
  }

  .title {
    font-weight: 700;
    margin-bottom: 53rpx;
    font-size: 24rpx;
    color: #000000;
    text-align: center;
  }

  .tabs {
    display: flex;
    margin-bottom: 50rpx;

    .tab {
      margin-right: 20rpx;
      font-size: 22rpx;
      color: #808080;

      &.active {
        font-weight: 700;
        font-size: 24rpx;
        color: #292929;
      }
    }
  }

  .content {
    position: relative;
    z-index: 1;
    .con {
      padding-top: 29rpx;
      padding-bottom: 29rpx;
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
          align-items: center;

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

      .bind_box {
        margin-right: 50rpx;
        width: 100rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #22ad78;
        border-radius: 16rpx;
        text-align: center;

        .bind {
          font-size: 24rpx;
          color: #ffffff;
        }
      }
    }
  }
}
</style>