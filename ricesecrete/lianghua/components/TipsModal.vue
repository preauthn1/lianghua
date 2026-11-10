<template>
    <view class="overlay" v-if="show" @click="handleClose" @touchmove.prevent.stop>
        <view class="tips-modal" :style="{ height: height + 'rpx' }" @click.stop @touchmove.stop>
            <view class="modal-title">{{ title }}</view>
            <view class="modal-content">{{ content }}</view>
            <uv-line customStyle="margin:40rpx 0 20rpx 0;" color="#F5F5F5" :hairline="false"></uv-line>
            <view class="modal-footer">
                <view class="confirm-button" @click="handleConfirm">确定</view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    height: {
        type: Number,
        default: 340
    }
})

const emit = defineEmits(['close', 'confirm'])

const handleClose = () => {
    emit('close')
}

const handleConfirm = () => {
    emit('confirm')
}
</script>

<style scoped lang="scss">
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    touch-action: none;
}

.tips-modal {
    width: 560rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    position: relative;
    touch-action: auto;

    .modal-title {
        font-size: 30rpx;
        color: #292929;
        letter-spacing: 0;
        font-weight: 600;
        text-align: center;
        padding: 40rpx 0 30rpx 0;
    }

    .modal-content {
        flex: 1;
        font-size: 24rpx;
        color: #808080;
        letter-spacing: 0;
        font-weight: 600;
        text-align: center;
        padding: 0 82rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-footer {
        padding: 30rpx 0;
        display: flex;
        justify-content: center;

        .confirm-button {
            font-size: 24rpx;
            color: #22AD78;
            font-weight: 600;
        }
    }
}
</style>