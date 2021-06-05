import { SETMENU } from '../actionType/index'


interface ReduxState {
  curMenu: string
}

interface menuAction {
  type: string,
  data: string
}

const initData = {
  curMenu: ''
}

const setCurrentMenu = (state: ReduxState = initData, action: menuAction) => {
  switch (action.type) {
    case SETMENU:
      return {
        curMenu: action.data
      }
    default:
      return state
  }
}


export default setCurrentMenu
