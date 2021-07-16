
import { SET_ORIGINAL_DATA } from '../actionType/index'

interface originalState {
  originalList: Array<[Object]>,
}

interface updateAction {
  type: string
  data: Array<[Object]>,
}

const initData = {
  originalList: [],
}

const updateData = (state: originalState = initData, action: updateAction) => {
  console.log("i am in ");

  switch (action.type) {
    case SET_ORIGINAL_DATA:
      return {
        originalList: action.data
      }
    default:
      return state
  }
}


export default updateData
