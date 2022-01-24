import { INFO_COMPLETENESS } from '../actionType/index'
const State = {
  orgInfoCompletionLevel: 0,
  connectNetworkStatus: 0
}

interface ReduxState {
  [key: string]: number
}

interface InfoAction {
  type: string,
  data: { [key: string]: number }
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
