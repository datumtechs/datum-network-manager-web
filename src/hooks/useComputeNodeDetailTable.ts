

import { useEffect, useState } from 'react'
import { computeNodeApi } from '../api/index'
import { ComputeNode } from '../entity/index'


const useComputeNodeDetailTable = (data: any): ComputeNode | any => {
  const [table, tableSet] = useState()
  useEffect(() => {
    (async () => {
      // debugger
      const res = await computeNodeApi.queryPowerJoinTaskList({ powerNodeId: data.id, pageNumber: data.curPage, pageSize: data.pageSize })
      if (res.status === 0 && res.data) {
        // debugger
        tableSet(res)
      }
    })();
  }, [data.curPage])

  return { table }
}
export default useComputeNodeDetailTable