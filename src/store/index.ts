
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { storeList } from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['wallet']
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ ...storeList }))
const appStore = createStore(persistedReducer, composeWithDevTools(...[applyMiddleware(reduxThunk)]))
// @ts-ignore
const persistor = persistStore(appStore);

export { persistor };
export default appStore;

