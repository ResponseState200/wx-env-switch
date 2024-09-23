"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvList = exports.getCurrentEnvData = exports.exit = exports.changeEnv = exports.init = void 0;
var currentEnvData = undefined;
var envDataStoreKey = 'currentEnvData';
// 根据环境选择使用 uni 或 wx 的存储方法
var setStorageSync = function (key, value) {
    if (typeof uni !== 'undefined') {
        uni.setStorageSync(key, value);
    }
    else if (typeof wx !== 'undefined') {
        wx.setStorageSync(key, value);
    }
};
var getStorageSync = function (key) {
    if (typeof uni !== 'undefined') {
        return uni.getStorageSync(key);
    }
    else if (typeof wx !== 'undefined') {
        return wx.getStorageSync(key);
    }
    return null; // 防止返回 undefined
};
var init = function (envArr, defaultWxEnvVersion) {
    if (defaultWxEnvVersion === void 0) { defaultWxEnvVersion = 'develop'; }
    setStorageSync('switchEnvListOnly', envArr);
    // 默认使用 develop 环境，微信小程序通过 wx.getAccountInfoSync 获取环境
    var wxEnvVersion = defaultWxEnvVersion;
    if (typeof wx !== 'undefined' && typeof wx.getAccountInfoSync === 'function') {
        wxEnvVersion = wx.getAccountInfoSync().miniProgram.envVersion;
    }
    currentEnvData = getStorageSync(envDataStoreKey) || envArr.find(function (t) { return t.wxEnvVersion === wxEnvVersion; });
    setStorageSync(envDataStoreKey, currentEnvData);
    return currentEnvData;
};
exports.init = init;
var changeEnv = function (value) {
    var curData = (0, exports.getEnvList)().find(function (t) { return t.value === value; });
    if (!curData) {
        throw new Error("传入的值在配置数组中不存在,请检查!");
        return;
    }
    setStorageSync(envDataStoreKey, curData);
    currentEnvData = curData;
};
exports.changeEnv = changeEnv;
var exit = function () {
    if (typeof wx !== 'undefined' && typeof wx.exitMiniProgram === 'function') {
        wx.exitMiniProgram();
    }
    else if (typeof uni !== 'undefined') {
        uni.reLaunch({ url: '/pages/index/index' }); // 示例，重新启动应用到首页
    }
};
exports.exit = exit;
var getCurrentEnvData = function () {
    return getStorageSync(envDataStoreKey);
};
exports.getCurrentEnvData = getCurrentEnvData;
var getEnvList = function () {
    return getStorageSync('switchEnvListOnly') || [];
};
exports.getEnvList = getEnvList;
