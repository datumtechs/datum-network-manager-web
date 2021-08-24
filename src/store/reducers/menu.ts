import { SETMENU } from '../actionType/index'

interface ReduxState {
  curMenu: string
}

interface menuAction {
  type: string,
  data: string
}

const initData = {
  curMenu: localStorage.curMenu || ''
}

const setCurrentMenu = (state: ReduxState = initData, action: menuAction) => {
  switch (action.type) {
    case SETMENU:
      localStorage.setItem('curMenu', action.data)
      return {
        curMenu: action.data

      }
    default:
      return state
  }
}


export default setCurrentMenu
