import { INFO_COMPLETENESS, LOGININFO } from '../actionType/index'
const State = {
  orgInfoCompletionLevel: 0,
  connectNetworkStatus: 0
}

interface ReduxState {
  [key: string]: number | any
}

interface InfoAction {
  type: string,
  data: { [key: string]: number | any }
}

const sINFO_COMPLETENESS = (state: ReduxState = State, action: InfoAction) => {
  switch (action.type) {
    case INFO_COMPLETENESS:
      return {
        orgInfoCompletionLevel: action.data.orgInfoCompletionLevel,
        connectNetworkStatus: action.data.connectNetworkStatus
      }
    default:
      return state
  }
}

export default sINFO_COMPLETENESS

export const loginInfo = (state: { loginInfo: any } = { loginInfo: {} }, action: InfoAction) => {
  switch (action.type) {
    case LOGININFO:
      return {
        loginInfo: action.data
      }
    default:
      return state
  }
}