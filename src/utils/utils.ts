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

interface EnvObj {
  label:string,
  value:string,
  wxEnvVersion: 'develop' | 'trial' | 'release',
  [key: string]: any; // 表示可以有其他任意的可选属性
}

let sessionKeyStr:string = 'switchEnvDevelopKey'
let currentEnvData:EnvObj | undefined = undefined;
export const init = (envArr:EnvObj[]): EnvObj | undefined => {
  wx.setStorageSync('switchEnvListOnly',envArr)
  const wxEnvVersion = wx.getAccountInfoSync().miniProgram.envVersion // 微信当前环境
  const currentEnvKey = wx.getStorageSync(sessionKeyStr)
  currentEnvData = currentEnvKey ? envArr.find((t:EnvObj) => t.value === currentEnvKey) : envArr.find((t:EnvObj) => t.wxEnvVersion === wxEnvVersion)
  return currentEnvData
};

export const changeEnv = (value:string)=>{
  const curData = getEnvList().find((t:EnvObj) => t.value === value)
  if(!curData){
    throw new Error("传入的值在配置数组中不存在,请检查!");
    return
  }
  wx.setStorageSync(sessionKeyStr,value)
  currentEnvData = curData;
}

export const exit = ()=>{
  wx.exitMiniProgram()
}

export const getCurrentEnvData = ()=>{
  return currentEnvData
}

export const getEnvList = ()=>{
  return wx.getStorageSync('switchEnvListOnly') || []
}

