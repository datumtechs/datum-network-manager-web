import { useEffect, useState } from 'react'
import { taskApi } from '../api/index'
import { taskQueryObj } from '../entity/index'


const useTaskTable = (data: taskQueryObj): any => {
  const [param, paramSet] = useState(data)
  const [table, tableSet] = useState()
  const [countData, countDataSet] = useState({
    runningTaskCount: 0,
    totalTaskCount: 0,
  })
  useEffect(() => {
    (async () => {
      const res = await taskApi.taskListByQuery(param)
      if (res.status === 0 && res.data) {
        tableSet(res)
        countDataSet({ runningTaskCount: res.data.countData.runningTaskCount, totalTaskCount: res.data.countData.totalTaskCount })
      }
    })();
  }, [param])

  return { table, countData, paramSet }
}
export default useTaskTable