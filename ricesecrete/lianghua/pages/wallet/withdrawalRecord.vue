<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />
        <view class="card">
            <view class="title_box">
                <view class="title_text">我的余额</view>
                <view class="title_text balance">
                    <text class="dollar-sign">$</text>
                    <text class="money">0.00</text>
                </view>
            </view>

            <view class="btn" @click="toRechargeRecord">
                <view class="btn_text">提现记录</view>
                <image class="btn_img" :src="getImagePath('wallet_row.png')" />
            </view>
        </view>

        <view class="chongzhi">
            <view class="txt">提现金额(USDT)</view>
            <view class="input_box">
                <view class="box">
                    <view class="dollar_sign">$</view>
                    <input class="input" type="digit" placeholder="请输入提现金额" min="50" step="0.01" :value="inputValue"
                        inputmode="decimal" />
                </view>

                <uv-line customStyle="width: calc(100% - 30rpx); margin: 0 15rpx 26rpx;" color="#F0F0F0"
                    :hairline="false"></uv-line>
                <view class="tips">最低提现金额50.00Usdt 提现手续费5.00%</view>
            </view>
        </view>

        <view class="withdrawal_way">
            <view class="txt">选择提现方式：</view>
        </view>

        <view class="pay_btn">
            <view class="txt">立即提现</view>
        </view>
    </view>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();


const toRechargeRecord = () => {
    uni.navigateTo({
        url: '/pages/mine/commissionDetail?id=2'
    })
}


const inputValue = ref('')


// 限制只能输入数字和小数点
const handleInput = (e) => {
    console.log(e.detail.value, '走进了12345');

    // 获取输入的原始值
    let value = e.detail.value;

    // 使用更严格的正则表达式，只保留数字和一个小数点
    const filteredValue = value.replace(/[^0-9.]/g, '');

    // 确保只有一个小数点
    const parts = filteredValue.split('.');
    let processedValue = '';

    if (parts.length > 2) {
        // 如果有多个小数点，只保留第一个小数点之前的部分和第一个小数点后的部分
        processedValue = parts[0] + '.' + parts.slice(1).join('').replace(/\./g, '');
    } else {
        processedValue = filteredValue;
    }

    // 限制小数点后最多两位
    const decimalParts = processedValue.split('.');
    if (decimalParts.length > 1 && decimalParts[1].length > 2) {
        processedValue = decimalParts[0] + '.' + decimalParts[1].substring(0, 2);
    }

    // 直接更新输入值
    inputValue.value = processedValue;
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
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        position: relative;
        padding-top: 43rpx;
        padding-left: 70rpx;
        height: 260rpx;
        background: linear-gradient(270deg, #28DE77 0%, #0AA96C 100%), #FFFFFF;
        margin-bottom: 20rpx;
        border-radius: 10rpx 30rpx 10rpx 0;


        .title_box {
            .title_text {
                font-weight: 700;
                display: flex;
                font-size: 24rpx;
                color: #72FFAF;
                letter-spacing: 1px;
                margin-bottom: 20rpx;
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
        box-sizing: border-box;
        position: relative;
        background: #FFFFFF;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 20rpx;
        height: 300rpx;
        padding-top: 43rpx;

        .txt {
            font-size: 24rpx;
            color: #808080;
            padding-left: 34rpx;
            margin-bottom: 40rpx;
        }

        .input_box {
            font-weight: 700;
            margin-bottom: 20rpx;


            .box {
                display: flex;
                align-items: center;
                padding-left: 34rpx;
                margin-bottom: 20rpx;

                .dollar_sign {
                    font-size: 50rpx;
                    color: #232323;
                    margin-right: 20rpx;
                }

                .input {
                    font-size: 40rpx;
                    color: #808080;
                    letter-spacing: 2px;
                }
            }

            .tips {
                padding-left: 34rpx;
                font-size: 24rpx;
                color: #808080;
            }
        }

    }

    .withdrawal_way {
        height: 90rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 20rpx;
        font-size: 26rpx;
        color: #232323;
        letter-spacing: 1px;
        padding-left: 34rpx;
        margin-bottom: 20rpx;
        padding-top: 30rpx;
        font-weight: 600;
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