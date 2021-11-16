import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  // Input, Select,
  Space, DatePicker
} from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { taskApi } from '@api/index'
import moment from 'moment';
// import { SearchOutlined } from '@ant-design/icons'
import Tasktable from './components/Tasktable'
import './scss/index.scss'
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
    ownerCount: '',
    dataSupplierCount: '',
    powerSupplierCount: '',
    receiverCount: '',
    algoSupplierCount: '',
    totalTaskCount: '',
    taskSuccessCount: '',
    taskFailedCount: '',
    taskPendingCount: '',
    taskRunningCount: '',
    totalCount: ''
  })

  const [capacity, capacitySet] = useState<string>('')
  const [status, statusSet] = useState<string>('')

  const onStartChange = (time, timeStr) => {
    // 获取服务器 shanghai +8
    searchStartTimeSet(dayjs.utc(time).tz('Asia/Shanghai').valueOf())
  }
  const onEndChange = (time, timeStr) => {
    // debugger
    searchEndTimeSet(dayjs.utc(time).tz('Asia/Shanghai').valueOf())
  }
  const getParam = () => {
    return {
      endTime: searchEndTime || 0,
      pageNumber,
      pageSize: 5,
      startTime: searchStartTime || 0,
      status,
      role: +capacity,
    }
  }
  // const { table, countData, paramSet } = useTaskTable(getParam())
  const queryData = () => {
    const params = getParam()
    taskApi.taskListByQuery(params).then(res => {
      if (res.status === 0) {
        tableDataSet(res.data)
        console.log(res.total);

        totalSet(res.total)
      }
    })
  }

  const queryTaskDetails = () => {
    const params = getParam()
    taskApi.taskDetailsByQuery(params).then(res => {
      if (res.status === 0) {
        const item = { ...res.data }
        item.totalCount = Number(item.successCount)
          + Number(item.failedCount)
          + Number(item.pendingCount)
          + Number(item.runningCount)
        statusObjSet(item)
      }
    })
  }

  const setCapacity = (capa) => {
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
  }, [searchStartTime, searchEndTime, pageNumber, capacity, status])

  useEffect(() => {
    queryTaskDetails()
  }, [])


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
          {t('task.timeSpan')} <DatePicker showNow={false} showToday={false}
            showTime={{
              hideDisabledOptions: true,
              showHour: false,
              showMinute: false,
              showSecond: false,
              defaultValue: moment('00:00:00', 'HH:mm:ss')
            }}
            style={{ width: 200 }} size="large" onChange={onStartChange} />{' '}
          {t('task.to')} <DatePicker showNow={false} showToday={false}
            showTime={{
              hideDisabledOptions: true,
              showHour: false,
              showMinute: false,
              showSecond: false,
              defaultValue: moment('23:59:59', 'HH:mm:ss')
            }}
            style={{ width: 200 }} size="large" onChange={onEndChange} />
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