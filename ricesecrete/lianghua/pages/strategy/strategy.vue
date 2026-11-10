<template>
  <view class="container">
    <uv-status-bar></uv-status-bar>
    <image class="bg_color" :src="getImagePath('bg_color.png')" />
    <view class="title" style="margin-bottom: 40rpx;">{{ t('合约') }}</view>
    <view class="strategy-container">
      <TabNavigation :tabs="mainTabs" :currentTab="currentTab" @switch="switchTab" />
      <view class="menu">{{ t('账单') }}</view>
    </view>

    <view class="tab_content">
      <view v-if="currentTab === 0">
        <StrategyCard :leftTitle="t('交易所总资产') + '(USDT)'" :rightTitle="t('合约持仓') + '(USDT)'" :leftValue="totalAssets"
          :rightValue="contractPosition" />

        <StrategyCard :leftTitle="t('可用余额') + '(USDT)'" :rightTitle="t('浮动盈亏') + '(USDT)'" :leftValue="availableBalance"
          :rightValue="floatingProfit" rightValueClass="loss" />

        <view class="title" style="margin-bottom: 20rpx;padding-top: 30rpx;">{{ t('策略推荐') }}</view>

        <StrategyItem v-for="(strategy, index) in strategies" :key="index" :icon="strategy.icon" :name="strategy.name"
          :userCount="strategy.userCount" :description="strategy.description"
          @click="handleStrategyClick(strategy, index)" />
      </view>

      <view v-else-if="currentTab == 1">
        <TabZhiXing :tabs="executingTabs" :currentTab="currentingTabs" @switch="switchExecutingTab" />
      </view>

      <view v-else>
        <TabZhiXing :tabs="executingTabs" :currentTab="currentingTabs" @switch="switchExecutingTab" />
      </view>
    </view>

    <view v-if="currentTab != 0 && currentingTabs == 0" class="all">
      <image class="nodata_img" :src="getImagePath('nodata.png')" />
      <view class="nodata_txt">{{ t('暂无数据') }}</view>
    </view>

    <view v-if="currentingTabs == 1" class="all">
      <image class="nodata_img" :src="getImagePath('nodata.png')" />
      <view class="nodata_txt">{{ t('暂无数据') }}</view>
    </view>

    <view v-if="currentingTabs == 2" class="all">
      <image class="nodata_img" :src="getImagePath('nodata.png')" />
      <view class="nodata_txt">{{ t('暂无数据') }}</view>
    </view>

    <view v-if="currentingTabs == 3" class="all">
      <image class="nodata_img" :src="getImagePath('nodata.png')" />
      <view class="nodata_txt">{{ t('暂无数据') }}</view>
    </view>

    <view v-if="currentingTabs == 4" class="all">
      <image class="nodata_img" :src="getImagePath('nodata.png')" />
      <view class="nodata_txt">{{ t('暂无数据') }}</view>
    </view>
    <CustomTabBar />
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getImagePath } from "@/utils/image.js";
import StrategyCard from "@/components/StrategyCard.vue";
import StrategyItem from "@/components/StrategyItem.vue";
import TabNavigation from "@/components/TabNavigation.vue";
import TabZhiXing from "../../components/TabZhiXing.vue";
import CustomTabBar from "../../components/CustomTabBar.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const mainTabs = ref(["选择策略", "执行中(0)", "已停止(0)"]);
const executingTabs = ref(["全部(0)", "多单(0)", "空单(0)", "多空(0)"]);

// 计算属性：翻译后的标签
const translatedMainTabs = computed(() => {
  return [t("选择策略"), `${t("执行中")}(0)`, `${t("已停止")}(0)`];
});

const translatedExecutingTabs = computed(() => {
  return [
    `${t("全部")}(0)`,
    `${t("多单")}(0)`,
    `${t("空单")}(0)`,
    `${t("多空")}(0)`
  ];
});

const currentTab = ref(0);

const currentingTabs = ref(0);

const strategies = ref([
  {
    icon: "/static/image/cl1.png",
    name: "AI综合策略",
    description: "AI交易达模型+马丁+网格+趋势指标+风险控制",
    userCount: 9655463
  },
  {
    icon: "/static/image/cl2.png",
    name: "AI双向对冲策略",
    description: "AI双向对冲模型,永不爆仓,稳定盈利",
    userCount: 55515
  },
  {
    icon: "/static/image/cl3.png",
    name: "量化策略",
    description: "趋势指标+马丁+网格+趋势指标+风险控制",
    userCount: 548621
  },
  {
    icon: "/static/image/cl4.png",
    name: "秒级跟单",
    description: "币安欧易每日前三天交易员无延迟秒级跟单",
    userCount: 647845
  }
]);

const switchTab = index => {
  currentTab.value = index;
  console.log("当前tab", currentTab.value);
};

const switchExecutingTab = index => {
  currentingTabs.value = index;
  console.log("当前tab222", currentingTabs.value);
};

const handleStrategyClick = (strategy, index) => {
  console.log(index, '选择策略:', strategy)
  uni.navigateTo({
    url: `/pages/strategy/detail?name=${encodeURIComponent(strategy.name)}&description=${encodeURIComponent(strategy.description)}&userCount=${strategy.userCount}&icon=${encodeURIComponent(strategy.icon)}`
  });
}
</script>

<style scoped lang="scss">
.container {
  .bg_color {
    position: absolute;
    right: 0;
    top: 60rpx;
  }

  .strategy-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
  }

  .tab_content {
    height: 100vh;
    position: relative;
  }

  .all {
    text-align: center;
    padding-top: 128rpx;

    .nodata_img {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 20rpx;
    }

    .nodata_txt {
      font-weight: 500;
      font-size: 24rpx;
      color: #22ad78;
      letter-spacing: 1px;
    }
  }
}
</style>