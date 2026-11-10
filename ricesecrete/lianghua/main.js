import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locales/index.js'
import { createPinia } from "pinia";
import uviewPlus from 'uview-plus'
// import { getlocale } from './utils/getlocal';

// try {
// 	getlocale()
// } catch (error) {
// 	console.error('Failed to load locale:', error)
// }

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.use(uviewPlus)

// 将i18n实例挂载到全局，供工具函数使用
app.config.globalProperties.$i18n = i18n;
// 为了兼容getApp()的使用方式，也挂载到全局数据
if (typeof getApp === 'function') {
    try {
        const appInstance = getApp();
        if (appInstance) {
            appInstance.globalData = appInstance.globalData || {};
            appInstance.globalData.i18n = i18n;
        }
    } catch (error) {
        console.log('getApp not available:', error);
    }
}

app.mount('#app')




