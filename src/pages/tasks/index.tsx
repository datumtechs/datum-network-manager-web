import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Select, Space, DatePicker } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { SearchOutlined } from '@ant-design/icons'
import Tasktable from './components/Tasktable'
import './scss/index.scss'
import { taskApi } from '../../api/index'

const { Search } = Input
const { Option } = Select

dayjs.extend(utc)
dayjs.extend(timezone)

export const Tasks: FC<any> = () => {
  const { t } = useTranslation()
  const [runningTaskCount, runningTaskCountSet] = useState<number>(0)
  const [totalTaskCount, totalTaskCountSet] = useState<number>(0)
  const [tableData, tableDataSet] = useState<[]>([])
  const [searchText, searchTextSet] = useState('')
  const [searchStatus, searchStatusSet] = useState('')
  const [searchRole, searchRoleSet] = useState(0)
  const [searchStartTime, searchStartTimeSet] = useState(0)
  const [searchEndTime, searchEndTimeSet] = useState(0)
  const [pageNumber, pageNumberSet] = useState(0)
  const [total, totalSet] = useState(0)
  const onSearch = text => {
    searchTextSet(text)
  }
  const onStatusChange = text => {
    searchStatusSet(text)
  }
  const capacityChanged = text => {
    searchRoleSet(text)
  }
  const onStartChange = (time, timeStr) => {
    // 获取服务器 shanghai +8
    searchStartTimeSet(dayjs.utc(time).tz('Asia/Shanghai').valueOf())
  }
  const onEndChange = (time, timeStr) => {
    searchEndTimeSet(dayjs.utc(time).tz('Asia/Shanghai').valueOf())
  }

  const statusList = [
    { label: t('task.pending'), value: 'pending' },
    { label: t('task.computing'), value: 'running' },
    { label: t('task.failed'), value: 'failed' },
    { label: t('task.success'), value: 'success' },
  ]

  const capacityList = [
    { label: t('task.role.1'), value: 1 },
    { label: t('task.role.2'), value: 2 },
    { label: t('task.role.3'), value: 3 },
    { label: t('task.role.4'), value: 4 },
  ]
  const getParam = () => {
    return {
      endTime: searchEndTime || 0,
      keyWord: searchText,
      pageNumber,
      pageSize: 10,
      role: searchRole || 0,
      startTime: searchStartTime || 0,
      status: searchStatus || '',
    }
  }
  // const { table, countData, paramSet } = useTaskTable(getParam())
  const queryData = () => {
    taskApi.taskListByQuery(getParam()).then(res => {
      if (res.status === 0) {
        tableDataSet(res.data.list)
        totalSet(res.total)
        totalTaskCountSet(res.data.countData.totalTaskCount)
        runningTaskCountSet(res.data.countData.runningTaskCount)
      }
    })
  }

  const pageChange = page => {
    pageNumberSet(page)
  }

  useEffect(() => {
    if ((searchStartTime && searchEndTime) || (!searchStartTime && !searchEndTime)) {
      queryData()
    }
  }, [searchText, searchStatus, searchRole, searchStartTime, searchEndTime, pageNumber])

  return (
    <div className="layout-box">
      <div className="title-box">
        <div className="title-label">
          <div className="title">{t('task.myTask')}</div>
          <div className="detail">
            <p className="inProgress">
              <span>{t('task.inProgress', [runningTaskCount])}</span>
            </p>
            <p className="totalTask">
              <span>{t('task.totalTask', [totalTaskCount])}</span>
            </p>
          </div>
        </div>
        <div className="search-bar">
          <Search
            prefix={<SearchOutlined />}
            placeholder="input search text"
            size="large"
            allowClear
            enterButton={t('common.search')}
            onSearch={onSearch}
            style={{ width: 334 }}
          />
        </div>
      </div>
      <div className="filter-box">
        <Space size={43}>
          <Select
            showSearch
            style={{ width: 190 }}
            allowClear
            placeholder={t('tip.plzSelectStatus')}
            optionFilterProp="children"
            onChange={onStatusChange}
            size="large"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {statusList.map(item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
          <Select
            showSearch
            size="large"
            allowClear
            style={{ width: 200 }}
            placeholder={t('tip.plzSelectCapacity')}
            optionFilterProp="children"
            onChange={capacityChanged}
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {capacityList.map(item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Space>
        <Space size={20}>
          {t('task.timeSpan')} <DatePicker style={{ width: 200 }} size="large" onChange={onStartChange} />{' '}
          {t('task.to')} <DatePicker style={{ width: 200 }} size="large" onChange={onEndChange} />
        </Space>
      </div>
      <div className="task-table-box">
        <Tasktable tableData={tableData} total={total} pageChange={pageChange} />
      </div>
    </div>
  )
}
