import appStore from "../store"
import { LOADING } from "../store/actionType/index"

const queryList = new Set()
const queryAllList = new Map()

//loading
export const noInclude = [
  '/api/v1/system/queryBaseInfo', 
  '/api/v1/user/findLocalOrgInfo', 
  '/api/v1/data/listLocalMetaDataByKeyword',
  '/api/v1/dataToken/getDataTokenStatus',
  '/api/v1/attributeDataToken/getAttributeDataTokenStatus',
  '/api/v1/authority/todoList',
  '/api/v1/authority/doneList',
  '/api/v1/authority/myProposalList',
  '/api/v1/authority/list',
  '/api/v1/authority/getNominateMember',
]
//Cancel
export const noDuplicateRemovalInclude = [
  '/api/v1/overview/localPowerStatsTrendMonthly', 
'/api/v1/overview/localDataFileStatsTrendMonthly',
'/api/v1/data/listUnBindLocalMetaDataByKeyword',
]

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