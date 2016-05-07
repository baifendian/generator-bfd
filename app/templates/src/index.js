/**
 * 整个应用的入口，所有资源的根源
 */

import xhr from 'bfd/xhr'
import message from 'bfd/message'
import auth from 'public/auth'
import router from './router'
import pace from './pace'
import './pace.less'

pace.start()

/**
 * 开发环境、线上环境数据接口配置
 */
if (process.env.NODE_ENV === 'production') {
  xhr.baseUrl = '/api/'
} else {
  xhr.baseUrl = 'http://192.168.188.166:8080/api/'
}

/**
 * AJAX 全局配置，比如请求失败、会话过期的全局处理。参考 bfd-ui AJAX 请求组件
 */
xhr.success = (res, option) => {
  if (typeof res !== 'object') {
    message.danger(option.url + ': response data should be JSON')
    return
  }
  switch (res.code) {
    case 200:
      option.success && option.success(res.data)
      break
    case 401:
      auth.destroy()
      router.history.replaceState({
        referrer: router.state.location.pathname
      }, '/login')
      break
    default:
      message.danger(res.message || 'unknown error')
  }
}