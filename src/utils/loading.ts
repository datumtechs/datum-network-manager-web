import appStore from "../store"

const queryList = new Set()
export const noInclude = ['/api/v1/system/queryBaseInfo']

export const requestLoading = {
  add(str: string) {
    if (!noInclude.includes(str)) {
      queryList.add(str)
      appStore.dispatch({ type: 'Loading', data: true })
    }
  },
  del(str) {
    if (!noInclude.includes(str)) {
      queryList.delete(str)
      const list = Array.from(queryList)
      if (!list.length) {
        appStore.dispatch({ type: 'Loading', data: false })
      }
    }
  },
  reset() {
    queryList.clear()
    appStore.dispatch({ type: 'Loading', data: false })
  },
  upLoading() {
    console.log('kong');
  }
}