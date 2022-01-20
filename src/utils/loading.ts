import appStore from "../store"
import { LOADING } from "../store/actionType/index"

const queryList = new Set()
const queryAllList = new Map()

export const noInclude = ['/api/v1/system/queryBaseInfo', '/api/v1/user/findLocalOrgInfo', '/api/v1/data/listLocalMetaDataByKeyword']
export const noDuplicateRemovalInclude = ['/api/v1/overview/localPowerStatsTrendMonthly', '/api/v1/overview/localDataFileStatsTrendMonthly']

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
  upLoading() { }
}
export const requestCancel = {
  add(str: string, cancel) {
    if (noDuplicateRemovalInclude.includes(str)) {
      return
    }
    if (this.has(str)) {
      cancel('自主取消')
    } else {
      queryAllList.set(str, cancel)
    }
  },
  del(str) {
    queryAllList.delete(str)
  },
  reset() {
    queryAllList.clear()
  },
  has(str) {
    return queryAllList.has(str)
  }
}