import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Select, Space, DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Tasktable from './components/Tasktable'
import './scss/index.scss'
import useTaskTable from '../../hooks/useTaskTable'

const { Search } = Input
const { Option } = Select
export const Tasks: FC<any> = () => {
  const { t } = useTranslation()
  const onSearch = () => {}
  const onStatusChange = () => {}
  const capacityChanged = () => {}
  const [runningTaskCount, runningTaskCountSet] = useState<number>(0)
  const [totalTaskCount, totalTaskCountSet] = useState<number>(0)
  const [tableData, tableDataSet] = useState<[]>([])

  const statusList = [
    { label: t('task.pending'), value: 'pending' },
    { label: t('task.running'), value: 'running' },
    { label: t('task.failed'), value: 'failed' },
    { label: t('task.success'), value: 'success' },
  ]

  const capacityList = [
    { label: t('task.pending'), value: 'pending' },
    { label: t('task.running'), value: 'running' },
    { label: t('task.failed'), value: 'failed' },
    { label: t('task.success'), value: 'success' },
  ]
  const { table, countData } = useTaskTable({
    endTime: 1626250562,
    keyWord: '',
    pageNumber: 1,
    pageSize: 10,
    role: 0,
    startTime: 1626250562,
    status: 'success',
  })

  useEffect(() => {
    console.log('countData', countData)
    console.log('table', table)
    tableDataSet(table?.data.list)
    totalTaskCountSet(countData?.totalTaskCount)
    runningTaskCountSet(countData?.runningTaskCount)
  }, [table?.data, countData])

  return (
    <div className="layout-box">
      <div className="title-box">
        <div className="title-label">
          <div className="title">{t('task.myTask')}</div>
          <div className="detail">
            <p className="inProgress">
              <span>{t('task.inProgress')}</span>
              <span>{runningTaskCount}</span>
            </p>
            <p className="totalTask">
              <span>{t('task.totalTask')}</span>
              <span>{totalTaskCount}</span>
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
            style={{ width: 200 }}
            placeholder={t('tip.plzSelectCapacity')}
            optionFilterProp="children"
            onChange={capacityChanged}
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {statusList.map(item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Space>
        <Space size={20}>
          {t('task.timeSpan')} <DatePicker style={{ width: 200 }} size="large" /> {t('task.to')}{' '}
          <DatePicker style={{ width: 200 }} size="large" />
        </Space>
      </div>
      <div className="task-table-box">
        <Tasktable tableData={tableData} />
      </div>
    </div>
  )
}
