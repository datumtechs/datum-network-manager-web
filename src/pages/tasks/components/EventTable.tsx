import React, { FC, useState, useEffect } from 'react'
import { Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { taskApi } from '@api/index'

const EventTable: FC<any> = (props: any) => {
  const history = useHistory()
  const { id } = props
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t, i18n } = useTranslation()
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
      title: ` `,
      width: 70,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('task.eventType'),
      dataIndex: 'eventType',
    },
    {
      title: t('task.eventMaker'),
      dataIndex: 'nodeName',
      render: (text, record) => record?.dynamicFields.orgName ? `${record?.dynamicFields.orgName} (${record?.partyId})` : 'N/A',
    },
    {
      title: t('task.generationTime'),
      dataIndex: 'eventAt',
      render: (text, record) => dayjs(record.eventAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('task.eventContent'),
      dataIndex: 'eventContent',
    },
  ]
  return (
    <Table
      className="com-table"
      dataSource={tableData}
      columns={columns}
      rowKey={_ => _?.id}
      pagination={{
        defaultCurrent: 1, defaultPageSize: 10, showSizeChanger: false, onChange: onPageChange,
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
      }}
    />
  )
}

export default EventTable
