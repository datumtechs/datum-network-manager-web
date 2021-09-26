
import { SET_ISREG } from '../actionType/index'


interface infoAction {
  type: string
  data: boolean
}

const setIsReg = (state: Boolean = false, action: infoAction) => {
  switch (action.type) {
    case SET_ISREG:
      return action.data
    default:
      return state
  }
}

export default setIsReg
