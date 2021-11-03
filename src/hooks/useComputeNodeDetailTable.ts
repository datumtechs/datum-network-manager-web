

import { useEffect, useState } from 'react'
import { computeNodeApi } from '../api/index'
import { ComputeNode } from '../entity/index'


const useComputeNodeDetailTable = (data: any): ComputeNode | any => {
  const [table, tableSet] = useState()
  useEffect(() => {
    (async () => {
      // console.log(123, data);
      const res = await computeNodeApi.queryPowerJoinTaskList({ powerNodeId: data.id, pageNumber: data.curPage, pageSize: data.pageSize })
      // const res = await computeNodeApi.queryPowerJoinTaskList({ identityId: data.identityId, pageNumber: data.curPage, pageSize: data.pageSize })
      if (res.status === 0 && res.data) {
        tableSet(res)
      }
    })();
  }, [data.curPage])

  return { table }
}
export default useComputeNodeDetailTable