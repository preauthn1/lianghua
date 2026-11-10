<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />
        <view class="header">
            <view class="he1">您好,156****5244</view>
            <view class="he2">我们随时为您提供协助</view>
        </view>
        <view class="ipt_box">
            <view class="ipt_icon">
                <image :src="getImagePath('icon_search.png')" />
            </view>
            <view class="ipt_input">
                <input type="text" placeholder="请输入您的问题" v-model="searchKeyword" @input="handleSearch" />
            </view>
        </view>

        <view class="self_service">
            <view class="title">自助服务</view>
            <view class="box">
                <view class="box_item" v-for="item in source" :key="item.id" @click="toDetail(item.id)">
                    <view class="box_item_title">{{ item.name }}</view>
                    <image class="img" :src="getImagePath(item.icon)" />
                </view>
            </view>
        </view>

        <view class="con_box">
            <view v-for="tab in tabs" :key="tab.id" class="tab" :class="{ active: activeTab === tab.id }"
                @click="switchTab(tab.id)">
                {{ tab.label }}
            </view>
        </view>

        <view class="conent" v-for="item in conent" :key="item.id" @click="toHelp()">
            <view class="ling1">
                {{ item.name }}
            </view>
            <view class="ling2">
                <view class="date">{{ item.date }}</view>
                <view class="shu"></view>
                <image class="zan" :src="getImagePath('/static/image/service_icons/zan.png')" />
                <view class="num">{{ item.num }}</view>
            </view>
        </view>

        <view class="use">
            <view class="use_title">功能</view>
            <view class="use_con" @click="toKefu()">
                <view class="left">
                    <view class="hang1">我的工单客服</view>
                    <view class="hang2">管理进行中工单及查看已解决工单</view>
                </view>
                <view class="right">
                    <image class="img" :src="getImagePath('/static/image/service_icons/arrow.png')" />
                </view>
            </view>
        </view>

        <view class="btn" @click="toKefu(2)">
            <image class="img" :src="getImagePath('/static/image/service_icons/kefu.png')" />
            <view class="txt">在线沟通</view>
        </view>

    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const searchKeyword = ref('');
const searchResults = ref([]);
const activeTab = ref('1');

const tabs = ref([
    { id: "1", label: "全部" },
    { id: "2", label: "新手教程" },
    { id: "3", label: "绑定教程" },
]);

const conent = ref([
    { id: 1, name: '三步让您轻松交易', date: '2024-03-13', num: 95622 },
    { id: 2, name: '三步让您轻松交易', date: '2024-03-13', num: 95622 },
    { id: 3, name: '三步让您轻松交易', date: '2024-03-13', num: 95622 },
    { id: 4, name: '三步让您轻松交易', date: '2024-03-13', num: 95622 },
])


const switchTab = (id) => {
    console.log(id, '当前tab');
    activeTab.value = id;
    searchResults.value = [];
    searchKeyword.value = '';
}

// 模拟数据
const mockData = [
    { id: 1, name: '张三', phone: '13800138001' },
    { id: 2, name: '李四', phone: '13800138002' },
    { id: 3, name: '王五', phone: '13800138003' },
    { id: 4, name: '赵六', phone: '13800138004' },
];


const source = ref([
    { id: 1, name: '修改登录密码', icon: 'service_icons/login.png' },
    { id: 2, name: '修改手机号', icon: 'service_icons/phone.png' },
    { id: 3, name: '修改支付密码', icon: 'service_icons/zhifu.png' },
    { id: 4, name: '修改昵称', icon: 'service_icons/name.png' },
])


const handleSearch = () => {
    console.log(searchKeyword.value, '搜索关键词');
    if (searchKeyword.value.trim() === '') {
        searchResults.value = [];
        return;
    }

    // 模拟搜索逻辑
    searchResults.value = mockData.filter(item =>
        item.name.includes(searchKeyword.value) ||
        item.phone.includes(searchKeyword.value)
    );
}

const toDetail = (id) => {
    const routes = {
        1: '/pages/profile/changePassword',
        2: '/pages/profile/phone',
        3: '/pages/profile/changePayPassword',
        4: '/pages/profile/nickname'
    };
    const route = routes[id];
    if (route) {
        uni.navigateTo({
            url: route
        });
    }
}

