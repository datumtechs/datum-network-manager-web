// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import login from './reducers/login'
import menu from './reducers/menu'
import tableData from './reducers/tableData'
import org from './reducers/org'

const allReducers = combineReducers({
  login,
  menu,
  tableData,
  org
})
const enhancers = applyMiddleware(reduxThunk);
const appStore = createStore(allReducers, composeWithDevTools(...[enhancers]))

export default appStore;

