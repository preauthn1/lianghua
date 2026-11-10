import i18n from '@/locales/index.js';

// 页面路径与标题键的映射
const pageTitleMap = {
    'pages/login/login': '登录',
    'pages/help/help': '帮助中心',
    'pages/help/detail': '帮助中心',
    'pages/myTeam/myTeam': '我的团队',
    'pages/invite/invite': '邀请好友',
    'pages/wallet/wallet': '钱包',
    'pages/profile/settings': '个人设置',
    'pages/profile/nickname': '昵称',
    'pages/profile/phone': '手机号',
    'pages/profile/changePayPassword': '支付密码',
    'pages/profile/changePassword': '修改密码',
    'pages/profile/language': '切换语言',
    'pages/mine/yongjin': '佣金',
    'pages/download/download': '下载APP',
    'pages/mine/distributionOrder': '分销订单',
    'pages/mine/commissionRecord': '佣金记录',
    'pages/mine/commissionDetail': '佣金明细',
    'pages/wallet/rechargeRecord': '充值记录',
    'pages/wallet/withdrawalRecord': '钱包',
    'pages/contact/contact': '联系客服',
    'pages/strategy/detail': '策略详情'
};

// 使用自定义导航栏的页面（这些页面不需要更新导航栏标题）
const customNavigationPages = [
    'pages/home/home',
    'pages/bind/bind',
    'pages/strategy/strategy',
    'pages/mine/mine'
];

// 需要动态设置标题的页面（这些页面会在页面内部动态设置标题）
const dynamicTitlePages = [
    'pages/strategy/detail'
];

// 更新当前页面的导航栏标题
export function updateNavigationTitle() {
    try {
        const pages = getCurrentPages();
        if (pages.length === 0) return;

        const currentPage = pages[pages.length - 1];
        const route = currentPage.route;

        // 检查是否是自定义导航栏的页面，如果是则跳过
        if (customNavigationPages.includes(route)) {
            console.log('跳过自定义导航栏页面:', route);
            return;
        }

        // 检查是否是动态标题页面，如果是则跳过（由页面内部处理）
        if (dynamicTitlePages.includes(route)) {
            console.log('跳过动态标题页面:', route);
            return;
        }

        const titleKey = pageTitleMap[route];
        if (titleKey && i18n && i18n.global && i18n.global.t) {
            const title = i18n.global.t(titleKey);

            uni.setNavigationBarTitle({
                title: title,
                success: () => {
                    console.log('导航栏标题更新成功:', title);
                },
                fail: (error) => {
                    console.error('导航栏标题更新失败:', error);
                }
            });
        } else {
            console.warn('页面无需更新导航栏标题 - 路由:', route, '标题键:', titleKey);
        }
    } catch (error) {
        console.error('更新导航栏标题失败:', error);
    }
}

// 获取所有页面的标题映射（用于批量更新）
export function getAllPageTitles() {
    try {
        if (!i18n || !i18n.global || !i18n.global.t) {
            console.warn('i18n实例未找到');
            return {};
        }

        const titles = {};
        Object.entries(pageTitleMap).forEach(([route, titleKey]) => {
            titles[route] = i18n.global.t(titleKey);
        });

        return titles;
    } catch (error) {
        console.error('获取页面标题失败:', error);
        return {};
    }
}