const toKefu = (id) => {
    console.log('dia点击了取我的工单客服');

    // if (id == 1) {
    //     uni.navigateTo({
    //         url: '/pages/help/chat'
    //     });
    // }
    // if (id == 2) {
    //     uni.navigateTo({
    //         url: '/pages/help/chat'
    //     });
    // }
}

const toHelp = () => {
    uni.navigateTo({
        url: '/pages/help/detail'
    });
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


    .header {
        margin-bottom: 20rpx;
        position: relative;

        .he1 {
            font-size: 24rpx;
            color: #292929;
            margin-bottom: 10rpx;
        }

        .he2 {
            font-size: 34rpx;
            color: #292929;
            font-weight: 700;
        }
    }


    .ipt_box {
        display: flex;
        align-items: center;
        position: relative;
        height: 84rpx;
        background: #FFFFFF;
        border-radius: 42rpx;
        margin-bottom: 30rpx;
        padding-left: 44rpx;


        .ipt_icon {
            margin-right: 20rpx;

            image {
                width: 30rpx;
                height: 30rpx;
            }
        }

        .ipt_input {
            width: 100%;

            input {
                color: #AAAAAA;
                letter-spacing: 1px;
            }
        }

    }


    .self_service {
        position: relative;

        .title {
            font-size: 34rpx;
            color: #292929;
            letter-spacing: 1px;
            font-weight: 800;
            margin-bottom: 20rpx;
        }

        .box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;

            .box_item {
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 320rpx;
                height: 100rpx;
                background: #FFFFFF;
                border-radius: 16rpx;
                margin-bottom: 20rpx;

                .box_item_title {
                    display: flex;
                    justify-content: space-between;
                    align-self: center;
                    font-size: 24rpx;
                    color: #808080;
                }

                .img {
                    width: 40rpx;
                    height: 40rpx;
                }
            }
        }
    }

    .con_box {
        position: relative;
        display: flex;
        margin-bottom: 23rpx;
        letter-spacing: 1px;
        padding-top: 13rpx;

        .tab {
            display: flex;
            align-items: center;
            font-size: 26rpx;
            color: #808080;
            padding-right: 40rpx;
        }

        .active {
            color: #22AD78;
            font-size: 30rpx;
            font-weight: 800;
        }
    }

    .conent {
        height: 140rpx;
        background: #FFFFFF;
        border-radius: 18rpx;
        padding-left: 37rpx;
        padding-top: 25rpx;
        margin-bottom: 10rpx;
        box-sizing: border-box;

        .ling1 {
            font-size: 24rpx;
            color: #292929;
            letter-spacing: 1px;
            margin-bottom: 20rpx;
            font-weight: 600;
        }

        .ling2 {
            display: flex;
            align-items: center;

            .date {
                color: #808080;
                font-size: 20rpx;
                letter-spacing: 1px;
                margin-right: 20rpx;
            }

            .shu {
                width: 2rpx;
                height: 22rpx;
                background-color: #808080;
            }

            .zan {
                display: block;
                width: 24rpx;
                height: 24rpx;
                margin-right: 20rpx;
                margin-left: 20rpx;
            }

            .num {
                color: #808080;
                font-size: 20rpx;
                letter-spacing: 1px;
            }
        }
    }


    .use {
        padding-top: 20rpx;
        margin-bottom: 20rpx;

        .use_title {
            font-size: 34rpx;
            color: #292929;
            letter-spacing: 1px;
            font-weight: 800;
            margin-bottom: 10rpx;
        }

        .use_con {
            height: 140rpx;
            background: #FFFFFF;
            border-radius: 18rpx;
            padding-left: 34rpx;
            padding-top: 28rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            .left {
                display: flex;
                flex-direction: column;
                letter-spacing: 1px;


                .hang1 {
                    font-size: 28rpx;
                    color: #292929;
                    font-weight: 600;
                    margin-bottom: 10rpx;
                }

                .hang2 {
                    font-size: 24rpx;
                    color: #808080;
                }
            }

            .right {
                margin-right: 44rpx;
                padding-top: 27rpx;

                .img {
                    width: 30rpx;
                    height: 30rpx;
                }

            }
        }
    }

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 640rpx;
        height: 100rpx;
        background: #232323;
        border-radius: 55rpx;

        .img {
            width: 50rpx;
            height: 50rpx;
            margin-right: 10rpx;
        }

        .txt {
            font-weight: 600;
            font-size: 24rpx;
            color: #FFFFFF;
            letter-spacing: 1px;
        }
    }
}
</style>