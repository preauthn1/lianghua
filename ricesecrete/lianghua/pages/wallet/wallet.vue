<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />
        <view class="card">
            <view class="title">
                <view class="title_text">我的余额</view>
                <view class="title_text balance">
                    <text class="dollar-sign">$</text>
                    <text class="money">0.00</text>
                </view>
            </view>
            <view class="btn" @click="toRechargeRecord">
                <view class="btn_text">充值记录</view>
                <image class="btn_img" :src="getImagePath('wallet_row.png')" />
            </view>
        </view>

        <view class="chongzhi">
            <view class="txt">充值金额(USDT)</view>
            <view class="input_box">
                <view class="dollar_sign">$</view>
                <input class="input" type="number" placeholder="请输入充值金额" />
            </view>
        </view>

        <view class="pay_btn">
            <view class="txt">去支付</view>
        </view>
    </view>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();


const toRechargeRecord = ()=>{
    uni.navigateTo({
        url:'/pages/wallet/rechargeRecord'
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

    .card {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 1;
        padding-top: 43rpx;
        padding-left: 70rpx;
        height: 260rpx;
        background: linear-gradient(270deg, #28DE77 0%, #0AA96C 100%), #FFFFFF;
        margin-bottom: 20rpx;
        border-radius: 10rpx 30rpx 10rpx 0;


        .title {
            display: flex;
            flex-direction: column;

            .title_text {
                font-weight: 700;
                display: flex;
                font-size: 24rpx;
                color: #72FFAF;
                letter-spacing: 1px;
            }

            .balance {
                display: flex;
                align-items: baseline;
                color: #fff;

                .dollar-sign {
                    font-size: 36rpx;
                }

                .money {
                    font-size: 60rpx;
                }
            }


        }

        .btn {
            width: 170rpx;
            height: 60rpx;
            background: #FFFFFF;
            margin-top: 36rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 30rpx 0 0 30rpx;

            .btn_text {
                font-size: 24rpx;
                color: #808080;
                letter-spacing: 1px;
                margin-right: 10rpx;
            }

            .btn_img {
                width: 20rpx;
                height: 20rpx;
            }
        }
    }

    .chongzhi {
        height: 230rpx;
        background: #FFFFFF;
        border-radius: 30rpx;
        padding-left: 34rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: 20rpx;

        .txt {
            font-size: 24rpx;
            color: #808080;
        }

        .input_box {
            display: flex;
            align-items: center;
            font-weight: 700;
            margin-bottom: 20rpx;

            .dollar_sign {
                font-size: 50rpx;
                color: #232323;
                margin-right: 20rpx;
            }

            .input {
                font-size: 40rpx;
                color: #808080;
            }

        }

    }

    .pay_btn {
        height: 110rpx;
        background: #232323;
        border-radius: 55rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        .txt {
            font-size: 24rpx;
            color: #FFFFFF;
            font-weight: 700;
        }
    }

}
</style>