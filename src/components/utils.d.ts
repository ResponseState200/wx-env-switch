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
    label: string;
    value: string;
    wxEnvVersion: 'develop' | 'trial' | 'release';
    [key: string]: any;
}
export declare const init: (envArr: EnvObj[], sessionKey?: string) => EnvObj | undefined;
export declare const changeEnv: (value: string) => void;
export declare const exit: () => void;
export declare const getCurrentEnvData: () => EnvObj | undefined;
export declare const getEnvList: () => EnvObj[];
export {};
