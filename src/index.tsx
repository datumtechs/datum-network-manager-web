import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Layout } from './layout/index'
import { BrowserRouter } from 'react-router-dom'
import reducer from './store/reducer'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';


// const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> */}
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ConfigProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root'))
