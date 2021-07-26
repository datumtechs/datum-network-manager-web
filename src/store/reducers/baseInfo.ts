
import { SET_BASEINFO_STATUS } from '../actionType/index'


interface ReduxState {
  isBaseInfoFresh: boolean,
}

interface infoAction {
  type: string
  data: boolean,
}

const initData = {
  isBaseInfoFresh: false,
}

const isBaseInfoFresh = (state: ReduxState = initData, action: infoAction) => {
  switch (action.type) {
    case SET_BASEINFO_STATUS:
      return {
        isBaseInfoFresh: action.data,
      }
    default:
      return state
  }
}

export default isBaseInfoFresh
