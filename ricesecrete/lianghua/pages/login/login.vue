<template>
    <view class="login-container">
        <view class="header">
            <text class="app-name">XX AI</text>
        </view>

        <view class="login-methods">
            <view class="method-selector">
                <text :class="{ 'active': loginMethod === 'phone' }" style="margin-right: 74rpx;"
                    @click="switchLoginMethod('phone')">
                    手机号
                </text>
                <text :class="{ 'active': loginMethod === 'email' }" @click="switchLoginMethod('email')">
                    邮箱
                </text>
            </view>
        </view>

        <view class="input-group">
            <view class="input-wrapper">
                <input class="input" :type="loginMethod === 'phone' ? 'number' : 'text'"
                    :placeholder="loginMethod === 'phone' ? '请输入手机号码' : '请输入邮箱'" v-model="account" />
            </view>
            <view class="input-wrapper">
                <input class="input" type="password" placeholder="请输入密码" v-model="password" />
            </view>
        </view>

        <view class="agreement">
            <checkbox-group @change="handleChange">
                <checkbox value="agree">
                    <text class="agreement-text">我已阅读并同意 <text style="color: #21B1FF;">注册协议</text> 和 <text
                            style="color: #21B1FF;">隐私政策</text></text>
                </checkbox>
            </checkbox-group>
        </view>

        <view class="login-btn" @click="handleLogin">登录</view>

        <view class="register-link">注册账号 </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const loginMethod = ref('phone')
const account = ref('')
const password = ref('')
const isAgreed = ref(false)

const switchLoginMethod = (method) => {
    loginMethod.value = method
    account.value = ''
}

const handleChange = (e) => {
    isAgreed.value = e.detail.value.includes('agree')
}

const handleLogin = () => {
    if (!isAgreed.value) {
        uni.showToast({
            title: '请先阅读并同意用户注册协议',
            icon: 'none'
        })
        return
    }

    if (loginMethod.value === 'phone') {
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!phoneRegex.test(account.value)) {
            uni.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
            return
        }
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(account.value)) {
            uni.showToast({
                title: '请输入正确的邮箱地址',
                icon: 'none'
            })
            return
        }
    }

    uni.showToast({
        title: `使用${loginMethod.value === 'phone' ? '手机号' : '邮箱'}登录中`,
        icon: 'none'
    })

    setTimeout(() => {
        // 模拟登录成功后获取到token
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvTHdaYjdNRjZ4TGN4WDZPWlREWDBnTU1wMnVNIiwidW5pb25pZCI6bnVsbCwib3BlbmlkIjoib0x3WmI3TUY2eExjeFg2T1pURFgwZ01NcDJ1TSIsImV4cCI6MTc1MDMzMTM5OCwiaWF0IjoxNzUwMzI3Nzk4LCJqdGkiOiI5ZmZiZjVlYS1jNGY1LTRjZWMtYTI4OC02MzkyN2MzN2FmMGYiLCJsb2dpbl91c2VyX2tleSI6IjlmZmJmNWVhLWM0ZjUtNGNlYy1hMjg4LTYzOTI3YzM3YWYwZiJ9.8j9OonnYeRtfCL1NgNWLRheXh-0Q9nahjzlurt_cOyd5NFkWJDhFyGGtwzi6nui_lYsaOjE56yj2n58kv1t6pA';
        // 将token存储到本地存储中
        uni.setStorageSync('token', token);
        // 设置登录状态
        uni.setStorageSync('isLoggedIn', true);

        uni.reLaunch({
            url: '/pages/home/home',
            success: () => {
                console.log('跳转成功')
            },
            fail: (err) => {
                console.error('跳转失败:', err)
            }
        })
    }, 1500)
}
</script>

<style scoped lang="scss">
.login-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #454976;

    .header {
        display: flex;
        justify-content: center;
        padding-top: 110rpx;
        margin-bottom: 27rpx;

        .app-name {
            font-weight: 800;
            font-size: 40rpx;
            color: #FFFFFF;
            letter-spacing: 2px;
        }
    }

    .login-methods {
        margin-bottom: 27rpx;

        .method-selector {
            display: flex;
            justify-content: center;
            align-items: center;

            text {
                font-size: 22rpx;
                color: #808080;
                letter-spacing: 1px;

                &.active {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 154rpx;
                    height: 56rpx;
                    background: #454545;
                    border-radius: 50rpx;
                    color: #FFFFFF;
                }
            }
        }
    }

    .input-group {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .input-wrapper {
            margin-bottom: 20rpx;
            width: 600rpx;
            height: 100rpx;
            background: #FFFFFF;
            border-radius: 50rpx;

            .input {
                width: 100%;
                padding: 36rpx 0 33rpx 50rpx;
                font-size: 22rpx;
                color: #808080;
                letter-spacing: 1px;
            }
        }
    }


    .agreement {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        margin-left: 75rpx;

        .checkbox_box {
            margin-right: 20rpx;
        }

        .agreement-text {
            font-weight: 600;
            font-size: 22rpx;
            color: #FFFFFF;
            letter-spacing: 1px;
        }
    }

    .login-btn {
        background: #232323;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 600rpx;
        height: 110rpx;
        border-radius: 55rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        letter-spacing: 4px;
        margin-bottom: 40rpx;
    }

    .register-link {
        font-size: 22rpx;
        color: #21B1FF;
        letter-spacing: 1px;
        margin-left: 75rpx;
    }
}
</style>
