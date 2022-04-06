import { SET_WALLET, SET_ADDRESS, LOGOUT } from '../actionType/index'
import { loginApi } from '@api'

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
export const logOut = (state: any = {}, action: action) => {
  switch (action.type) {
    case LOGOUT:
      loginApi.logoutFn().then(res => {
        console.log(12)
        if (res.status === 0) {
          console.log(1)
          const { pathname } = window.location
          location.href = `/login?type=redirect#${pathname}`
        }
      })
      return {}
    default:
      return state
  }
}
