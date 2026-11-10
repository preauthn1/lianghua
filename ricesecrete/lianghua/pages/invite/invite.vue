<template>
    <view class="invite">
        <image class="bg_img" :src="getImagePath('invate.png')" />
        <view class="card">
            <view class="link">
                <image class="img" :src="getImagePath('link.png')" />
                <view class="txt" style="white-space: nowrap;">发送邀请链接</view>
            </view>
            <image class="dollar_img" :src="getImagePath('invate_arrow.png')" />
            <view class="link">
                <image class="img" :src="getImagePath('phone.png')" />
                <view class="txt">好友注册后完成 <br> 一次交易</view>
            </view>
            <image class="dollar_img" :src="getImagePath('invate_arrow.png')" />
            <view class="link">
                <image class="img" :src="getImagePath('invate_hand.png')" />
                <view class="txt">获得50U-150U <br> 奖励+20%永久 <br>分佣</view>
            </view>
        </view>

        <view class="card_invate">
            <view class="title">邀请好友</view>
            <view class="invate_code">
                <view class="txt">邀请码</view>
                <view class="right" @click="copyText(code)">
                    <view class="code">{{ code }}</view>
                    <image class="img" :src="getImagePath('copy.png')" />
                </view>
            </view>

            <view class="invate_code">
                <view class="txt">邀请链接</view>
                <view class="right" @click="copyText(link)">
                    <view class="code">{{ link }}</view>
                    <image class="img" :src="getImagePath('copy.png')" />
                </view>
            </view>

            <view v-if="showToast" class="custom_toast">复制成功</view>

            <view class="invate_code">
                <view class="erweima" @click="toShare(1)">
                    <image class="img" :src="getImagePath('erweima.png')" />
                </view>
                <view class="invate_box" @click="toShare(2)">
                    <view class="txt">链接邀请</view>
                </view>
                <view class="invate_box" @click="toShare(3)">
                    <view class="txt">分享海报</view>
                </view>
            </view>
        </view>

        <view class="my_invate">
            <view class="title">
                <view class="txt">我的邀请</view>
                <view class="right" @click="toDetail">
                    <view class="txt">详情</view>
                    <image class="img" :src="getImagePath('myinvate_arrow.png')" />
                </view>
            </view>
            <view class="num">
                <view class="left">
                    <view class="num_1">0</view>
                    <view class="txt">邀请成功(人)</view>
                </view>
                <view class="left">
                    <view class="num_1">0.00</view>
                    <view class="txt">总奖励(USDT)</view>
                </view>
            </view>
        </view>

        <view v-if="isShoerweima" class="erweima_box" @click="closeErweima">
            <view class="erweima">
                <image class="img" :src="getImagePath('eriweima2.png')" />
                <view class="title">
                    <view class="txt">面对面扫码</view>
                    <view class="txt2">请打开微信扫一扫,或截图保存</view>
                </view>
            </view>
        </view>

        <view v-if="showPoster" class="poster-overlay" @click="hidePosterImage">
            <view class="poster-container" @click.stop>
                <view class="poster-image-wrapper">
                    <image class="poster-image" :src="getImagePath('share_hb.png')" mode="aspectFit" />
                    <!-- <image class="qrcode-image" :src="getImagePath('qrcode.png')" /> -->
                    <view class="qrcode-image"></view>
                </view>
                <view class="close-btn" @click="hidePosterImage">
                    <image class="close-icon" :src="getImagePath('close.png')" />
                </view>
            </view>
        </view>

    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const code = ref('67882');
const link = ref('http://web.daf4f.com/h5/1.3ht');
const showToast = ref(false);
const showPoster = ref(false);

const copyText = (text) => {
    uni.setClipboardData({
        data: text,
        showToast: false,
        success: function () {
            uni.hideToast();
            showToast.value = true;
            setTimeout(() => {
                showToast.value = false;
            }, 1000);
        }
    });
};

const toDetail = () => {
    uni.navigateTo({
        url: "/pages/myTeam/myTeam"
    });
}

const isShoerweima = ref(false);

const closeErweima = () => {
    isShoerweima.value = false;
};

const toShare = (type) => {
    if (type == 1) {
        console.log('12312');
        isShoerweima.value = true;

        // 分享二维码逻辑
    } else if (type == 2) {
        // 分享链接逻辑
        copyText();
    } else if (type == 3) {
        // 分享海报 海报图片已经给了
        const posterPath = getImagePath('share_hb.png');
        showPosterImage();
    }
}



