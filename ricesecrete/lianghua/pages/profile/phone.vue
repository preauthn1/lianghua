<template>
    <view class="container">
        <input class="ipt" type="text" placeholder="请输入手机号" v-model="phone" />
        <view class="btn" @click="savePhone">保存</view>
    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const phone = ref('');

const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
};

const savePhone = () => {
    if (!validatePhone(phone.value)) {
        uni.showToast({
            title: '手机号格式不正确',
            icon: 'none'
        });

        console.log('手机号格式不正确');
        return;
    }
    console.log('手机号格式正确，保存手机号：', phone.value);
};

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