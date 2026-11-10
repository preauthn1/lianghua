<template>
  <view class="container">
    <image class="bg_color" :src="getImagePath('bg_color.png')" />

    <view class="content">
      <view class="section">
        <view class="label">
          <text>{{ t('问题种类') }}</text>
          <text class="required">*</text>
        </view>
        <view class="radio-group">
          <view v-for="(item, index) in problemTypes" :key="index" class="radio-item" @click="selectProblemType(index)">
            <view class="radio-icon">
              <image :src="getImagePath('checked_2.png')" class="radio-image"
                :class="{ 'radio-show': selectedProblemType === index, 'radio-hide': selectedProblemType !== index }"
                mode="aspectFit" />
              <image :src="getImagePath('uncheck.png')" class="radio-image"
                :class="{ 'radio-show': selectedProblemType !== index, 'radio-hide': selectedProblemType === index }"
                mode="aspectFit" />
            </view>
            <text class="radio-text">{{ item }}</text>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="label">
          <text>{{ t('详细说明') }}</text>
          <text class="required">*</text>
        </view>
        <textarea v-model="description" :placeholder="t('您用文字描述一下')" class="custom-textarea-native">
        </textarea>
      </view>

      <view class="section">
        <view class="upload-container">
          <view class="upload-box" @click="chooseImage">
            <uv-icon name="plus" size="60" color="#999"></uv-icon>
          </view>
          <view v-for="(image, index) in uploadedImages" :key="index" class="image-item">
            <image :src="image" class="uploaded-image" @click="previewImage(image)" />
            <view class="delete-btn" @click="deleteImage(index)">
              <uv-icon name="close" size="10" color="#fff"></uv-icon>
            </view>
          </view>
        </view>
      </view>

      <uv-action-sheet :show="showActionSheet" :actions="uploadActions" title="选择图片来源" @close="showActionSheet = false"
        @select="handleUploadSelect"></uv-action-sheet>

      <view class="section">
        <view class="label">
          <text>{{ t('您的账号') }}</text>
          <text class="required">*</text>
        </view>
        <uv-input v-model="account" :placeholder="t('注册手机号')"
          customStyle="background-color: #fff; border-radius: 12rpx;height:80rpx;margin-bottom: 30px;"></uv-input>
      </view>

      <view class="section">
        <view class="label">
          <text>{{ t('联系方式') }}</text>
          <text class="required">*</text>
        </view>
        <uv-input v-model="contact" :placeholder="t('微信、TG、邮箱')"
          customStyle="background-color: #fff; border-radius: 12rpx;height:80rpx;margin-bottom: 46px;"></uv-input>
      </view>
    </view>

    <view class="submit-container" @click="submitFeedback">{{ t('提交') }}</view>

  </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getImagePath } from "@/utils/image.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 响应式数据
const selectedProblemType = ref(0);
const description = ref("");
const uploadedImages = ref([]);
const account = ref("");
const contact = ref("");
const submitting = ref(false);
const showActionSheet = ref(false);

const uploadActions = ref([
  {
    name: "拍照",
    value: "camera",
    icon: "camera"
  },
  {
    name: "从相册选择",
    value: "album",
    icon: "photo"
  },
  {
    name: "从文件管理器选择",
    value: "file",
    icon: "folder"
  }
]);

// 问题类型选项
const problemTypes = computed(() => [
  t("报告Bug"),
  t("功能建议"),
  t("使用问题")
]);

// 选择问题类型
const selectProblemType = index => {
  selectedProblemType.value = index;
};

// 显示上传选项面板
const showUploadOptions = () => {
  if (uploadedImages.value.length >= 9) {
    uni.showToast({
      title: "最多只能上传9张图片",
      icon: "none"
    });
    return;
  }
  showActionSheet.value = true;
};

// 处理上传选项选择
const handleUploadSelect = item => {
  showActionSheet.value = false;

  switch (item.value) {
    case "camera":
      chooseImageFromCamera();
      break;
    case "album":
      chooseImageFromAlbum();
      break;
    case "file":
      chooseImageFromFile();
      break;
  }
};

// 从相机拍照
const chooseImageFromCamera = () => {
  uni.chooseImage({
    count: 9 - uploadedImages.value.length,
    sizeType: ["compressed"],
    sourceType: ["camera"],
    success: res => {
      uploadedImages.value.push(...res.tempFilePaths);
      uni.showToast({
        title: `已添加${res.tempFilePaths.length}张图片`,
        icon: "success"
      });
    },
    fail: err => {
      console.error("拍照失败:", err);
      uni.showToast({
        title: "拍照失败，请重试",
        icon: "none"
      });
    }
  });
};

// 从相册选择
const chooseImageFromAlbum = () => {
  uni.chooseImage({
    count: 9 - uploadedImages.value.length,
    sizeType: ["compressed"],
    sourceType: ["album"],
    success: res => {
      uploadedImages.value.push(...res.tempFilePaths);
      uni.showToast({
        title: `已添加${res.tempFilePaths.length}张图片`,
        icon: "success"
      });
    },
    fail: err => {
      console.error("选择图片失败:", err);
      uni.showToast({
        title: "选择图片失败，请重试",
        icon: "none"
      });
    }
  });
};

