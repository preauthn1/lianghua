import { lang_list, lang_textlist } from '@/api/home';
import i18n from '@/locales/index.js'
export const getlocale = async () => {
    const userInfo = localStorage.getItem('userInfo');
    let currentLangId;
    let currenLang;
    if (userInfo) {
        const user = JSON.parse(userInfo);
        currentLangId = user.userInfo.langId;
    }
    let langId = localStorage.getItem('langId');
    const res = await lang_list();
    if (res.code === 0) {
        res.data.forEach(item => {
            if (currentLangId) {
                if (item.id === currentLangId) {
                    currenLang = item.lang;
                }
            } else {
                if(langId){
                    if(langId == item.id){
                        currenLang = item.lang;
                    }
                }else{
                    currenLang = res.data[0].lang;
                }
                
            }
            localStorage.setItem('lang_list', JSON.stringify(res.data));
        });
        const localeobj = {};
        const langtext = await lang_textlist({ id: currentLangId ? currentLangId : langId ? langId : res.data[0].id }, false);
        if (langtext.code === 0) {
            langtext.data.forEach(item => {
                localeobj[item.langKey] = item.langText;
            });
        }
        i18n.global.setLocaleMessage(currenLang, localeobj);
        localStorage.setItem('lang', currenLang);
        i18n.global.locale.value = currenLang;
    }
}