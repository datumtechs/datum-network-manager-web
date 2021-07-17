import { LOGIN, LOGOUT } from '../actionType/index'


interface ReduxState {
  isLogin: number,
}

interface loginAction {
  type: string
  data: string,
}

const initData = {
  isLogin: 0,
  token: ''
}

const login = (state: ReduxState = initData, action: loginAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLogin: 1,
        token: action.data
      }
    case LOGOUT:
      return {
        isLogin: 0,
        token: ''
      }
    default:
      return state
  }
}


export default login
