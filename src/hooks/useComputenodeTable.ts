import { useEffect, useState } from 'react'
import { computeNodeApi } from '../api/index'
import { ComputeNode, SearchPageTable } from '../entity/index'


const useComputenodeTable = (data: SearchPageTable): ComputeNode | any => {

  const [table, tableSet] = useState<[ComputeNode]>()
  useEffect(() => {
    (async () => {
      const res = await computeNodeApi.queryPowerNodeList(data)
      console.log("计算节点分页数据 ============>", res);
      if (res.status === 0) {
        tableSet(res)
      }
    })();
  }, [data.keyword, data.pageNumber])

  return { table }
}
export default useComputenodeTable