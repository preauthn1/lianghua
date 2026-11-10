<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />
        <view class="user_box">
            <view class="avatr">
                <image class="avatr_img" :src="getImagePath('avatr.png')" />
                <view class="right_box">
                    <view class="num_box">
                        <view class="phone">{{ formatPhoneNumber(phone) }}</view>
                        <view class="num">推荐人:无</view>
                    </view>
                </view>
            </view>
            <view class="dashbord">
                <view class="card_box">
                    <image class="img1" :src="getImagePath('commission/yongjin_4.png')" />
                    <view class="title">我的佣金</view>
                </view>
                <view class="card1">
                    <view class="left">
                        <view class="txt">可提现 佣金(USDT)</view>
                        <view class="num">0.00</view>
                    </view>
                    <view class="right" @click="fetchCommissionDetails">
                        <view class="txt">去提现</view>
                        <image class="img1" :src="getImagePath('commission/yongjin_arrow.png')" />
                    </view>
                </view>

                <view class="card2">
                    <view class="left">
                        <view class="txt">已提现佣金(USDT)</view>
                        <view class="num">0.00</view>
                    </view>
                    <view class="left">
                        <view class="txt">待结算(USDT)</view>
                        <view class="num">0.00</view>
                    </view>
                </view>
            </view>
            <view class="icon_group">
                <view class="icon" v-for="(item, index) in icons" :key="index" @click="handleIconClick(item.txt1)">
                    <image class="img1" :src="getImagePath(item.path)" />
                    <view class="txt">
                        <view class="title">{{ item.txt1 }}</view>
                        <view class="txtq">{{ item.txt2 }}</view>
                    </view>
                </view>
            </view>
        </view>

        <uv-modal ref="transferModal" title="佣金转USDT" @confirm="confirmTransfer" @cancel="cancelTransfer"
            confirmText="确定" showCancelButton confirmColor="#22AD78" :zoom="false">
            <uv-input v-model="transferAmount" placeholder="请输入转入金额" fontSize="24rpx" color="#808080" type="number" />
        </uv-modal>

    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const phone = "18912349654";

const icons = ref([
    { path: "commission/yongjin_2.png", txt1: "分享海报", txt2: "邀请好友享收益" },
    { path: "commission/yongjin_5.png", txt1: "佣金转USDT", txt2: "直接到账" },
    { path: "commission/yongjin_3.png", txt1: "分销订单", txt2: "查看订单" },
    { path: "commission/yongjin_6.png", txt1: "佣金明细", txt2: "查看明细" },
    { path: "commission/yongjin_1.png", txt1: "佣金记录", txt2: "查看记录" },
])

const formatPhoneNumber = phoneNumber => {
    if (!phoneNumber) return "";
    if (phoneNumber.length < 11) return phoneNumber;
    return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};

const transferModal = ref(null)
const transferAmount = ref('')

// 取消转账
const cancelTransfer = () => {
    console.log('点击了取消');
    transferModal.value.close()
}

const confirmTransfer = () => {
    if (!transferAmount.value) {
        uni.showToast({
            title: '请输入转账金额',
            icon: 'none'
        })
        return
    }
}

const navigationMap = {
    "佣金转USDT": () => transferModal.value.open(),
    "分销订单": () => uni.navigateTo({ url: '/pages/mine/distributionOrder' }),
    "佣金记录": () => uni.navigateTo({ url: '/pages/mine/commissionRecord' }),
    "佣金明细": () => uni.navigateTo({ url: '/pages/mine/commissionDetail' })
};

const handleIconClick = (txt) => {
    const navigationAction = navigationMap[txt];
    if (navigationAction) {
        navigationAction();
    }
};

const fetchCommissionDetails = () => {
    uni.navigateTo({
        url: '/pages/wallet/withdrawalRecord',
    })
}


