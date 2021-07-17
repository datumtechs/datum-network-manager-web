import axios from 'axios'
import { message } from 'antd'
import { BrowserRouter } from 'react-router-dom'

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
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
    const { status } = response.data
    if (status !== 0) {
      if (status === 1000) {
        location.href = "/login"
        return message.error(response.data.msg)
      }

      if (status === 1001) {
        // 身份标识
        // location.href = "/didApplication"
        return false
      }
      if (status === 1002) {
        // 调度服务

      }
    }
    return response.data;
  },
  error => {
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // })
    message.error('内部错误')
    return Promise.reject(error)
  }
)

export default service