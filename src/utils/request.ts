import axios from 'axios'
import { message } from 'antd'
// import { createBrowserHistory } from 'history';
// import { BrowserRouter, useHistory } from 'react-router-dom'

// const history = createBrowserHistory();
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

<<<<<<< HEAD
      if (status === 1001) {
        // 身份标识
        // location.href = "/didApplication"
        history.pushState(null, "/didApplication")
        return false
      }
      if (status === 1002) {
        // 调度服务
=======
      // if (status === 1001) {
      //   // 身份标识
      //   // location.href = "/didApplication"
      //   // window.location.href = "/didApplication"
      //   history.push('/didApplication')
      // }
>>>>>>> 3bbb6982200a5b27dfa17a17b7f00103d5bbb611

      // if (status === 1002) {
      //   // 调度服务

      // }
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