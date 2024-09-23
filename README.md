## 微信小程序环境切换

### 介绍

​	**这是一个在小程序研发阶段,需要切换api环境时,直接在小程序内快速切换环境,不需要重新执行命令,发布体验版等操作,提高研发效率**



### 安装教程

#### 1, 安装
```
npm install wx-env-switch
```
#### 2, 原生小程序,需要在开发者工具上,先构建一下npm


### 原生小程序下使用

#### 1, 在app.js中初始化插件
```javascript
import {init} from './miniprogram_npm/wx-env-switch/components/utils'
const arrData = [
  {
    label:'开发',
    value:'dev',
    wxEnvVersion:'develop',
    apiUrl:'http://xxxx-dev.com'
  },
  {
    label:'测试',
    value:'test',
    wxEnvVersion:'trial',
    apiUrl:'http://xxxx-test.com'
  },
  {
    label:'生产',
    value:'prod',
    wxEnvVersion:'release',
    apiUrl:'http://xxxx-prod.com'
  },
]
init(arrData)

```

#### 2, 在http请求的插件上,获取当前的环境配置
```javascript
import { getCurrentEnvData } from './miniprogram_npm/wx-env-switch/components/utils'
const envData = getCurrentEnvData()
const axiosInstance = new Request({
  baseURL: envData.apiUrl,
  timeout: 30 * 1000, // 超时配置
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
```

#### 3, 在需要展示切换入口的界面上json中引入组件
```json
{
  "usingComponents": {
    "wxEnvSwitch":"../../miniprogram_npm/wx-env-switch/components"
  }
}
```

#### 4,在界面中使用,根据自己的逻辑去判断是否显示该弹窗即可
一般建议可以根据微信小程序的环境判断,也就是wx.getAccountInfoSync().miniProgram.envVersion这个api的返回值,正式环境下小程序不应该显示这个组件以及入口即可`
```wxml
 <wxEnvSwitch bind:close='handleClose' wx:if="{{showSwitch}}"></wxEnvSwitch>
```

---



### 在vue-cli创建的uniapp写的微信小程序中使用

1,在src下创建一个**wxcomponents**的目录,这个是**uniapp**的官方要求,然后将插件的**wx-switch-env**下**src/component**下所有文件拷贝到**wxcomponents**中即可

2,在项目的最开始的地步,比如**main.js**,初始化插件

```javascript
const { init } = require('/wxcomponents/wx-switch-env/utils.js')
// 你的环境配置数据
const arrData = [
  {
    label: '开发',
    value: 'dev',
    wxEnvVersion: 'develop',
    apiUrl: 'http://xxxx-dev.com'
  },
  {
    label: '测试',
    value: 'test',
    wxEnvVersion: 'trial',
    apiUrl: 'http://xxxx-test.com'
  },
  {
    label: '生产',
    value: 'prod',
    wxEnvVersion: 'release',
    apiUrl: 'http://xxxx-prod.com'
  }
]

init(arrData)
```

3, 在http请求的插件上,获取当前的环境配置
```javascript

const {getCurrentEnvData} = require('/wxcomponents/wx-switch-env/utils.js')

const envData = getCurrentEnvData()
const axiosInstance = new Request({
  baseURL: envData.apiUrl,
  timeout: 30 * 1000, // 超时配置
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
```

4, 在**page.json**下的**globalStyle**中注册这个组件,  **(注意这里vue-cli创建uniapp小程序跟IDE创建的项目不一样,IDE创建的注册这个组件要在这个界面下的style,具体可以看官方文档)**



> ***!!!这里有一个非常需要注意的点,uniapp使用微信原生编写的组件,组件名称不要使用wx开头,否则编译之后,组件名称会发生改变,导致无法使用***

```json
  "globalStyle": {
    "usingComponents": {
      "switch-env": "/wxcomponents/wx-switch-env/index",
      // "wx-switch-env": "/wxcomponents/wx-switch-env/index",不推荐使用,编译后名称会改变导致无法使用
    }
  }
```

5, 跟上述的原生小程序下一样,根据自己的需求去做插件页面的展示或者隐藏

```vue
<template>
  <custom-page>
    <custom-head title-text="测试"></custom-head>
    <view class="content-container">
      <view @click="handleShowSwtich">点击显示</view>
      <switch-env v-if="showSwitch" @close="showSwitch = false"></switch-env>
    </view>
  </custom-page>
</template>

<script setup>
const showSwitch = ref(false)

const handleShowSwtich = () => {
  showSwitch.value = true
}
</script>

```

----



### utils函数列表

>  一般使用插件自带的切换环境的组件的话,使用 **init** 初始化函数即可

| 函数名称              | 说明                                                         | 类型                                              | 默认值         |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------- | -------------- |
| **init**              | 初始化函数,其他的函数的调用需要放在初始化完成之后，props的参数见下面,第二个参数就是初始化时的环境数据,匹配的是数组中的wxEnvVersion | (arrData:props[],'develop' \|'trial' \|'release') | ([],'develop') |
| **changeEnv**         | 切换环境时触发,传入的值是init方法初始化时数组中的value值,用于保存于匹配当前选中的环境数据 | (string)                                          | 无             |
| **exit**              | 退出小程序                                                   | 无                                                | 无             |
| **getCurrentEnvData** | 获取当前的环境配置数据                                       | 无                                                | 无             |
| **getEnvList**        | 获取init时传入的环境配置数组                                 | 无                                                | 无             |

### 组件参数

| 名称          | 说明                                                  | 类型     | 参数                          |
| ------------- | ----------------------------------------------------- | -------- | ----------------------------- |
| **confirmFn** | 该参数有值,就只执行该函数,没有值就执行组件默认的逻辑. | function | (props{})  当前选中的环境数据 |

### props

| 参数         | 说明                                                         | 类型                              | 必填   |
| ------------ | ------------------------------------------------------------ | --------------------------------- | ------ |
| label        | 显示在选择器的字段,一般为中文                                | string                            | 必填   |
| value        | 选中某个环境,要保存到session中的值,不能重复                  | string                            | 必填   |
| wxEnvVersion | 微信小程序当前运行环境的标识,用于小程序在某个环境下的获取对应默认的配置,当选择某个value作为session保存之后,获取环境数据会优先根据session获取 | 'develop' \| 'trial' \| 'release' | 必填   |
| key: string  | 支持用户根据自己的业务以key:value的形式传入任何数据          | any                               | 非必填 |

### 组件事件

| 名称      | 说明                     | 参数 |
| --------- | ------------------------ | ---- |
| **close** | 点击蒙版时触发的回调事件 | 无   |

