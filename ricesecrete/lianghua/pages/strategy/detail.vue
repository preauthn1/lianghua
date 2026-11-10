<template>
    <view class="container">
        <image class="bg_color" :src="getImagePath('bg_color.png')" />
        <view class="section">
            <view class="label">{{ t('策略名称') }}</view>
            <view class="input-box">
                <text class="input-text">{{ strategyName }}</text>
            </view>
        </view>

        <view class="section">
            <view class="label">{{ t('API账号') }}</view>
            <view class="input-box dropdown" @click="showApiPicker">
                <text class="input-text placeholder">{{ selectedApi || t('请选择API账号') }}</text>
                <uv-icon name="arrow-down" size="16" color="#999"></uv-icon>
            </view>
        </view>

        <view class="section">
            <view class="label">{{ t('币种选择') }}</view>
            <view class="input-box dropdown" @click="showCoinPicker">
                <text class="input-text placeholder">{{ selectedCoin || t('请选择币种') }}</text>
                <uv-icon name="arrow-down" size="16" color="#999"></uv-icon>
            </view>
        </view>

        <view class="section">
            <view class="label">{{ t('预设策略') }}(XXX)</view>
            <strategyTab :tabs="presetStrategies" :currentTab="currentPresetTab" @switch="switchPresetTab"
                width="500rpx" height="80rpx" lineHeight="80rpx" />
        </view>

        <view class="section">
            <view class="label-with-help">
                <text class="label mo">{{ t('策略方向') }}(XXX)</text>
                <image class="tips" :src="getImagePath('tips.png')" @click="showStrategyTips" />
            </view>
            <strategyTab :tabs="directions" :currentTab="directionsTab" @switch="switchDirectionTab" width="368rpx"
                height="60rpx" lineHeight="60rpx" />
        </view>

        <view class="section">
            <view class="label-with-help">
                <text class="label mo">{{ t('杠杆调整') }}</text>
                <image class="tips" :src="getImagePath('tips.png')" @click="showLeverageTips" />
            </view>
            <view class="input-box dropdown" @click="showLeveragePicker">
                <text class="input-text">{{ selectedLeverage }}</text>
                <uv-icon name="arrow-down" size="16" color="#999"></uv-icon>
            </view>
        </view>

        <view class="section">
            <view class="label">{{ t('预计投入') }}({{ t('保证金') }})</view>
            <view class="input-box">
                <input class="input-field" type="number" v-model="investment" :placeholder="t('请输入投入金额')" />
                <text class="unit">%</text>
            </view>
        </view>

        <view class="slider-section">
            <progressSlider v-model="sliderValue" :min="0" :max="100" :step="25" active-color="#22ad78"
                thumb-color="#fff" />
        </view>

        <view class="save_btn" @click="saveStrategy">{{ t('保存') }}</view>

        <view class="overlay" v-if="showApiPanel" @click="hideApiPicker" @touchmove.prevent.stop>
            <view class="api-panel" @click.stop @touchmove.stop>
                <view class="panel-header">
                    <text class="cancel-btn" @click="hideApiPicker">取消</text>
                    <text class="confirm-btn" @click="confirmSelection">确认</text>
                </view>

                <view class="search-section">
                    <uv-input v-model="searchKeyword" placeholder="输入关键字搜索" border="none" :clearable="false"
                        backgroundColor="#F8F8F8" height="80rpx" fontSize="24rpx" placeholderStyle="color: #808080" />
                </view>

                <view class="divider"></view>

                <view class="select-all-section">
                    <text class="select-all-text">全选</text>
                    <view class="select-all-circle" :class="{ active: selectAll }" @click="toggleSelectAll"></view>
                </view>

                <view class="no-more-content">
                    <text>没有更多内容了</text>
                </view>
            </view>
        </view>

        <view class="overlay" v-if="showCoinPanel" @click="hideCoinPicker" @touchmove.prevent.stop>
            <view class="coin-panel" @click.stop @touchmove.stop>
                <view class="panel-header">
                    <text class="cancel-btn" @click="hideCoinPicker">取消</text>
                    <text class="confirm-btn" @click="confirmCoinSelection">确认</text>
                </view>

                <view class="search-section">
                    <uv-input v-model="coinSearchKeyword" placeholder="输入关键字搜索" border="none" :clearable="false"
                        backgroundColor="#F8F8F8" height="80rpx" fontSize="28rpx" placeholderStyle="color: #CCCCCC" />
                </view>

                <view class="divider"></view>

                <view class="select-all-section">
                    <text class="select-all-text">全选</text>
                    <view class="select-all-circle" :class="{ active: coinSelectAll }" @click="toggleCoinSelectAll">
                    </view>
                </view>

                <scroll-view class="coin-list" scroll-y="true" enhanced="true" show-scrollbar="false">
                    <view class="coin-item" v-for="coin in filteredCoins" :key="coin.id"
                        @click="toggleCoinSelection(coin.id)">
                        <text class="coin-name">{{ coin.name }}</text>
                        <view class="coin-circle" :class="{ active: selectedCoins.includes(coin.id) }"></view>
                    </view>

                    <view class="no-more-content">
                        <text>没有更多内容了</text>
                    </view>
                </scroll-view>
            </view>
        </view>

        <view class="overlay" v-if="showLeveragePanel" @click="hideLeveragePicker" @touchmove.prevent.stop>
            <uv-picker ref="leveragePicker" round="30rpx" :columns="leverageColumns" @confirm="handleLeverageConfirm"
                @cancel="hideLeveragePicker" cancelColor="#808080" confirmText="确认" confirmColor="#000000"
                activeColor="#000000" color="#808080" :show="false" :closeOnClickOverlay="false"></uv-picker>
        </view>

        <TipsModal :show="showLeverageModal" title="杠杆倍数" content="用少量的资金撬动大量的投资金额，从而使收益扩大，同时风险也随之扩大" :height="340"
            @close="hideLeverageModal" @confirm="hideLeverageModal" />

        <TipsModal :show="showStrategyModal" title="Nora交易模型" content="双向持仓，不可修改" :height="300"
            @close="hideStrategyModal" @confirm="hideStrategyModal" />

    </view>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";
