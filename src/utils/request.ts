import axios from 'axios'
import { message } from 'antd'

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
    return response.data;
  },
  error => {
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service