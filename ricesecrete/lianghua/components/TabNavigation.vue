<template>
    <view class="tab-navigation">
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
.tab-navigation {
    display: flex;
    width: 420rpx;
    height: 60rpx;
    line-height: 60rpx;
    background: #F1F1F1;
    border-radius: 16rpx;
    font-size: 24rpx;
    color: #292929;
    text-align: center;
    position: relative;

    .tab-item {
        flex: 1;
        position: relative;
        height: 60rpx;

        .tab-badge {
            position: absolute;
            top: -10rpx;
            right: 10rpx;
            background-color: red;
            color: white;
            font-size: 20rpx;
            border-radius: 50%;
            min-width: 30rpx;
            height: 30rpx;
            line-height: 30rpx;
            text-align: center;
            padding: 0 5rpx;
        }

        &.active {
            background: #22AD78;
            color: #FFFFFF;
            font-weight: 600;
            border-radius: 16rpx;
        }
    }
}
</style>