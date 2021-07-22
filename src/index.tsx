import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import zhCN from 'antd/lib/locale/zh_CN'
import { Provider } from 'react-redux'
import myStore from './store/index'
import './i18n/config'
import App from './App'
import './assets/css/index.scss'

ReactDOM.render(
  <Provider store={myStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
