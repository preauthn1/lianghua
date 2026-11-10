<template>
    <view class="help">
        <view class="title">三步让您轻松交易</view>
        <view class="list_box">
            <view class="col">1.首页点击[API绑定],进行绑定您的交易所API:</view>
            <view class="con">API是欧易币安官方的,不会涉及资金安全问题,有疑问可以咨询欧易币安官方客服。(帮助中心有API对接的详细教程)</view>
        </view>
        <view class="list_box">
            <view class="col">2.绑定好后点击【我的】-【USDT充值】:</view>
            <view class="con">用于GPT大模型Token扣费,所以账户中需要有余额才能使用。</view>
        </view>
        <view class="list_box">
            <view class="col">3.充值好后点击【策略】-【AI综合策略】:</view>
            <view class="con">多种策略可选,也可自定义微调策略,选择API账号,币种,按要求填写,点保存即可创建完成。</view>
        </view>
        <view class="congratulation">恭喜您,任务将在24小时后自动执行!您随时可用币安欧易等交易所查看Ai给您进行的交易,您也可以随时接管您的交易,且不影响您的其他交易和操作。</view>

        <view class="tips" @click="toContact">如您使用过程中有任何问题,您可咨询
            <view class="blue">在线客服。</view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const toContact = () => {
    // uni.navigateTo({
    //     url: '/pages/contact/contact'
    // })
}

</script>

<style scoped lang="scss">
.help {
    margin-left: 30rpx;
    margin-right: 30rpx;
    padding-top: 20rpx;

    .title {
        font-size: 34rpx;
        color: #292929;
        font-weight: 700;
        margin-bottom: 50rpx;
    }

    .list_box {
        margin-bottom: 60rpx;

        .col {
            font-size: 26rpx;
            color: #232323;
            letter-spacing: 2px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .con {
            font-size: 24rpx;
            color: #808080;
            letter-spacing: 1px;
        }
    }

    .congratulation {
        font-size: 26rpx;
        color: #232323;
        letter-spacing: 1px;
        margin-bottom: 60rpx;
    }

    .tips {
        font-weight: 700;
        font-size: 26rpx;
        color: #232323;
        display: flex;

        .blue {
            padding-left: 4rpx;
            letter-spacing: 1px;
            font-weight: 800;
            color: #227EFF;
            text-decoration: underline;
            text-underline-offset: 2px;
        }
    }


}
</style>