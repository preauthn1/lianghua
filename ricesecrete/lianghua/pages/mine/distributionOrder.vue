<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />

        <view class="order-tab">
            <view v-for="(tab, index) in orderTabs" :key="index" class="tab-item"
                :class="{ 'active': currentTab === tab.value }" @click="switchTab(tab.value)">
                {{ tab.label }}
            </view>
        </view>

        <EmptyState style="position: relative;" :imagePath="getImagePath('my_nodata.png')" text="没有相关信息" />

    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import EmptyState from "../../components/EmptyState.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 订单标签页
const orderTabs = [
    { label: '所有订单', value: 'all' },
    { label: '待付款', value: 'pending' },
    { label: '已付款', value: 'paid' },
    { label: '已完成', value: 'completed' },
    { label: '退款/售后', value: 'refund' }
]

const currentTab = ref('all')

const switchTab = (tabValue) => {
    currentTab.value = tabValue
}

</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;
    padding: 20rpx 30rpx 0;

    .bg_color {
        position: absolute;
        right: 0;
        top: 60rpx;
    }

    .order-tab {
        position: relative;
        display: flex;
        height: 84rpx;
        background: #FFFFFF;
        width: 690rpx;
        border-radius: 16rpx;
        box-sizing: border-box;
        padding: 0 28rpx;
        padding-top: 17rpx;

        .tab-item {
            flex: 1;
            text-align: center;
            position: relative;
            font-size: 24rpx;
            color: #808080;
            letter-spacing: 1px;
            font-weight: 600;

            &.active {
                color: #22AD78;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 17rpx;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40rpx;
                    height: 6rpx;
                    background: #22AD78;
                    border-radius: 3rpx;
                }
            }
        }
    }
}
</style>