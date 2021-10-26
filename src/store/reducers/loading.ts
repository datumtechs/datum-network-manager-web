import { LOADING } from '../actionType/index'


interface ReduxState {
  Loading: Boolean,
}

interface loginAction {
  data: boolean,
  type: String
}

const initData = {
  Loading: true
}

const Loading = (state: ReduxState = initData, action: loginAction) => {
  console.log(action);
  switch (action.type) {
    case LOADING:
      return {
        Loading: action.data
      }
    default:
      return state
  }
}


export default Loading
