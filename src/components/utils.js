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
var sessionKeyStr = '';
var currentEnvData = undefined;
var init = function (envArr, sessionKey) {
    if (sessionKey === void 0) { sessionKey = 'developKey'; }
    wx.setStorageSync('switchEnvListOnly', envArr);
    sessionKeyStr = sessionKey;
    var wxEnvVersion = wx.getAccountInfoSync().miniProgram.envVersion; // 微信当前环境
    var currentEnvKey = wx.getStorageSync(sessionKey);
    currentEnvData = currentEnvKey ? envArr.find(function (t) { return t.value === currentEnvKey; }) : envArr.find(function (t) { return t.wxEnvVersion === wxEnvVersion; });
    return currentEnvData;
};
exports.init = init;
var changeEnv = function (value) {
    var curData = (0, exports.getEnvList)().find(function (t) { return t.value === value; });
    if (!curData) {
        throw new Error("传入的值在配置数组中不存在,请检查!");
        return;
    }
    wx.setStorageSync(sessionKeyStr, value);
    currentEnvData = curData;
};
exports.changeEnv = changeEnv;
var exit = function () {
    wx.exitMiniProgram();
};
exports.exit = exit;
var getCurrentEnvData = function () {
    return currentEnvData;
};
exports.getCurrentEnvData = getCurrentEnvData;
var getEnvList = function () {
    return wx.getStorageSync('switchEnvListOnly') || [];
};
exports.getEnvList = getEnvList;
