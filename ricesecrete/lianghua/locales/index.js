import { createI18n } from 'vue-i18n';
import zh from './zh';
import en from './en';

let locale = 'zh'; // 默认语言

try {
  locale = uni.getStorageSync('lang') || 'zh';
} catch (e) {
  console.warn('Failed to get language from storage:', e);
}

const i18n = createI18n({
  legacy: false,
  locale,
  messages: {
    zh,
    en,
  },
  fallbackLocale: 'zh',
  // missing: (locale, key) => {
  //   console.log(`[i18n missing] Locale: ${locale}, Key: ${key}`);
  // },
});

export default i18n;