// 从文件管理器选择（App环境下的文件选择）
const chooseImageFromFile = () => {
  // #ifdef APP-PLUS
  // App环境下可以使用更丰富的文件选择API
  plus.gallery.pick(
    path => {
      uploadedImages.value.push(path);
      uni.showToast({
        title: "已添加图片",
        icon: "success"
      });
    },
    err => {
      console.error("文件选择失败:", err);
      uni.showToast({
        title: "文件选择失败",
        icon: "none"
      });
    },
    {
      filter: "image",
      multiple: true,
      maximum: 9 - uploadedImages.value.length,
      system: false
    }
  );
  // #endif

  // #ifndef APP-PLUS
  // 非App环境回退到普通相册选择
  chooseImageFromAlbum();
  // #endif
};

// 选择图片（保留原方法作为备用）
const chooseImage = () => {
  showUploadOptions();
};

// 预览图片
const previewImage = src => {
  uni.previewImage({
    urls: uploadedImages.value,
    current: src
  });
};

// 删除图片
const deleteImage = index => {
  uploadedImages.value.splice(index, 1);
};

// 表单验证
const validateForm = () => {
  if (selectedProblemType.value === null) {
    uni.showToast({
      title: "请选择问题种类",
      icon: "none"
    });
    return false;
  }

  if (!description.value.trim()) {
    uni.showToast({
      title: "请填写详细说明",
      icon: "none"
    });
    return false;
  }

  if (!account.value.trim()) {
    uni.showToast({
      title: "请填写您的账号",
      icon: "none"
    });
    return false;
  }

  if (!contact.value.trim()) {
    uni.showToast({
      title: "请填写联系方式",
      icon: "none"
    });
    return false;
  }

  return true;
};

// 提交反馈
const submitFeedback = async () => {
  if (!validateForm()) return;

  try {
    submitting.value = true;

    // 模拟提交API调用
    await new Promise(resolve => setTimeout(resolve, 2000));

    uni.showToast({
      title: t("提交成功"),
      icon: "success"
    });

    // 延迟返回上一页
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } catch (error) {
    console.error("提交失败:", error);
    uni.showToast({
      title: "提交失败，请重试",
      icon: "none"
    });
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  // 预加载图片资源，防止切换时闪烁
  // const preloadImages = [
  //   getImagePath("checked_2.png"),
  //   getImagePath("uncheck.png")
  // ];

  // preloadImages.forEach(src => {
  //   const img = new Image();
  //   img.src = src;
  // });
});
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;

  .bg_color {
    position: absolute;
    right: 0;
    top: 60rpx;
    z-index: 0;
  }
}

.content {
  position: relative;

  .section {
    .label {
      font-weight: 600;
      font-size: 22rpx;
      color: #232323;
      letter-spacing: 1px;
      margin-bottom: 30rpx;

      .required {
        color: #ff0000;
        margin-left: 4rpx;
      }
    }

    .custom-textarea-native {
      width: 100%;
      height: 200rpx;
      background-color: #fff;
      border-radius: 12rpx;
      padding: 22rpx;
      margin-bottom: 30rpx;
      font-size: 22rpx;
      color: #808080;
      letter-spacing: 1rpx;
      border: none;
      outline: none;
      resize: none;
      box-sizing: border-box;
      line-height: 1.4;

      &::placeholder {
        color: #c0c4cc;
        font-size: 22rpx;
      }
    }

    .radio-group {
      margin-bottom: 50px;

      .radio-item {
        display: flex;
        align-items: center;
        padding: 24rpx;
        background-color: #fff;
        border-radius: 12rpx;
        margin-bottom: 10rpx;

        .radio-icon {
          margin-right: 24rpx;
          position: relative;
          width: 30rpx;
          height: 30rpx;

          .radio-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 30rpx;
            height: 30rpx;
          }

          .radio-show {
            opacity: 1;
            z-index: 2;
          }

          .radio-hide {
            opacity: 0;
            z-index: 1;
          }
        }

        .radio-text {
          font-size: 22rpx;
          color: #232323;
          letter-spacing: 1px;
          font-weight: 600;
        }
      }
    }

    .upload-container {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20rpx;

      .upload-box {
        width: 160rpx;
        height: 160rpx;
        background-color: #cccccc;
        border: 2rpx dashed #d9d9d9;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;
      }

      .image-item {
        position: relative;
        width: 160rpx;
        height: 160rpx;
        margin-right: 20rpx;

        .uploaded-image {
          width: 100%;
          height: 100%;
          border-radius: 12rpx;
          object-fit: cover;
        }

        .delete-btn {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
          width: 20rpx;
          height: 20rpx;
          background-color: #ff4d4f;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

.submit-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #232323;
  border-radius: 55rpx;
  height: 100rpx;
  font-size: 24rpx;
  color: #FFFFFF;
  letter-spacing: 4px;
  font-weight: 600;
}
</style>