</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;

    .bg_color {
        position: absolute;
        right: 0;
        top: 60rpx;
    }

    .user_box {
        .avatr {
            display: flex;
            position: relative;
            padding-top: 40rpx;
            padding-left: 30rpx;
            align-items: center;
            margin-bottom: 20rpx;

            .avatr_img {
                width: 90rpx;
                height: 90rpx;
                margin-right: 20rpx;
            }

            .right_box {
                padding-top: 5rpx;

                .num_box {
                    display: flex;
                    flex-direction: column;
                    margin-right: 33rpx;
                    letter-spacing: 1rpx;

                    .phone {
                        font-size: 24rpx;
                        color: #292929;
                        font-weight: 800;
                        margin-bottom: 20rpx;
                    }

                    .num {
                        font-size: 20rpx;
                        color: #808080;
                    }
                }

                .vip_icon {
                    width: 120rpx;
                    height: 36rpx;
                    background: #fbefd5;
                    border-radius: 18rpx;
                    border: 1rpx solid #ff9500;
                    display: flex;
                    align-items: center;

                    .vip_img {
                        width: 30rpx;
                        height: 30rpx;
                        margin-right: 10rpx;
                    }

                    .txt {
                        font-size: 20rpx;
                        color: #ff9500;
                    }
                }
            }
        }

        .dashbord {
            position: relative;
            margin-bottom: 30rpx;
            height: 450rpx;
            background: #FFFFFF;
            border-radius: 30rpx;
            padding-top: 25rpx;
            padding-left: 34rpx;
            padding-right: 45rpx;

            .card_box {
                display: flex;
                align-items: center;
                margin-bottom: 60rpx;

                .img1 {
                    width: 30rpx;
                    height: 30rpx;
                    margin-right: 10rpx;
                }

                .title {
                    font-size: 24rpx;
                    color: #292929;
                    letter-spacing: 1px;
                    font-weight: 700;
                }
            }

            .card1 {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-bottom: 60rpx;

                .left {
                    display: flex;
                    flex-direction: column;

                    .txt {
                        font-size: 24rpx;
                        color: #808080;
                        margin-bottom: 20rpx;
                    }

                    .num {
                        font-size: 60rpx;
                        color: #232323;
                        letter-spacing: 3px;
                        font-weight: 700;
                    }
                }

                .right {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 40rpx;
                    width: 170rpx;
                    height: 60rpx;
                    background: linear-gradient(270deg, #28DE77 0%, #0AA96C 100%), #22AD78;

                    .txt {
                        font-size: 24rpx;
                        color: #FFFFFF;
                        letter-spacing: 1px;
                        font-weight: 600;
                        margin-right: 10rpx;
                    }

                    .img1 {
                        width: 20rpx;
                        height: 20rpx;
                    }
                }
            }

            .card2 {
                display: flex;
                align-items: center;

                .left {
                    display: flex;
                    flex-direction: column;
                    margin-right: 116rpx;

                    .txt {
                        font-size: 24rpx;
                        color: #808080;
                        margin-bottom: 20rpx;
                    }

                    .num {
                        font-size: 60rpx;
                        color: #232323;
                        letter-spacing: 3px;
                        font-weight: 700;
                    }
                }
            }
        }

        .icon_group {
            display: flex;
            flex-wrap: wrap;
            background: #FFFFFF;
            border-radius: 30rpx;
            padding-top: 40rpx;
            padding-left: 78rpx;

            .icon {
                display: flex;
                align-items: center;
                width: 50%;
                margin-bottom: 80rpx;

                .img1 {
                    width: 60rpx;
                    height: 60rpx;
                    margin-right: 20rpx;
                }

                .txt {
                    .title {
                        font-size: 24rpx;
                        color: #292929;
                        font-weight: 600;
                        margin-bottom: 10rpx;
                    }

                    .txtq {
                        font-size: 24rpx;
                        color: #292929;
                    }
                }
            }
        }

    }

    ::v-deep .uv-modal .uv-modal__title {
        font-size: 30rpx;
        color: #909399;
        letter-spacing: 1px;
        font-weight: 600;
        padding-top: 32rpx;
    }

    ::v-deep .uv-input__content__field-wrapper__field {
        letter-spacing: 1px;
    }
}
</style>