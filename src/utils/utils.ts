
declare const uni: any;
interface EnvObj {
  label: string;
  wxEnvVersion: 'develop' | 'trial' | 'release';
  [key: string]: any; // 表示可以有其他任意的可选属性
}

let envDataStoreKey:string  = 'currentEnvData'

// 根据环境选择使用 uni 或 wx 的存储方法
const setStorageSync = (key: string, value: any) => {
  if (typeof uni !== 'undefined') {
    uni.setStorageSync(key, value);
  } else if (typeof wx !== 'undefined') {
    wx.setStorageSync(key, value);
  }
};

const getStorageSync = (key: string) => {
  if (typeof uni !== 'undefined') {
    return uni.getStorageSync(key);
  } else if (typeof wx !== 'undefined') {
    return wx.getStorageSync(key);
  }
  return null; // 防止返回 undefined
};


/**
 *
 * @param envArr 每个环境的配置 [
 *  {
 *    label:'开发',
 *    wxEnvVersion:;'develop', // 微信小程序的环境
 *    ...other, // 其他自定义需要用到的字段,可以自己添加,上述三个字段是必须的
 *  }
 * ]
 * @param defaultWxEnvVersion string 存放在sessionStorage中的key值
 */

export const init = (envArr: EnvObj[],defaultWxEnvVersion='develop'): EnvObj | undefined => {
  setStorageSync('switchEnvListOnly', envArr);
  // 默认使用 develop 环境，微信小程序通过 wx.getAccountInfoSync 获取环境
  envDataStoreKey = defaultWxEnvVersion;
  if (typeof wx !== 'undefined' && typeof wx.getAccountInfoSync === 'function') {
    envDataStoreKey = wx.getAccountInfoSync().miniProgram.envVersion;
  }
  return getCurrentEnvData()
};

export const changeEnv = (wxEnvVersion: string) => {
  const curData = getEnvList().find((t: EnvObj) => t.wxEnvVersion === wxEnvVersion);
  if (!curData) {
    throw new Error("传入的值在配置数组中不存在,请检查!");
    return;
  }
  setStorageSync(envDataStoreKey, wxEnvVersion);
};

export const exit = () => {
  if (typeof wx !== 'undefined' && typeof wx.exitMiniProgram === 'function') {
    wx.exitMiniProgram();
  } else if (typeof uni !== 'undefined') {
    uni.reLaunch({ url: '/pages/index/index' }); // 示例，重新启动应用到首页
  }
};

export const getCurrentEnvData = () => {
  const storeValue = getStorageSync(envDataStoreKey);
  const envList = getEnvList()
  return envList.find((t: EnvObj) => t.wxEnvVersion === storeValue) || envList.find((t: EnvObj) => t.wxEnvVersion === envDataStoreKey);
};

export const getEnvList = () => {
  return getStorageSync('switchEnvListOnly') || [];
};
