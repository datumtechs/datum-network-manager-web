import { useEffect, useState } from 'react'
import { dataNodeApi } from '../api/index'
import { DataNode, SearchPageTable } from '../entity/index'


const useDatanodeTable = (data: SearchPageTable): DataNode | any => {

  const [table, tableSet] = useState<[DataNode]>()
  useEffect(() => {
    (async () => {
      const res = await dataNodeApi.queryDatanodeList(data)
      console.log("数据节点分页数据 ============>", res);
      if (res.status === 0) {
        console.log(res);
        tableSet(res)
      }
    })();
  }, [data.keyword, data.pageNumber])

  return { table }
}
export default useDatanodeTable