// utils/image.js
export const getImagePath = (iconName, basePath = '/static/image/') => {
    // 处理空值和非字符串情况
    if (!iconName || typeof iconName !== 'string') {
        return '';
    }

    // 支持传入完整路径的情况
    if (iconName.startsWith('http') || iconName.startsWith('/')) {
        return iconName;
    }

    // 拼接基础路径和图片名
    return `${basePath}${iconName}`;
};

// 可以扩展更多图片相关的工具方法
export const isValidImage = (imagePath) => {
    // 可以添加图片有效性检查的逻辑
    return imagePath && imagePath.length > 0;
};