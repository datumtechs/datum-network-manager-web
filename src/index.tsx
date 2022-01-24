import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import myStore, { persistor } from './store/index'
import './i18n/config'
import App from './App'
import './assets/css/index.scss'

ReactDOM.render(
  <Provider store={myStore}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)
