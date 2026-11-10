<script setup>
import { onLaunch, onShow, onHide, onLoad } from "@dcloudio/uni-app";
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import { updateNavigationTitle } from "@/utils/navigationTitle.js";

const { locale } = useI18n();

const checkLoginStatus = () => {
  const token = uni.getStorageSync("token");
  const isLoggedIn = uni.getStorageSync("isLoggedIn");
  console.log("Token:", token, "Logged In:", isLoggedIn);

  if (!token || !isLoggedIn) {
    console.log("No token or not logged in, redirecting to login page");
    uni.reLaunch({
      url: "/pages/login/login"
    });
  }
};

// 检查应用权限
const checkAppPermissions = () => {
  // 检查相册权限
  uni.getSetting({
    success: res => {
      console.log("当前权限状态:", res.authSetting);

      // 如果用户之前拒绝了相册权限，可以在这里做一些提示
      if (res.authSetting["scope.writePhotosAlbum"] === false) {
        console.log("用户之前拒绝了相册权限");
      }
    },
    fail: err => {
      console.log("获取权限状态失败:", err);
    }
  });
};

// 监听语言变化，更新导航栏标题
watch(locale, newLocale => {
  console.log("语言切换为:", newLocale);
  // 延迟一下确保i18n已经更新
  setTimeout(() => {
    updateNavigationTitle();
  }, 100);
});

onLaunch(() => {
  console.log("App Launch");

  // 初始化语言设置
  const savedLanguage = uni.getStorageSync("language");
  if (savedLanguage) {
    locale.value = savedLanguage;
  }

  checkLoginStatus();
  checkAppPermissions();

  // 只在应用启动时检查是否跳转到首页
  const token = uni.getStorageSync("token");
  const isLoggedIn = uni.getStorageSync("isLoggedIn");
  if (token && isLoggedIn) {
    console.log("Token found, user is logged in, redirecting to home");
    uni.switchTab({
      url: "/pages/home/home",
      fail: err => {
        console.error("Failed to switch to home page", err);
        uni.reLaunch({
          url: "/pages/login/login"
        });
      }
    });
  }
});

onShow(() => {
  console.log("App Show");
  // 只检查登录状态，不强制跳转到首页
  checkLoginStatus();

  // 更新当前页面的导航栏标题
  updateNavigationTitle();
});

onHide(() => {
  console.log("App Hide");
});

onLoad(options => {
  console.log("App Load", options);
});
</script>

<style>
.container {
  box-sizing: border-box;
  width: 750rpx;
  background: linear-gradient(180deg, #bdf6c5 0%, #d2f8ea 100%);
  padding: 30rpx;
  position: relative;
}

/*每个页面公共css */
.title {
  font-weight: 700;
  color: #000000;
  font-size: 28rpx;
}
</style>
