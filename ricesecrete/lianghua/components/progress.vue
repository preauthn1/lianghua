<template>
    <view class="slider-container">
        <!-- 自定义进度条 -->
        <view class="custom-slider">
            <!-- 背景轨道 -->
            <view class="slider-track" ref="trackRef">
                <!-- 激活的轨道部分 -->
                <view class="slider-active-track" :style="{ width: `${modelValue}%`, backgroundColor: activeColor }">
                </view>
            </view>

            <!-- 轨道点击区域（透明，更大的高度） -->
            <view class="track-click-area" @click="handleTrackClick"></view>

            <!-- 固定刻度点 -->
            <view class="slider-stops">
                <view v-for="stop in stops" :key="stop" class="slider-stop" :class="{ active: modelValue >= stop }"
                    :style="{ left: `${stop}%` }"></view>
            </view>

            <!-- 滑块 -->
            <view class="slider-thumb" ref="thumbRef" :style="{ left: `${modelValue}%`, backgroundColor: thumbColor }"
                @touchstart.stop.prevent="handleThumbStart" @touchmove.stop.prevent="handleThumbMove"
                @touchend.stop.prevent="handleThumbEnd"></view>

            <!-- 刻度值标签 -->
            <view class="slider-labels">
                <text v-for="stop in stops" :key="stop" class="slider-label" :style="{ left: `${stop}%` }">{{ stop
                }}%</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 定义props
const props = defineProps({
    modelValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 25 },
    activeColor: { type: String, default: '#22ad78' },
    thumbColor: { type: String, default: '#22ad78' }
})

// 定义emit
const emit = defineEmits(['update:modelValue'])

// 固定刻度点
const stops = [0, 25, 50, 75, 100]

// 滑动状态变量
let isDragging = false
let startX = 0
let startLeft = 0
let trackWidth = 0
let trackLeft = 0

// 简化的获取元素尺寸方法
const getElementRect = (selector) => {
    return new Promise((resolve) => {
        const query = uni.createSelectorQuery()
        query.select(selector).boundingClientRect(data => {
            resolve(data)
        }).exec()
    })
}

// 处理轨道点击
const handleTrackClick = async (e) => {
    const clickX = e.touches ? e.touches[0].clientX : e.changedTouches ? e.changedTouches[0].clientX : e.clientX

    // 获取轨道位置
    const trackRect = await getElementRect('.track-click-area')
    if (trackRect) {
        const percentage = ((clickX - trackRect.left) / trackRect.width) * 100
        const newValue = Math.min(100, Math.max(0, Math.round(percentage)))
        emit('update:modelValue', newValue)
    }
}

// 开始拖动滑块
const handleThumbStart = async (e) => {
    e.stopPropagation()
    isDragging = true
    startX = e.touches[0].clientX
    startLeft = props.modelValue

    // 获取轨道位置
    const trackRect = await getElementRect('.track-click-area')
    if (trackRect) {
        trackWidth = trackRect.width
        trackLeft = trackRect.left
    }
}

// 拖动滑块
const handleThumbMove = (e) => {
    if (!isDragging) return

    // 计算移动距离对应的百分比变化
    const moveX = e.touches[0].clientX - startX
    const percentageDelta = (moveX / trackWidth) * 100

    // 更新值
    let newValue = startLeft + percentageDelta
    newValue = Math.min(100, Math.max(0, Math.round(newValue)))
    emit('update:modelValue', newValue)
}

// 结束拖动
const handleThumbEnd = () => {
    isDragging = false
}
</script>

<style scoped>
.slider-container {
    padding: 0;
    text-align: center;
    position: relative;
    margin-bottom: 20rpx;
}

.custom-slider {
    position: relative;
    height: 80rpx;
}

.slider-track {
    position: absolute;
    top: 30rpx;
    left: 0;
    width: 100%;
    height: 8rpx;
    background-color: #e5e5e5;
    border-radius: 4rpx;
    z-index: 1;
}

.track-click-area {
    position: absolute;
    top: 15rpx;
    left: 0;
    width: 100%;
    height: 40rpx;
    z-index: 2;
    background-color: transparent;
}

.slider-active-track {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4rpx;
    transition: width 0.2s ease;
}

.slider-stops {
    position: absolute;
    top: 30rpx;
    left: 0;
    width: 100%;
    height: 8rpx;
    z-index: 2;
}

.slider-stop {
    position: absolute;
    width: 22rpx;
    height: 22rpx;
    border-radius: 50%;
    background-color: #e5e5e5;
    border: 2rpx solid #e5e5e5;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.slider-stop.active {
    background-color: #fff;
    border-color: #22AD78;
}

.slider-thumb {
    position: absolute;
    top: 30rpx;
	width: 36rpx;
    height: 36rpx;
    background-color: #22ad78;
    border: 4rpx solid #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2rpx 8rpx rgba(34, 173, 120, 0.3);
    z-index: 3;
    transition: all 0.2s ease;
}

.slider-labels {
    position: absolute;
    top: 55rpx;
    left: 0;
    width: 100%;
    height: 30rpx;
}

.slider-label {
    position: absolute;
    font-size: 24rpx;
    color: #666;
    transform: translateX(-50%);
}
</style>