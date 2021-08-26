
import { SET_DATASWITCH } from '../actionType/index'


interface ReduxState {
  switch: 'data',
}

interface infoAction {
  type: string
  data: string,
}


const setDataSwitch = (state: string = 'data', action: infoAction) => {
  switch (action.type) {
    case SET_DATASWITCH:
      return action.data
    default:
      return state
  }
}

export default setDataSwitch
