/**
 *
 * @param envArr 每个环境的配置 [
 *  {
 *    label:'开发',
 *    value:'dev',
 *    wxEnvVersion:;'develop', // 微信小程序的环境
 *    ...other, // 其他自定义需要用到的字段,可以自己添加,上述三个字段是必须的
 *  }
 * ]
 * @param sessionKey string 存放在sessionStorage中的key值
 */
let currentEnvData = undefined;
const envDataStoreKey = 'currentEnvData';
// 根据环境选择使用 uni 或 wx 的存储方法
const setStorageSync = (key, value) => {
    if (typeof uni !== 'undefined') {
        uni.setStorageSync(key, value);
    }
    else if (typeof wx !== 'undefined') {
        wx.setStorageSync(key, value);
    }
};
const getStorageSync = (key) => {
    if (typeof uni !== 'undefined') {
        return uni.getStorageSync(key);
    }
    else if (typeof wx !== 'undefined') {
        return wx.getStorageSync(key);
    }
    return null; // 防止返回 undefined
};
export const init = (envArr, defaultWxEnvVersion = 'develop') => {
    setStorageSync('switchEnvListOnly', envArr);
    // 默认使用 develop 环境，微信小程序通过 wx.getAccountInfoSync 获取环境
    let wxEnvVersion = defaultWxEnvVersion;
    if (typeof wx !== 'undefined' && typeof wx.getAccountInfoSync === 'function') {
        wxEnvVersion = wx.getAccountInfoSync().miniProgram.envVersion;
    }
    currentEnvData = getStorageSync(envDataStoreKey) || envArr.find((t) => t.wxEnvVersion === wxEnvVersion);
    setStorageSync(envDataStoreKey, currentEnvData);
    return currentEnvData;
};
export const changeEnv = (value) => {
    const curData = getEnvList().find((t) => t.value === value);
    if (!curData) {
        throw new Error("传入的值在配置数组中不存在,请检查!");
        return;
    }
    setStorageSync(envDataStoreKey, curData);
    currentEnvData = curData;
};
export const exit = () => {
    if (typeof wx !== 'undefined' && typeof wx.exitMiniProgram === 'function') {
        wx.exitMiniProgram();
    }
    else if (typeof uni !== 'undefined') {
        uni.reLaunch({ url: '/pages/index/index' }); // 示例，重新启动应用到首页
    }
};
export const getCurrentEnvData = () => {
    return getStorageSync(envDataStoreKey);
};
export const getEnvList = () => {
    return getStorageSync('switchEnvListOnly') || [];
};
