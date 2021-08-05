import React, { FC, useState, useEffect } from 'react'
import { Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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

  const queryData = () => {
    taskApi.querytaskEventList(id).then(res => {
      if (res.status === 0) {
        tableDataSet(res.data)
      }
    })
  }
  useEffect(() => {
    queryData()
  }, [])

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
    {
      key: '5',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '6',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '7',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '8',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '9',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '10',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '11',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '12',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '13',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '14',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '15',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '16',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '17',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
    {
      key: '18',
      eventType: '胡彦斌',
      eventMaker: 'Succeeded',
      generationTime: 32,
      eventContent: '西湖区湖底公园1号',
    },
  ]
  const columns = [
    {
      title: 'No.',
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
