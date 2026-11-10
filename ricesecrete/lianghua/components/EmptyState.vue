<template>
    <view class="all">
        <image class="nodata_img" :src="imagePath" />
        <view class="nodata_txt">{{ text }}</view>
    </view>
</template>

<script setup>
import { getImagePath } from '@/utils/image.js'

defineProps({
    imagePath: {
        type: String,
        default: () => getImagePath('nodata.png')
    },
    text: {
        type: String,
        default: '暂无数据'
    }
})
</script>

<style scoped lang="scss">
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
        color: #22AD78;
        letter-spacing: 1px;
    }
}
</style>