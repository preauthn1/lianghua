<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />
        <image class="bg_img" :src="getImagePath('vip_bg.png')" />

        <view class="dashbord">
            <image class="dashboard_bg" :src="getImagePath('dashboard_bg2.png')" />

            <view class="card_box">
                <image class="avatr_img" :src="getImagePath('avatr.png')" />
                <view class="user_info">
                    <view class="phone_number">189****9654</view>
                    <view class="vip_icon">
                        <image class="vip_img" :src="getImagePath('vip.png')" />
                        <view class="txt">{{ t('免费版') }}</view>
                    </view>
                </view>
                <image class="vip_img2" :src="getImagePath('vip2.png')" />
            </view>
        </view>

        <view class="upgrade_section">
            <view class="upgrade_btn" @click="handleUpgrade">
                {{ t('我要升级') }}
            </view>
        </view>

        <view class="privileges_section">
            <view class="section_title">—{{ t('等级特权') }}—</view>

            <view class="current_privileges">
                <view class="privilege_title">{{ t('您当前为免费会员') }}:</view>

                <view class="privilege_item">
                    <text class="check_icon">✓</text>
                    <text class="privilege_text">{{ t('最多可绑定2个API') }}</text>
                </view>

                <view class="privilege_item">
                    <text class="check_icon">✓</text>
                    <text class="privilege_text">{{ t('多个交易所的交易数据处理/分析') }}</text>
                </view>

                <view class="privilege_item">
                    <text class="check_icon">✓</text>
                    <text class="privilege_text">{{ t('每天可执行多笔智能交易') }}</text>
                </view>

                <view class="privilege_item">
                    <text class="check_icon">✓</text>
                    <text class="privilege_text">{{ t('Gpt-4模型+Nora交易大模型') }}</text>
                </view>

                <view class="privilege_item">
                    <text class="privilege_text">1000Token=$0.16({{ t('免费版需预存>100') }})</text>
                </view>

                <view class="privilege_item">
                    <text class="check_icon">✓</text>
                    <text class="privilege_text">{{ t('可通过') }}<text class="link_text">{{ t('邀请链接注册交易所') }}</text>{{
                        t('赠送100U,免充值体验') }}!</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();


const handleUpgrade = () => {
    // 处理升级逻辑
    console.log('升级会员');
};

</script>

<style scoped lang="scss">
.container {
    padding: 0;
    min-height: 100vh;

    .bg_color {
        position: absolute;
        right: 0;
        top: 60rpx;
    }

    .bg_img {
        width: 100%;
        height: 190rpx;
        position: absolute;
    }

    .dashbord {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        margin-bottom: 50rpx;
        padding: 0 30rpx;
        padding-top: 40rpx;

        .dashboard_bg {
            height: 220rpx;
            width: 100%;
        }

        .card_box {
            position: absolute;
            top: 70rpx;
            left: 100rpx;
            right: 60rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .avatr_img {
                width: 160rpx;
                height: 160rpx;
                flex-shrink: 0;
            }

            .user_info {
                display: flex;
                flex-direction: column;

                .phone_number {
                    margin-bottom: 30rpx;
                    font-size: 36rpx;
                    font-weight: bold;
                    color: #333;
                }


                .vip_icon {
                    box-sizing: border-box;
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
                        margin-right: 6rpx;
                    }

                    .txt {
                        font-size: 20rpx;
                        color: #FF9500;
                        letter-spacing: 1px;
                        font-weight: 600;
                    }
                }
            }

            .vip_img2 {
                width: 50rpx;
                height: 30rpx;
                flex-shrink: 0;
            }
        }
    }

    .upgrade_section {
        position: relative;
        margin-bottom: 50rpx;
        padding: 0 30rpx;

        .upgrade_btn {
            width: 100%;
            height: 110rpx;
            background: #232323;
            border-radius: 55rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
            color: #FFFFFF;
            font-weight: 700;
        }
    }

    .privileges_section {
        padding: 0 60rpx;

        .section_title {
            text-align: center;
            font-weight: 700;
            margin-bottom: 50rpx;
            font-size: 24rpx;
            color: #000000;
        }

        .current_privileges {
            .privilege_title {
                font-size: 28rpx;
                color: #333;
                margin-bottom: 30rpx;
                font-weight: 600;
            }

            .privilege_item {
                display: flex;
                margin-bottom: 40rpx;
                gap: 10rpx;

                .check_icon {
                    color: #333;
                    font-size: 28rpx;
                    font-weight: bold;
                    flex-shrink: 0;
                }

                .privilege_text {
                    font-weight: 700;
                    font-size: 24rpx;
                    color: #000000;

                    .link_text {
                        color: #22AD78;
                        text-decoration: underline;

                    }
                }
            }
        }
    }
}
</style>