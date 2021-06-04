// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import indexReducer from './reducers/index'

const allReducers = combineReducers({
  indexReducer
})
const enhancers = applyMiddleware(reduxThunk);
const appStore = createStore(allReducers, composeWithDevTools(...[enhancers]))

export default appStore;

