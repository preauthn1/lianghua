// utils/phone.js
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return ''

    // 如果手机号长度小于11位，直接返回原号码
    if (phoneNumber.length < 11) return phoneNumber

    // 保留前3位和后4位，中间用*号替代
    return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}