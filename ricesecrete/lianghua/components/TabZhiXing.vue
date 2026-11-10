<template>
    <view class="zhixing_box">
        <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ 'active': currentTab === index }"
            @click="$emit('switch', index)">
            {{ tab }}
        </view>
    </view>
</template>

<script setup>
defineProps({
    tabs: { type: Array, required: true },
    currentTab: { type: Number, required: true },
})

defineEmits(['switch'])
</script>

<style scoped lang="scss">
.zhixing_box {
    background: #FFFFFF;
    border-radius: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15rpx 33rpx 15rpx 20rpx;


    .tab-item {
        position: relative;
        width: 110rpx;
        height: 54rpx;
        line-height: 54rpx;
        text-align: center;
        color: #292929;
        font-size: 24rpx;

        &.active {
            width: 110rpx;
            height: 54rpx;
            background: #22AD78;
            color: #FFFFFF;
            font-weight: 600;
            border-radius: 16rpx;
        }
    }
}
</style>