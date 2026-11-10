<template>
    <view class="download">
        <view class="big">
            <view class="logo">LOGO</view>
        </view>
        <view class="txt">XXXX</view>

        <view class="box" v-for="(item, index) in app" :key="index">
            <image class="img" :src="getImagePath(item.img)" mode="aspectFill"></image>
            <view class="box_txt">
                <view class="name">{{ item.name }}</view>
                <view class="method">{{ item.method }}</view>
            </view>
        </view>

        <view class="download_txt">
            <view class="title">安装说明</view>
            <view class="tips">
                - 苹果安装: 下载后打开设置 <br> - 已下载描述文件-右上角安装。<br> - APP已通过苹果安卓检测,均为安全认证。
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const app = ref([
    {
        name: '本地下载',
        method: 'Android下载',
        img: 'andriod.png',
    },
    {
        name: 'Download on the',
        method: 'App Store',
        img: 'iphone.png',
    }
])

</script>

<style scoped lang="scss">
.download {
    width: 750rpx;
    min-height: 100vh;
    background: linear-gradient(90deg, #E01298 0%, #8800FF 80%);
    box-sizing: border-box;


    .big {
        width: 230rpx;
        background: #FFFFFF;
        border-radius: 30rpx;
        padding: 9rpx;
        box-sizing: border-box;
        margin: 0 auto;

        .logo {
            text-align: center;
            height: 212rpx;
            line-height: 212rpx;
            background: #232323;
            border-radius: 20rpx;
            font-size: 60rpx;
            color: #FFFFFF;
            letter-spacing: 1px;
            font-weight: 700;
        }
    }




    .txt {
        text-align: center;
        font-weight: 700;
        font-size: 60rpx;
        color: #FFFFFF;
        letter-spacing: 3px;
    }


    .box {
        display: flex;
        align-items: center;
        width: 320rpx;
        height: 90rpx;
        background: #41464F;
        border-radius: 16rpx;
        padding-left: 23rpx;
        margin: 0 auto;
        margin-bottom: 60rpx;

        .img {
            width: 60rpx;
            height: 60rpx;
            margin-right: 20rpx;
        }

        .box_txt {
            display: flex;
            flex-direction: column;
            font-size: 20rpx;
            color: #FFFFFF;

            .name {
                white-space: nowrap;
            }

            .method {
                font-weight: 700;
                font-size: 26rpx;
            }
        }
    }

    .download_txt {
        width: 540rpx;
        height: 230rpx;
        background: #F9F9F9;
        border-radius: 14rpx;
        padding-top: 30px;
        padding-left: 18px;
        margin: 0 auto;

        .title {
            font-size: 30rpx;
            color: #292929;
            font-weight: 800;
            margin-bottom: 26rpx;
        }

        .tips {
            font-size: 24rpx;
            color: #808080;
            letter-spacing: 1px;
            line-height: 1.5;
        }

    }
}
</style>