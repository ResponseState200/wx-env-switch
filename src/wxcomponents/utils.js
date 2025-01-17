const currentEnvKey = 'currentEnvKey'; // 当前环境存储的键名
/**
 * 根据环境选择存储方法
 * @param key 存储的键
 * @param value 存储的值
 */
const setStorageSync = (key, value) => {
    if (typeof uni !== 'undefined') {
        uni.setStorageSync(key, value);
    }
    else if (typeof wx !== 'undefined') {
        wx.setStorageSync(key, value);
    }
};
/**
 * 根据环境选择获取存储的方法
 * @param key 存储的键
 * @returns 存储的值
 */
const getStorageSync = (key) => {
    if (typeof uni !== 'undefined') {
        return uni.getStorageSync(key) || null;
    }
    else if (typeof wx !== 'undefined') {
        return wx.getStorageSync(key) || null;
    }
    return null; // 防止返回 undefined
};
/**
 * 获取环境配置列表
 * @returns 配置列表
 */
export const getEnvList = () => {
    return getStorageSync('switchEnvListOnly') || [];
};
/**
 * 设置环境数据
 * @param value 存储的值
 */
const setEnvData = (value) => {
    const currentKey = getStorageSync(currentEnvKey);
    setStorageSync(currentKey, value);
};
/**
 * 初始化环境配置
 * @param envArr 环境配置数组
 * @param defaultWxEnvVersion 默认环境版本，默认为 'develop'
 * @returns 当前环境配置对象
 */
export const init = (envArr, defaultWxEnvVersion = 'develop') => {
    setStorageSync('switchEnvListOnly', envArr);
    let envDataStoreKey = defaultWxEnvVersion;
    // 如果是微信小程序，尝试获取实际环境版本
    if (typeof wx !== 'undefined' && typeof wx.getAccountInfoSync === 'function') {
        envDataStoreKey = wx.getAccountInfoSync().miniProgram.envVersion;
    }
    // 设置当前环境键
    setStorageSync(currentEnvKey, envDataStoreKey);
    return getCurrentEnvData();
};
/**
 * 切换环境
 * @param wxEnvVersion 要切换到的环境版本
 */
export const changeEnv = (wxEnvVersion) => {
    const envList = getEnvList();
    const curData = envList.find((t) => t.wxEnvVersion === wxEnvVersion);
    if (!curData) {
        throw new Error("传入的值在配置数组中不存在，请检查!");
    }
    setEnvData(wxEnvVersion);
};
/**
 * 获取当前环境配置
 * @returns 当前环境配置对象
 */
export const getCurrentEnvData = () => {
    const wxEnvVersion = getStorageSync(currentEnvKey); // 当前存储的环境键
    const storeValue = getStorageSync(wxEnvVersion); // 存储的环境值
    const envList = getEnvList();
    // 返回匹配的环境配置
    return (envList.find((t) => t.wxEnvVersion === storeValue) ||
        envList.find((t) => t.wxEnvVersion === wxEnvVersion));
};
/**
 * 退出小程序或重启应用
 */
export const exit = () => {
    if (typeof wx !== 'undefined' && typeof wx.exitMiniProgram === 'function') {
        wx.exitMiniProgram();
    }
    else if (typeof uni !== 'undefined') {
        uni.reLaunch({ url: '/pages/index/index' }); // 示例，重新启动应用到首页
    }
};
