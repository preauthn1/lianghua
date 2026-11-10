<template>
    <view class="strategy-item" @click="handleClick">
        <view class="strategy-icon">
            <image :src="icon" mode="aspectFit" />
        </view>
        <view class="strategy_content">
            <view class="strategy_hang1">
                <view class="strategy_title">{{ name }}</view>
                <view class="strategy_users">{{ userCount }}人使用</view>
            </view>
            <view class="strategy_desc">{{ description }}</view>
        </view>
    </view>
</template>

<script setup>
defineProps({
    icon: { type: String, default: '' },
    name: { type: String, default: '' },
    userCount: { type: [Number, String], default: 0 },
    description: { type: String, default: '' }
})

const emit = defineEmits(['click'])

const handleClick = () => {
    emit('click')
}
</script>

<style scoped lang="scss">
.strategy-item {
    display: flex;
    align-items: center;
    height: 130rpx;
    background: #FFFFFF;
    border-radius: 30rpx;
    padding-left: 24rpx;
    padding-right: 37rpx;
    margin-bottom: 10rpx;

    .strategy-icon {
        width: 105rpx;
        height: 105rpx;
        margin-right: 20rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .strategy_content {
        flex: 1;

        .strategy_hang1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;

            .strategy_title {
                font-weight: bold;
                font-size: 24rpx;
                color: #292929;
            }

            .strategy_users {
                font-size: 20rpx;
                color: #808080;
            }
        }

        .strategy_desc {
            display: flex;
            font-size: 24rpx;
            color: #808080;
        }
    }
}
</style>