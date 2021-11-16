import axios from 'axios'
import { message } from 'antd'
import i18n from '@/i18n/config'
import { requestLoading, requestCancel } from './loading'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

const CancelToken = axios.CancelToken;
message.config({
  maxCount: 3
})

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    config.cancelToken = new CancelToken(cancel => {
      requestCancel.add(config.url, cancel)
    })
    requestLoading.add(config.url)
    return config
  },
  error => {
    requestLoading.reset()
    requestCancel.reset()
    return Promise.reject(error)
  }
)


// response interceptor
service.interceptors.response.use(
  (response: any) => {
    const { data: { status, msg }, config: { url } } = response
    if (status === 1000) {
      const { pathname } = window.location
      location.href = `/login?type=redirect#${pathname}`
    }
    requestLoading.del(url)
    requestCancel.del(url)
    // if (status === 1001) {
    //   // 身份标识
    //   // location.href = "/didApplication"
    //   // window.location.href = "/didApplication"
    //   history.push('/didApplication')
    // }
    return response.data;
  },
  error => {
    if (error.message === '自主取消') {
      return Promise.reject(error)
    }

    requestLoading.reset()
    requestCancel.reset()
    message.error(`${i18n.t('login.internalError')}`)
    return Promise.reject(error)
  }
)

export default service