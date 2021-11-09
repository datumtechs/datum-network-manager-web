import appStore from "../store"
import { LOADING } from "../store/actionType/index"

const queryList = new Set()

export const noInclude = ['/api/v1/system/queryBaseInfo', '/api/v1/user/findLocalOrgInfo', '/api/v1/data/listLocalMetaDataByKeyword']
export const requestLoading = {
  add(str: string) {
    if (!noInclude.includes(str)) {
      queryList.add(str)
      appStore.dispatch({ type: LOADING, data: true })
    }
  },
  del(str) {
    if (!noInclude.includes(str)) {
      queryList.delete(str)
      if (!queryList.size) {
        appStore.dispatch({ type: LOADING, data: false })
      }
    }
  },
  reset() {
    queryList.clear()
    appStore.dispatch({ type: LOADING, data: false })
  },
  upLoading() {
    console.log('kong');
  }
}