interface EnvObj {
    label: string;
    wxEnvVersion: 'develop' | 'trial' | 'release';
    [key: string]: any;
}
/**
 * 获取环境配置列表
 * @returns 配置列表
 */
export declare const getEnvList: () => EnvObj[];
/**
 * 初始化环境配置
 * @param envArr 环境配置数组
 * @param defaultWxEnvVersion 默认环境版本，默认为 'develop'
 * @returns 当前环境配置对象
 */
export declare const init: (envArr: EnvObj[], defaultWxEnvVersion?: string) => EnvObj | undefined;
/**
 * 切换环境
 * @param wxEnvVersion 要切换到的环境版本
 */
export declare const changeEnv: (wxEnvVersion: "develop" | "trial" | "release") => void;
/**
 * 获取当前环境配置
 * @returns 当前环境配置对象
 */
export declare const getCurrentEnvData: () => EnvObj | undefined;
/**
 * 退出小程序或重启应用
 */
export declare const exit: () => void;
export {};
