<template>
    <view class="container">
        <input class="ipt" type="text" placeholder="请输入昵称" />
        <view class="btn">保存</view>
    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getImagePath } from "@/utils/image.js";

const { t } = useI18n();



</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;

    .ipt {
        height: 100rpx;
        background: #FFFFFF;
        border-radius: 18rpx;
        margin-bottom: 60rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 30rpx;

    }

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
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