<template>
    <view class="container">
        <view class="input-group">
            <view class="input-with-label" style="margin-bottom: 30rpx;">
                <text style="padding-right: 97rpx;" class="label">新密码</text>
                <input class="ipt" type="password" v-model="newPassword" placeholder="输入您的新密码" />

            </view>
            <view class="input-with-label">
                <text style="padding-right: 48rpx;" class="label">确认新密码</text>
                <input class="ipt" type="password" v-model="confirmPassword" placeholder="再次输入新密码" />
            </view>
        </view>
        <view class="tip">注:用于USDT支付等敏感操作时输入,请妥善保管</view>
        <view class="btn" @click="savePassword">
            确认
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const newPassword = ref('');
const confirmPassword = ref('');




</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;
    padding: 0;

    .input-group {
        margin-bottom: 30rpx;
        padding: 20rpx 30rpx 0 30rpx;
    }

    .input-with-label {
        height: 100rpx;
        background: #FFFFFF;
        border-radius: 18rpx;
        display: flex;
        margin-bottom: 17px;

        .label {
            font-size: 24rpx;
            color: #808080;
            letter-spacing: 1px;
            font-weight: 700;
            padding: 30rpx;
            white-space: nowrap;
        }

        .ipt {
            width: 100%;
            height: 100%;
            font-size: 22rpx;
            color: #808080;
            letter-spacing: 1px;
        }
    }

    .tip {
        margin-bottom: 60rpx;
        font-size: 22rpx;
        color: #AAAAAA;
        padding-left: 60rpx;
    }

    .btn {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 640rpx;
        height: 110rpx;
        background: #232323;
        border-radius: 55rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        letter-spacing: 4px;
        font-weight: 700;
    }
}
</style>