import strategyTab from "@/components/strategyTab.vue";
import progressSlider from "@/components/progress.vue";
import TipsModal from "@/components/TipsModal.vue";

const { t } = useI18n();

// 策略信息
const strategyName = ref('');
const selectedApi = ref('');
const selectedCoin = ref('');
const selectedPreset = ref('稳健型');
const selectedDirection = ref('做多');
const selectedLeverage = ref('10');
const investment = ref('10');
const sliderValue = ref(0);

// API选择面板相关状态
const showApiPanel = ref(false);
const searchKeyword = ref('');
const selectAll = ref(false);

// 币种选择面板相关状态
const showCoinPanel = ref(false);
const coinSearchKeyword = ref('');
const coinSelectAll = ref(false);
const selectedCoins = ref([]);

// 杠杆选择面板相关状态
const showLeveragePanel = ref(false);
const leveragePicker = ref(null);
const showLeverageModal = ref(false);

// 模态框状态
const showStrategyModal = ref(false);

// 币种数据
const coinsList = ref([
    { id: 'BTC', name: 'BTC' },
    { id: 'ETH', name: 'ETH' },
    { id: 'BNB', name: 'BNB' },
    { id: 'ADA', name: 'ADA' },
    { id: 'DOT', name: 'DOT' },
    { id: 'LINK', name: 'LINK' },
    { id: 'UNI', name: 'UNI' },
    { id: 'LTC', name: 'LTC' },
    { id: 'XRP', name: 'XRP' },
    { id: 'DOGE', name: 'DOGE' },
    { id: 'SOL', name: 'SOL' },
    { id: 'MATIC', name: 'MATIC' },
    { id: 'AVAX', name: 'AVAX' },
    { id: 'ATOM', name: 'ATOM' },
    { id: 'FTM', name: 'FTM' }
]);

