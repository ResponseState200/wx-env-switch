interface EnvObj {
    label: string;
    wxEnvVersion: 'develop' | 'trial' | 'release';
    [key: string]: any;
}
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
export declare const init: (envArr: EnvObj[], defaultWxEnvVersion?: string) => EnvObj | undefined;
export declare const changeEnv: (wxEnvVersion: string) => void;
export declare const exit: () => void;
export declare const getCurrentEnvData: () => any;
export declare const getEnvList: () => any;
export {};
