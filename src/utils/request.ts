import axios from 'axios'
import { message } from 'antd'
import i18n from '../i18n/config'


const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


// response interceptor
service.interceptors.response.use(
  response => {
    const { data: { status, msg }, config: { url } } = response
    if (status === 1000) {
      const { pathname } = window.location
      location.href = `/login?type=redirect#${pathname}`
    }

    // if (status === 1001) {
    //   // 身份标识
    //   // location.href = "/didApplication"
    //   // window.location.href = "/didApplication"
    //   history.push('/didApplication')
    // }
    return response.data;
  },
  error => {
    message.error(`${i18n.t('login.internalError')}`)
    return Promise.reject(error)
  }
)

export default service