import { useEffect, useState } from 'react'
import { taskApi } from '../api/index'
import { taskQueryObj } from '../entity/index'


const useTaskTable = (data: taskQueryObj): any => {
  const [table, tableSet] = useState()
  const [countData, countDataSet] = useState({
    runningTaskCount: 0,
    totalTaskCount: 0,
  })
  useEffect(() => {
    (async () => {
      const res = await taskApi.taskListByQuery(data)
      if (res.status === 0 && res.data) {
        tableSet(res)
        countDataSet({ runningTaskCount: res.data.countData.runningTaskCount, totalTaskCount: res.data.countData.totalTaskCount })
      }
    })();
  }, [])

  return { table, countData }
}
export default useTaskTable