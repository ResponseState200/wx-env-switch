import {getEnvList,getCurrentEnvData,changeEnv,exit} from './utils'
Component({
  data: {
    envList:getEnvList(),
    currentEnvData:getCurrentEnvData(),
  },
  properties: {
    confirmFn: {
      type: Function,
      value: null
    }
  },

  methods: {
    bindPickerChange(data){
      const index = data.detail.value
      this.setData({
        currentEnvData:this.data.envList[index]
      })
    },
    handleConfirm(){
      changeEnv(this.data.currentEnvData.wxEnvVersion)
      if (typeof this.data.confirmFn === 'function') {
        this.data.confirmFn(); // 调用传入的函数
      }else{
        exit()
      }
    },
    handleClose(){
      this.triggerEvent('close')
    },
  }
});
