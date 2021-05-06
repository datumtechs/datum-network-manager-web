import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
// import reducer from './store/reducer'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App'
import 'antd/dist/antd.css';
import './assets/css/index.scss'
import './assets/css/theme.scss'

// const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> 引入redux */}
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root'),
)
