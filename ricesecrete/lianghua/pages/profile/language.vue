<template>
  <view class="container">
    <image class="bg_color" :src="getImagePath('bg_color.png')" />

    <view
      v-for="lang in languageOptions"
      :key="lang.value"
      class="language-option"
      :class="{ active: currentLanguage === lang.value }"
      @click="switchLanguage(lang.value)"
    >
      <text class="language-text">{{ t(lang.labelKey) }}</text>
      <view class="radio-btn">
        <image
          class="radio-icon"
          :src="getImagePath(currentLanguage === lang.value ? 'checked.png' : 'uncheck.png')"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getImagePath } from "@/utils/image.js";
import { updateNavigationTitle } from "@/utils/navigationTitle.js";

const { locale, t } = useI18n();
const currentLanguage = ref("zh");

const languageOptions = [
  { value: "zh", labelKey: "简体中文" },
  { value: "en", labelKey: "英文" }
];

// 页面加载时获取当前语言
onMounted(() => {
  const savedLanguage = uni.getStorageSync("language");
  currentLanguage.value = savedLanguage || locale.value || "zh";
});

// 切换语言
const switchLanguage = lang => {
  if (currentLanguage.value === lang) return;

  currentLanguage.value = lang;
  locale.value = lang;

  uni.setStorageSync("language", lang);

  // 立即更新当前页面的导航栏标题
  setTimeout(() => {
    updateNavigationTitle();

    // 显示切换成功提示
    uni.showToast({
      title: t("切换语言") + t("成功"),
      icon: "success",
      duration: 1500
    });
  }, 100);
};
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;

  .bg_color {
    position: absolute;
    right: 0;
    top: 60rpx;
  }
}

.language-option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 18rpx;
  padding: 33rpx 30rpx;
  margin-bottom: 10rpx;

  .language-text {
    font-size: 24rpx;
    color: #808080;
    letter-spacing: 1px;
    font-weight: 600;
  }

  .radio-btn {
    .radio-icon {
      width: 30rpx;
      height: 30rpx;
    }
  }
}
</style>