import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  // Input, Select,
  Space, DatePicker
} from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
// import { SearchOutlined } from '@ant-design/icons'
import Tasktable from './components/Tasktable'
import './scss/index.scss'
import { taskApi } from '../../api/index'
import StatusChart from './components/StatusChart'
import CapacityChart from './components/CapacityChart'

// const { Search } = Input
// const { Option } = Select

dayjs.extend(utc)
dayjs.extend(timezone)

export const Tasks: FC<any> = () => {
  const { t } = useTranslation()
  // const [runningTaskCount, runningTaskCountSet] = useState<number>(0)
  // const [totalTaskCount, totalTaskCountSet] = useState<number>(0)
  // const [searchText, searchTextSet] = useState('')
  // const [searchStatus, searchStatusSet] = useState('')
  // const [searchRole, searchRoleSet] = useState(0)
  const [tableData, tableDataSet] = useState<[]>([])
  const [searchStartTime, searchStartTimeSet] = useState(0)
  const [searchEndTime, searchEndTimeSet] = useState(0)
  const [pageNumber, pageNumberSet] = useState(1)
  const [total, totalSet] = useState(0)
  const [statusObj, statusObjSet] = useState({
    // ownerCount: '',
    // dataSupplierCount: '',
    // powerSupplierCount: '',
    // receiverCount: '',
    // algoSupplierCount: '',
    // totalTaskCount: '',
    // taskSuccessCount: '',
    // taskFailedCount: '',
    // taskPendingCount: '',
    // taskRunningCount: '',
    totalCount: ''
  })

  const [capacity, capacitySet] = useState<string>('')
  const [status, statusSet] = useState<string>('')

  const onStartChange = (time, timeStr) => {
    // 获取服务器 shanghai +8
    searchStartTimeSet(dayjs.utc(time).tz('Asia/Shanghai').valueOf())
  }
  const onEndChange = (time, timeStr) => {
    searchEndTimeSet(dayjs.utc(time).tz('Asia/Shanghai').valueOf())
  }
  const getParam = () => {
    return {
      endTime: searchEndTime || 0,
      pageNumber,
      pageSize: 5,
      startTime: searchStartTime || 0,
    }
  }
  // const { table, countData, paramSet } = useTaskTable(getParam())
  const queryData = () => {
    const params = getParam()
    Promise.all([taskApi.taskDetailsByQuery(params), taskApi.taskListByQuery(params)]).then(res => {
      if (res[0].status === 0) {
        // console.log(res[0].data);
        const item = { ...res[0].data }
        item.totalCount = Number(item.successCount)
          + Number(item.failedCount)
          + Number(item.pendingCount)
          + Number(item.runningCount)
        statusObjSet(item)
      }
      if (res[1].status === 0) {
        tableDataSet(res[1].data.list)
        totalSet(res[1].total)
      }
    })
  }

  const setCapacity = (capa: string) => {
    capacitySet(capa)
  }


  const setStatus = (sta: string) => {
    statusSet(sta)
  }


  const pageChange = page => {
    pageNumberSet(page)
  }

  useEffect(() => {
    if ((searchStartTime && searchEndTime) || (!searchStartTime && !searchEndTime)) {
      queryData()
    }
  }, [searchStartTime, searchEndTime, pageNumber])

  return (
    <div className="layout-box">
      <div className="title-box">
        <div className="title-label">
          <div className="title">
            {t('task.myTask')}:&nbsp;
            {/* {statusObj.totalTaskCount} */}
            {statusObj.totalCount}
          </div>
        </div>
      </div>
      <div className="task-charts-box">
        <StatusChart statusObj={statusObj} statusFn={setStatus} />
        <CapacityChart capacityObj={statusObj} capacityFn={setCapacity} />
      </div>
      <div className="filter-box">
        <Space size={20}>
          {t('task.timeSpan')} <DatePicker style={{ width: 200 }} size="large" onChange={onStartChange} />{' '}
          {t('task.to')} <DatePicker style={{ width: 200 }} size="large" onChange={onEndChange} />
        </Space>
      </div>
      <div className="task-table-box">
        <Tasktable
          tableData={tableData}
          // tableData={dataScource}
          pageNumber={pageNumber}
          total={total} pageChange={pageChange} />
      </div>
    </div>
  )
}

  // const onSearch = text => {
  //   searchTextSet(text)
  // }
  // const onStatusChange = text => {
  //   searchStatusSet(text)
  // }
  // const capacityChanged = text => {
  //   searchRoleSet(text)
  // }

// const dataScource = [
  //   {
  //     "createAt": 0,
  //     "id": 0,
  //     "reviewed": false,
  //     "role": 0,
  //     "status": "failed",
  //     "taskId": "11111111111111111111111",
  //     "taskName": "11111111111111111111111111"
  //   },
  //   {
  //     "createAt": 0,
  //     "id": 1,
  //     "reviewed": false,
  //     "role": 1,
  //     "status": "pending",
  //     "taskId": "222222222222222222",
  //     "taskName": "222222222222222222222222"
  //   },
  //   {
  //     "createAt": 0,
  //     "id": 2,
  //     "reviewed": true,
  //     "role": 2,
  //     "status": "success",
  //     "taskId": "3333333333333333333333",
  //     "taskName": "33333333333333333333333333"
  //   },
  //   {
  //     "createAt": 0,
  //     "id": 3,
  //     "reviewed": false,
  //     "role": 3,
  //     "status": "computing",
  //     "taskId": "4444444444444444444444",
  //     "taskName": "444444444444444444444444444"
  //   },
  //   {
  //     "createAt": 0,
  //     "id": 4,
  //     "reviewed": true,
  //     "role": 4,
  //     "status": "computing",
  //     "taskId": "5555555555555",
  //     "taskName": "55555555555555555555555555555"
  //   }
  // ]

  // const statusList = [
  //   { label: t('task.pending'), value: 'pending' },
  //   { label: t('task.computing'), value: 'running' },
  //   { label: t('task.failed'), value: 'failed' },
  //   { label: t('task.success'), value: 'success' },
  // ]

  // const capacityList = [
  //   { label: t('task.role.1'), value: 1 },
  //   { label: t('task.role.2'), value: 2 },
  //   { label: t('task.role.3'), value: 3 },
  //   { label: t('task.role.4'), value: 4 },
  // ]