<template>
    <view class="card">
        <view class="hang1">
            <view class="txt1">{{ leftTitle }}</view>
            <view class="txt1">{{ rightTitle }}</view>
        </view>
        <view class="hang1">
            <view class="num1">{{ leftValue }}</view>
            <view :class="['num2', rightValueClass]">{{ rightValue }}</view>
        </view>
    </view>
</template>

<script setup>
defineProps({
    leftTitle: { type: String, default: '' },
    rightTitle: { type: String, default: '' },
    leftValue: { type: [Number, String], default: 0 },
    rightValue: { type: [Number, String], default: 0 },
    rightValueClass: { type: String, default: '' }
})
</script>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 130rpx;
    background: #FFFFFF;
    border-radius: 30rpx;
    padding: 0 30rpx;
    margin-bottom: 10rpx;

    .hang1 {
        display: flex;
        justify-content: space-between;

        .txt1 {
            font-size: 24rpx;
            color: #808080;
        }

        .num1 {
            font-size: 28rpx;
            color: #292929;
        }

        .num2 {
            font-size: 28rpx;
        }
    }
}
</style>