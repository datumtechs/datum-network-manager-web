// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import login from './reducers/login'
import menu from './reducers/menu'
import tableData from './reducers/tableData'
import org from './reducers/org'
import isReg from './reducers/isReg'
import baseInfo from './reducers/baseInfo'
import dataSwitch from './reducers/dataSwitch'
import Loading from './reducers/loading'

const allReducers = combineReducers({
  isReg,
  login,
  menu,
  tableData,
  org,
  baseInfo,
  dataSwitch,
  Loading
})
const enhancers = applyMiddleware(reduxThunk);
const appStore = createStore(allReducers, composeWithDevTools(...[enhancers]))

export default appStore;