// 显示海报图片
const showPosterImage = () => {
    showPoster.value = true;
};

// 隐藏海报图片
const hidePosterImage = () => {
    showPoster.value = false;
};

const shareImageInApp = (imagePath) => {
    uni.showActionSheet({
        itemList: ['保存到相册', '分享到微信', '分享到Telegram'],
        success: function (res) {
            switch (res.tapIndex) {
                case 0:
                    // 保存到相册
                    saveToPhoto(imagePath);
                    break;
                case 1:
                    // 分享到微信
                    shareToWeChat(imagePath);
                    break;
                case 2:
                    console.log('分享到Telegram');
                    break;
            }
        },
        fail: function (err) {
            console.log(err, '分享失败');
        }
    })
}

const saveToPhoto = (imagePath) => {
    // 可用性检查
    if (typeof uni.getSetting !== 'function') {
        uni.showToast({
            title: '当前环境不支持该功能',
            icon: 'none'
        });
        return;
    }

    // 先检查是否有权限
    uni.getSetting({
        success: (res) => {
            if (res.authSetting['scope.writePhotosAlbum'] === false) {
                // 用户之前拒绝了权限，引导用户手动开启
                uni.showModal({
                    title: '权限提示',
                    content: '需要您授权保存图片到相册的权限',
                    confirmText: '去设置',
                    success: (modalRes) => {
                        if (modalRes.confirm) {
                            uni.openSetting();
                        }
                    }
                });
                return;
            }

            // 执行保存操作
            uni.saveImageToPhotosAlbum({
                filePath: imagePath,
                success: function (res) {
                    uni.showToast({
                        title: '已保存到相册',
                        icon: 'success',
                        duration: 2000
                    });
                },
                fail: function (err) {
                    console.log('保存失败:', err);
                    if (err.errMsg && err.errMsg.includes('auth deny')) {
                        uni.showModal({
                            title: '权限提示',
                            content: '需要您授权保存图片到相册的权限',
                            confirmText: '去设置',
                            success: (modalRes) => {
                                if (modalRes.confirm) {
                                    uni.openSetting();
                                }
                            }
                        });
                    } else {
                        uni.showToast({
                            title: '保存失败，请重试',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                }
            });
        }
    });
}

// 分享到微信（需要配置微信分享）
const shareToWeChat = (imagePath) => {
    // 使用 plus.share 进行微信分享
    if (plus && plus.share) {
        plus.share.getServices((services) => {
            const wechatService = services.find(service => service.id === 'weixin');
            if (wechatService) {
                plus.share.sendWithSystem({
                    type: 'image',
                    pictures: [imagePath],
                    interface: wechatService.id
                }, () => {
                    uni.showToast({
                        title: '分享成功',
                        icon: 'success'
                    });
                }, (err) => {
                    console.log('微信分享失败:', err);
                    // 降级到保存相册
                    saveToPhotoAlbum(imagePath);
                });
            } else {
                uni.showToast({
                    title: '未安装微信',
                    icon: 'none'
                });
                saveToPhotoAlbum(imagePath);
            }
        });
    } else {
        // 降级到保存相册
        saveToPhotoAlbum(imagePath);
    }
}

</script>

<style scoped lang="scss">
.invite {
    box-sizing: border-box;
    min-height: 100vh;
    // padding-bottom: env(safe-area-inset-bottom);
    background: linear-gradient(180deg, #BDF6C5 0%, #D2F8EA 100%);
    padding-bottom: 204rpx;

    .bg_img {
        width: 100%;
        height: 416rpx;
        margin-bottom: 20rpx;
    }

    .card {
        display: flex;
        padding-top: 18rpx;
        box-sizing: border-box;
        height: 210rpx;
        background: #FFFFFF;
        border-radius: 30rpx;
        padding-left: 22rpx;
        margin-left: 30rpx;
        margin-right: 30rpx;
        margin-bottom: 20rpx;

        .dollar_img {
            width: 84rpx;
            height: 30rpx;
            padding-top: 20rpx;
        }

        .link {
            display: flex;
            flex-direction: column;
            align-items: center;

            .img {
                width: 70rpx;
                height: 70rpx;
                margin-bottom: 10rpx;
            }

            .txt {
                font-size: 22rpx;
                color: #292929;
                letter-spacing: 1px;
                text-align: center;
                font-weight: 600;
                line-height: 1.5;
            }
        }
    }

    .card_invate {
        position: relative;
        margin: 0 30rpx;
        height: 300rpx;
        background: #FFFFFF;
        border-radius: 30rpx;
        padding-top: 25rpx;
        box-sizing: border-box;
        padding-left: 34rpx;
        margin-bottom: 20rpx;

        .title {
            font-size: 24rpx;
            color: #292929;
            letter-spacing: 1px;
            font-weight: 700;
            margin-bottom: 20rpx;
        }

        .invate_code {
            margin-bottom: 20rpx;
            display: flex;
            justify-content: space-between;
            margin-right: 43rpx;

            .txt {
                font-size: 24rpx;
                color: #808080;
                letter-spacing: 1px;
            }

            .right {
                display: flex;
                align-items: center;

                .code {
                    font-size: 24rpx;
                    color: #232323;
                    letter-spacing: 1px;
                    margin-right: 30rpx;
                }

                .img {
                    width: 30rpx;
                    height: 30rpx;
                }
            }

            .erweima {
                width: 80rpx;
                height: 80rpx;
                background: #22AD78;
                border-radius: 16rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                .img {
                    width: 30rpx;
                    height: 30rpx;
                }
            }

            .invate_box {
                width: 200rpx;
                height: 80rpx;
                background: #22AD78;
                border-radius: 16rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                .txt {
                    font-size: 24rpx;
                    color: #FFFFFF;
                    letter-spacing: 1px;
                    font-weight: 600;
                }
            }
        }

        .custom_toast {
            position: absolute;
            top: -60rpx;
            left: 50%;
            transform: translateX(-50%);
            width: 170rpx;
            height: 90rpx;
            background: rgba(8, 156, 40, 0.5);
            border-radius: 20rpx;
            border: 2rpx solid #22AD78;

            font-size: 24rpx;
            color: #FFFFFF;
            letter-spacing: 1px;

            display: flex;
            justify-content: center;
            align-items: center;
        }

    }

    .my_invate {
        margin: 0 30rpx;
        padding-top: 25rpx;
        box-sizing: border-box;
        height: 240rpx;
        background: #FFFFFF;
        border-radius: 30rpx;

        .title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 50rpx;
            padding-left: 34rpx;

            .txt {
                font-size: 24rpx;
                color: #292929;
                letter-spacing: 1px;
                font-weight: 700;
            }

            .right {
                display: flex;
                align-items: center;
                margin-right: 48rpx;

                .txt {
                    font-size: 24rpx;
                    color: #22AD78;
                    letter-spacing: 1px;
                    font-weight: 700;
                    margin-right: 10rpx;
                }

                .img {
                    width: 20rpx;
                    height: 20rpx;
                }
            }
        }

        .num {
            display: flex;
            margin-left: 145rpx;

            .left {
                display: flex;
                flex-direction: column;
                margin-right: 100rpx;
                align-items: center;

                .num_1 {
                    font-size: 28rpx;
                    color: #292929;
                    letter-spacing: 1px;
                    margin-bottom: 10rpx;
                }

                .txt {
                    font-size: 24rpx;
                    color: #808080;
                    letter-spacing: 1px;
                }
            }
        }
    }

    .erweima_box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;

        .erweima {
            position: relative;

            .img {
                width: 580rpx;
                height: 880rpx;
            }

            .title {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 42rpx;
                color: #FFFFFF;
                letter-spacing: 1rpx;
                text-align: center;

                .txt {
                    font-size: 36rpx;
                    margin-bottom: 10rpx;
                }

                .txt2 {
                    white-space: nowrap;
                    font-size: 24rpx;
                }
            }
        }
    }

    .poster-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;

        .poster-container {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 25rpx 0 55rpx 0;
            box-sizing: border-box;

            .poster-image-wrapper {
                position: relative;
                display: inline-block;

                .poster-image {
                    width: 750rpx;
                    height: 1420rpx;
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    display: block;
                }

                .qrcode-image {
                    position: absolute;
                    bottom: 22rpx;
                    right: 24rpx;
                    width: 120rpx;
                    height: 120rpx;
                    z-index: 10;
                    background-color: pink;
                }
            }

            .close-btn {
                position: absolute;
                top: 0rpx;
                right: 34rpx;
                width: 60rpx;
                height: 60rpx;

                .close-icon {
                    width: 40rpx;
                    height: 40rpx;
                }
            }
        }
    }
}
</style>