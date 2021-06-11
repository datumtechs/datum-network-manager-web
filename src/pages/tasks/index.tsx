import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Input, Select, Space, DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Tasktable from './components/Tasktable'
import './scss/index.scss'

const { Search } = Input
const { Option } = Select
export const Tasks: FC<any> = () => {
  const { t } = useTranslation()
  const onSearch = () => {}
  const onStatusChange = () => {}
  const capacityChanged = () => {}
  return (
    <div className="layout-box">
      <div className="title-box">
        <div className="title-label">
          <div className="title">{t('task.myTask')}</div>
          <div className="detail">
            <p className="inProgress">
              <span>{t('task.inProgress')}</span>
              <span>:11</span>
            </p>
            <p className="totalTask">
              <span>{t('task.totalTask')}</span>
              <span>:12</span>
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
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onStatusChange}
            size="large"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
          <Select
            showSearch
            size="large"
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={capacityChanged}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Space>
        <Space size={20}>
          {t('task.timeSpan')} <DatePicker style={{ width: 200 }} size="large" /> {t('task.to')}{' '}
          <DatePicker style={{ width: 200 }} size="large" />
        </Space>
      </div>
      <div className="task-table-box">
        <Tasktable />
      </div>
    </div>
  )
}