// 杠杆数据 - 生成1X到125X
const leverageColumns = computed(() => {
    const columns = [];
    for (let i = 1; i <= 125; i++) {
        columns.push({
            text: `${i}X`,
            value: i
        });
    }
    return [columns];
});

// 过滤后的币种列表
const filteredCoins = computed(() => {
    if (!coinSearchKeyword.value) return coinsList.value;
    return coinsList.value.filter(coin =>
        coin.name.toLowerCase().includes(coinSearchKeyword.value.toLowerCase())
    );
});


// 选项数据
const presetStrategies = ref(['稳健型', '激进型', '保守型', '自定义']);
const directions = ref(['做多', '做空', '双向']);
const leverageOptions = ref(['5', '10', '20', '50', '100']);

const currentPresetTab = ref(0);
const directionsTab = ref(0);

const switchPresetTab = index => {
    currentPresetTab.value = index;
    console.log("当前tab", currentPresetTab.value);
};

const switchDirectionTab = index => {
    directionsTab.value = index;
    console.log("当前tab2222", directionsTab.value);
};

// 监听滑动条变化，同步投入金额
watch(sliderValue, (newVal) => {
    investment.value = newVal.toString();
});

// 监听投入金额变化，同步滑动条
watch(investment, (newVal) => {
    const value = parseInt(newVal) || 0;
    if (value >= 0 && value <= 100) {
        sliderValue.value = value;
    }
});

// 显示API选择器
const showApiPicker = () => {
    showApiPanel.value = true;
};

// 隐藏API选择器
const hideApiPicker = () => {
    showApiPanel.value = false;
    searchKeyword.value = '';
    selectAll.value = false;
};

// 确认选择
const confirmSelection = () => {
    console.log('确认选择');
    hideApiPicker();
};

// 切换全选状态
const toggleSelectAll = () => {
    selectAll.value = !selectAll.value;
};

// 保存策略
const saveStrategy = () => {
    const strategyData = {
        name: strategyName.value,
        api: selectedApi.value,
        coin: selectedCoin.value,
        preset: selectedPreset.value,
        direction: selectedDirection.value,
        leverage: selectedLeverage.value,
        investment: investment.value
    };

    console.log('保存策略配置:', strategyData);

    uni.showToast({
        title: t('保存成功'),
        icon: 'success'
    });
};

// 显示币种选择器
const showCoinPicker = () => {
    console.log('显示币种选择器');
    showCoinPanel.value = true;
};

// 隐藏币种选择器
const hideCoinPicker = () => {
    showCoinPanel.value = false;
    coinSearchKeyword.value = '';
    coinSelectAll.value = false;
};

