import { SET_WALLET, SET_ADDRESS, LOGOUT, SET_WALLETCONFIG } from '../actionType/index'
import { loginApi } from '@api'
// import myStore from '@/store/index'

interface ReduxState {
  wallet: any,
}

interface action {
  type: string,
  data: any
}

const initData = {
  wallet: undefined,
}

const wallet = (state: ReduxState = initData, action: action) => {
  switch (action.type) {
    case SET_WALLET:
      return {
        wallet: action.data
      }
    default:
      return state
  }
}




export default wallet

export const address = (state: { address: string } = { address: '' }, action: action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        address: action.data
      }
    default:
      return state
  }
}

const walletConfigData = {
  chain_name: "",
  chain_id: "",
  rpc_url: "",
  symbol: "",
  block_explorer_url: ""
}

export const walletConfig = (state: any = walletConfigData, action: action) => {
  switch (action.type) {
    case SET_WALLETCONFIG:
      return {
        ...action.data
      }
    default:
      return state
  }
}







export const logOut = async (state: any = {}, action: action) => {
  switch (action.type) {
    case LOGOUT:
      loginApi.logoutFn().then(res => {
        if (res.status == 0) {
          const { pathname } = window.location
          if (!action.data) {
            location.href = `/login`
            return
          }
          if(pathname) location.href = `/login?type=redirect#${pathname}`
          else location.href = `/login`
        }
      })
      return {}
    default:
      return state
  }
}
