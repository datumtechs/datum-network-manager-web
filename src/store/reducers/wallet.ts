import { SET_WALLET } from '../actionType/index'

interface ReduxState {
  wallet: any
}

interface action {
  type: string,
  data: any
}

const initData = {
  wallet: undefined
}

const wallet = (state: ReduxState = initData, action: action) => {
  switch (action.type) {
    case SET_WALLET:
      return {
        wallet: action.data
      }
    default:
      return state
  }
}


export default wallet
