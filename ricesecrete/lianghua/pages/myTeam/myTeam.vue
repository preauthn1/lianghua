<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />
        <view class="con_box">
            <view v-for="tab in tabs" :key="tab.id" class="tab" :class="{ active: activeTab === tab.id }"
                @click="switchTab(tab.id)">
                {{ tab.label }}
                <view v-show="activeTab === tab.id" class="tab-indicator"></view>
            </view>
        </view>

        <view v-if="activeTab == '1'" class="ipt">
            <view class="ipt_box">
                <view class="ipt_icon">
                    <image :src="getImagePath('icon_search.png')" />
                </view>
                <view class="ipt_input">
                    <input type="text" placeholder="输入昵称/姓名/手机号搜索" v-model="searchKeyword" @input="handleSearch" />
                </view>
            </view>
            <view class="team_yeji">团队业绩: 0</view>
            <view v-if="searchResults.length > 0">
                <view v-for="item in searchResults" :key="item.id" class="result-item">
                    {{ item.name }} - {{ item.phone }}
                </view>
            </view>
            <view v-else class="nodata_box">
                <image class="nodata" :src="getImagePath('my_nodata.png')" />
                <view class="nodata_text">没有相关信息</view>
            </view>
        </view>

        <view v-if="activeTab == '2'">222222222</view>
        <view v-if="activeTab == '3'">33333333333</view>

    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const activeTab = ref('1');

const tabs = ref([
    { id: "1", label: "一级(0)" },
    { id: "2", label: "二级(0)" },
    { id: "3", label: "三级(0)" },
]);

const searchKeyword = ref('');
const searchResults = ref([]);

// 模拟数据
const mockData = [
    { id: 1, name: '张三', phone: '13800138001' },
    { id: 2, name: '李四', phone: '13800138002' },
    { id: 3, name: '王五', phone: '13800138003' },
    { id: 4, name: '赵六', phone: '13800138004' },
];

const switchTab = (id) => {
    console.log(id, '当前tab');
    activeTab.value = id;
    searchResults.value = [];
    searchKeyword.value = '';
}

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


</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;

    .bg_color {
        position: absolute;
        right: 0;
        top: 60rpx;
    }

    .con_box {
        position: relative;
        margin-top: 20rpx;
        display: flex;
        height: 84rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        justify-content: space-between;
        padding: 0 60rpx;
        margin-bottom: 20rpx;

        .tab {
            display: flex;
            padding-top: 17rpx;
            position: relative;
            font-size: 24rpx;
            color: #808080;
            letter-spacing: 1px;
        }

        .active {
            color: #22AD78;
        }

        .tab-indicator {
            position: absolute;
            bottom: 17rpx;
            left: 22rpx;
            width: 40rpx;
            height: 6rpx;
            background: #22AD78;
            border-radius: 3rpx;
        }
    }


    .ipt {
        position: relative;
        font-size: 24rpx;


        .ipt_box {
            display: flex;
            align-items: center;
            height: 84rpx;
            background: #FFFFFF;
            border-radius: 42rpx;
            padding-left: 44rpx;
            margin-bottom: 20rpx;

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

        .team_yeji {
            height: 84rpx;
            background: #FFFFFF;
            border-radius: 16rpx;
            display: flex;
            align-items: center;
            color: #232323;
            letter-spacing: 1px;
            padding-left: 59rpx;
            margin-bottom: 63rpx;
        }


        .nodata_box {
            display: flex;
            align-items: center;
            flex-direction: column;

            .nodata {
                width: 200rpx;
                height: 200rpx;
                display: block;
                margin-bottom: 20rpx;
            }

            .nodata_text {
                font-size: 24rpx;
                color: #22AD78;
                letter-spacing: 1px;
            }
        }



    }


}
</style>