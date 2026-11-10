<template>
    <view class="tab-navigation" :style="{ width: width, height: height, lineHeight: height }">
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
    width: { type: String, default: '512rpx' },
    height: { type: String, default: '60rpx' },
})

defineEmits(['switch'])
</script>

<style scoped lang="scss">
.tab-navigation {
    display: flex;
    background: #F1F1F1;
    border-radius: 16rpx;
    font-size: 24rpx;
    color: #292929;
    text-align: center;
    position: relative;

    .tab-item {
        flex: 1;
        position: relative;

        &.active {
            background: #22AD78;
            color: #FFFFFF;
            font-weight: 600;
            border-radius: 16rpx;
        }
    }
}
</style>