export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

interface ReduxState {
  isLogin: number
}

interface loginAction {
  type: string
  count: number
}

const initData = {
  isLogin: 0,
  curMenu: 'overview'
}

const login = (state: ReduxState = initData, action: loginAction) => {
  console.log(action.type);
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
