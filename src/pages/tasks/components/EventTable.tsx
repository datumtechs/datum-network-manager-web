import React, { FC, useState, useEffect } from 'react'
import { Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { taskApi } from '../../../api/index'

const EventTable: FC<any> = (props: any) => {
  const history = useHistory()
  const { id } = props
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
  const [tableData, tableDataSet] = useState([])
  const [curPage, curPageSet] = useState<number>(1)

  const queryData = () => {
    taskApi.querytaskEventList(id).then(res => {
      if (res.status === 0) {
        tableDataSet(res.data)
      }
    })
  }

  const onPageChange = (page: number) => {
    curPageSet(page)
  }

  useEffect(() => {
    queryData()
  }, [])

  const columns = [
    {
      title: 'No.',
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('task.eventType'),
      dataIndex: 'eventType',
      key: 'eventType',
    },
    {
      title: t('task.eventMaker'),
      dataIndex: 'nodeName',
      key: 'nodeName',
    },
    {
      title: t('task.generationTime'),
      dataIndex: 'eventAt',
      key: 'eventAt',
      render: (text, record) => dayjs(record.eventAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('task.eventContent'),
      dataIndex: 'eventContent',
      key: 'eventContent',
    },
  ]
  return (
    <div className="table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        bordered
        pagination={{ defaultCurrent: 1, defaultPageSize: 10, onChange: onPageChange }}
      />
    </div>
  )
}

export default EventTable
