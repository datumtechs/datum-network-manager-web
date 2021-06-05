// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import login from './reducers/login'
import menu from './reducers/menu'

const allReducers = combineReducers({
  login,
  menu
})
const enhancers = applyMiddleware(reduxThunk);
const appStore = createStore(allReducers, composeWithDevTools(...[enhancers]))

export default appStore;

