import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Provider } from 'react-redux'
import myStore from './store/index'

// import { createStore } from 'redux'
import './i18n/config'
import App from './App'
import './assets/css/index.scss'




// const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      {/* 引入redux */}
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root'),
)
