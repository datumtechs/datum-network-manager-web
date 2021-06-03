// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createStore, combineReducers } from 'redux'
// import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import indexReducer from './reducers/index'

// export const store = createStore(reducer, applyMiddleware(reduxThunk))

const allReducers = combineReducers({
  indexReducer
})

// 推荐的写法
function configureStore() {
  const store = createStore(allReducers, composeWithDevTools()
    // applyMiddleware(thunkMiddleware, loggerMiddleware),
    // 触发 redux-devtools
    // window.composeWithDevTools ? window.composeWithDevTools() : undefined
  );
  console.log(store.getState())
  return store;
}
const appStore = configureStore();
export default appStore;

// const store: any = createStore(allReducers, composeWithDevTools())
// const store: any = createStore(myPersistReducer, applyMiddleware(promiseMiddleware))

// export default store
