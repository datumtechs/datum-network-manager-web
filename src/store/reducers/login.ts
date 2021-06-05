import { LOGIN, LOGOUT } from '../actionType/index'


interface ReduxState {
  isLogin: number,
}

interface loginAction {
  type: string
  count: number,
}

const initData = {
  isLogin: 0,
}

const login = (state: ReduxState = initData, action: loginAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLogin: 1
      }
    case LOGOUT:
      return {
        isLogin: 0
      }
    default:
      return state
  }
}


export default login
