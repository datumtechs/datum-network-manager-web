import React, { FC } from 'react'
import { Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const EventTable: FC<any> = () => {
  const history = useHistory()
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()
  const linkToDetail = () => {
    history.push('/tasks/taskDetail')
  }
  const linkToEvent = () => {
    history.push('/tasks/taskDaily')
  }
  const dataSource = [
    {
      key: '1',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '2',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '3',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '4',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
  ]
  const columns = [
    {
      title: '',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('task.eventType'),
      dataIndex: 'eventType',
      key: 'eventType',
    },
    {
      title: t('task.eventMaker'),
      dataIndex: 'eventMaker',
      key: 'eventMaker',
    },
    {
      title: t('task.generationTime'),
      dataIndex: 'generationTime',
      key: 'generationTime',
    },
    {
      title: t('task.eventContent'),
      dataIndex: 'eventContent',
      key: 'eventContent',
    },
  ]
  return (
    <div className="table-box">
      <Table dataSource={dataSource} columns={columns} bordered />
    </div>
  )
}

export default EventTable