// 切换币种选择
const toggleCoinSelection = (coinId) => {
    const index = selectedCoins.value.indexOf(coinId);
    if (index > -1) {
        // 已选中，移除
        selectedCoins.value.splice(index, 1);
    } else {
        // 未选中，检查是否超过限制
        if (selectedCoins.value.length >= 20) {
            uni.showToast({
                title: '最多只能选择20个币种',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        selectedCoins.value.push(coinId);
    }

    // 更新全选状态
    coinSelectAll.value = selectedCoins.value.length === filteredCoins.value.length;
};

// 切换币种全选状态
const toggleCoinSelectAll = () => {
    if (coinSelectAll.value) {
        // 取消全选
        selectedCoins.value = [];
        coinSelectAll.value = false;
    } else {
        // 全选，但不超过20个
        const coinsToSelect = filteredCoins.value.slice(0, 20);
        selectedCoins.value = coinsToSelect.map(coin => coin.id);
        coinSelectAll.value = selectedCoins.value.length === filteredCoins.value.length;

        if (filteredCoins.value.length > 20) {
            uni.showToast({
                title: '最多只能选择20个币种',
                icon: 'none',
                duration: 2000
            });
        }
    }
};

// 确认币种选择
const confirmCoinSelection = () => {
    if (selectedCoins.value.length === 0) {
        uni.showToast({
            title: '请至少选择一个币种',
            icon: 'none',
            duration: 2000
        });
        return;
    }

    if (selectedCoins.value.length > 20) {
        uni.showToast({
            title: '最多只能选择20个币种',
            icon: 'none',
            duration: 2000
        });
        return;
    }

    console.log('确认选择币种:', selectedCoins.value);
    hideCoinPicker();
};

// 显示杠杆选择器
const showLeveragePicker = () => {
    console.log('显示杠杆选择器');
    showLeveragePanel.value = true;
    // 延迟打开picker，确保面板先显示
    setTimeout(() => {
        if (leveragePicker.value) {
            leveragePicker.value.open();
        }
    }, 100);
};

// 隐藏杠杆选择器
const hideLeveragePicker = () => {
    showLeveragePanel.value = false;
    if (leveragePicker.value) {
        leveragePicker.value.close();
    }
};

// 处理杠杆选择确认
const handleLeverageConfirm = (e) => {
    console.log('picker确认选择:', e);
    if (e && e.value && e.value.length > 0) {
        selectedLeverage.value = e.value[0].value.toString();
    }
    hideLeveragePicker();
};

// 确认杠杆选择
const confirmLeverageSelection = () => {
    if (leveragePicker.value) {
        try {
            const selectedData = leveragePicker.value.getIndexs();
            if (selectedData && selectedData.length > 0) {
                const index = selectedData[0];
                const leverageValue = leverageColumns.value[0][index].value;
                selectedLeverage.value = leverageValue.toString();
            }
        } catch (error) {
            console.log('获取选中值失败:', error);
            // 降级处理，使用默认值
            selectedLeverage.value = '10';
        }
    }
    hideLeveragePicker();
};

// 显示杠杆说明
const showLeverageTips = () => {
    showLeverageModal.value = true;
};

// 隐藏杠杆说明
const hideLeverageModal = () => {
    showLeverageModal.value = false;
};

// 确认杠杆说明
const confirmLeverageTips = () => {
    console.log('确认杠杆说明');
    hideLeverageModal();
};

// 显示策略方向说明
const showStrategyTips = () => {
    showStrategyModal.value = true;
};

// 隐藏策略方向说明
const hideStrategyModal = () => {
    showStrategyModal.value = false;
};


onMounted(() => {
    // 获取页面参数
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const options = currentPage.options;

    if (options.name) {
        strategyName.value = decodeURIComponent(options.name);

        // 动态设置页面标题
        uni.setNavigationBarTitle({
            title: strategyName.value
        });
    }
});
</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;

    .bg_color {
        position: absolute;
        right: 0;
        top: 60rpx;
    }

    .section {
        position: relative;
        margin-bottom: 30rpx;

        .label-with-help {
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;

            .label {
                font-size: 28rpx;
                color: #333;
                font-weight: 600;
            }

            .mo {
                margin-bottom: 0 !important;
                margin-right: 20rpx;
            }

            .tips {
                width: 30rpx;
                height: 30rpx;
            }
        }

        .label {
            font-size: 24rpx;
            color: #292929;
            letter-spacing: 1px;
            font-weight: 700;
            margin-bottom: 30rpx;
        }

        .input-box {
            background: white;
            border-radius: 18rpx;
            padding: 30rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30rpx;

            .input-text {
                font-size: 24rpx;
                color: #808080;
                letter-spacing: 1px;
                font-weight: 600;
                white-space: nowrap;
            }

            .input-field {
                font-size: 28rpx;
                color: #333;
                border: none;
                outline: none;
                flex: 1;
                background: transparent;
            }

            .unit {
                font-size: 28rpx;
                color: #333;
                margin-left: 20rpx;
            }
        }


        .button-group {
            display: flex;
            gap: 20rpx;
            flex-wrap: wrap;

            .strategy-btn {
                background: white;
                border-radius: 40rpx;
                padding: 20rpx 40rpx;
                font-size: 28rpx;
                color: #333;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;

                &.active {
                    background: #22ad78;
                    color: white;
                }
            }
        }
    }

    .slider-section {
        margin-bottom: 60rpx;

        .slider-container {
            padding: 0 20rpx;
            margin-bottom: 20rpx;
        }

        .slider-labels {
            display: flex;
            justify-content: space-between;
            padding: 0 20rpx;

            .slider-label {
                font-size: 24rpx;
                color: #666;
            }
        }
    }

    .save_btn {
        width: 640rpx;
        height: 100rpx;
        background: #232323;
        border-radius: 55rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        letter-spacing: 1px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 999;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        overflow: hidden;
        touch-action: none;

        .coin-panel {
            height: 710rpx !important;
        }

        .api-panel,
        .coin-panel {
            width: 750rpx;
            height: 450rpx;
            background: #FFFFFF;
            border-radius: 30rpx 30rpx 0rpx 0rpx;
            border-top: 2rpx solid #22AD78;
            position: relative;
            display: flex;
            flex-direction: column;
            padding-top: 33rpx;
            box-sizing: border-box;

            .panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 76rpx;
                height: 88rpx;
                flex-shrink: 0;

                .cancel-btn,
                .confirm-btn {
                    font-size: 24rpx;
                    color: #000000;
                    letter-spacing: 1px;
                    font-weight: 700;
                }

                .cancel-btn {
                    color: #808080;
                }

                .confirm-btn {
                    color: #000000;
                }
            }

            .search-section {
                padding: 0 50rpx;
            }

            .divider {
                width: 610rpx;
                height: 0rpx;
                border: 2rpx solid #F5F5F5;
                margin: 0 auto;
                margin-bottom: 20rpx;
            }

            .select-all-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 76rpx;
                padding-bottom: 30rpx;

                .select-all-text {
                    font-size: 20rpx;
                    color: #808080;
                    letter-spacing: 1px;
                }

                .select-all-circle {
                    width: 30rpx;
                    height: 30rpx;
                    border-radius: 50%;
                    border: 2rpx solid #CCCCCC;
                    background: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &.active {
                        background: #22AD78;
                        border-color: #22AD78;

                        &::after {
                            content: '✓';
                            color: #FFFFFF;
                            font-size: 20rpx;
                            font-weight: bold;
                        }
                    }
                }
            }

            .no-more-content {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-bottom: 130rpx;

                text {
                    font-size: 20rpx;
                    color: #D1D1D1;
                    letter-spacing: 1px;
                }
            }

            .coin-list {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;

                .coin-item {
                    display: flex;
                    align-items: center;
                    padding: 0rpx 76rpx;
                    justify-content: space-between;
                    padding-bottom: 30rpx;

                    &:last-child {
                        border-bottom: none;
                    }

                    .coin-name {
                        font-size: 28rpx;
                        color: #333333;
                        font-weight: 600;
                    }

                    .coin-circle {
                        width: 30rpx;
                        height: 30rpx;
                        border-radius: 50%;
                        border: 2rpx solid #CCCCCC;
                        background: #FFFFFF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;

                        &.active {
                            background: #22AD78;
                            border-color: #22AD78;

                            &::after {
                                content: '✓';
                                color: #FFFFFF;
                                font-size: 20rpx;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }

        .leverage-modal {
            width: 560rpx;
            height: 340rpx;
            background: #FFFFFF;
            border-radius: 10rpx;
            display: flex;
            flex-direction: column;
            position: relative;
            touch-action: auto;
            box-sizing: border-box;

            .modal-title {
                font-size: 30rpx;
                color: #292929;
                letter-spacing: 1px;
                font-weight: 600;
                text-align: center;
                padding: 30rpx 0 46rpx 0;
            }

            .modal-content {
                color: #808080;
                letter-spacing: 1px;
                font-weight: 600;
                text-align: center;
                font-size: 24rpx;
                padding: 0 82rpx;
            }

            .modal-footer {
                // padding: 30rpx 0 40rpx 0;
                display: flex;
                justify-content: center;

                .confirm-button {
                    font-size: 24rpx;
                    color: #22AD78;
                    letter-spacing: 1px;
                    font-weight: 600;
                    // padding: 20rpx 40rpx;
                }
            }
        }
    }
}
</style>