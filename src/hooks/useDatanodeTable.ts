import { useEffect, useState } from 'react'
import { dataNodeApi } from '../api/index'
import { DataNode, SearchPageTable } from '../entity/index'


const useDatanodeTable = (data: SearchPageTable): DataNode | any => {

  const [table, tableSet] = useState<[DataNode]>()
  useEffect(() => {
    (async () => {
      const res = await dataNodeApi.queryDatanodeList(data)
      if (res.status === 0) {
        tableSet(res)
      }
    })();
  }, [data.keyword, data.pageNumber])

  return { table }
}
export default useDatanodeTable