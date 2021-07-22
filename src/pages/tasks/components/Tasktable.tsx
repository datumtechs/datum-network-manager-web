import React, { FC, useState, useEffect, useImperativeHandle } from 'react'
import { Table, Space } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MyTable = (props, ref) => {
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
    history.push('/tasks/TaskEvent')
  }

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      status: 'Succeeded',
      myCapacity: 32,
      startTime: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      status: 'Failed',
      myCapacity: 42,
      startTime: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: '胡彦祖',
      status: 'pending',
      myCapacity: 42,
      startTime: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖',
      status: 'Computing',
      myCapacity: 42,
      startTime: '西湖区湖底公园1号',
    },
  ]
  const columns = [
    {
      title: '',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },

    {
      title: t('task.nameID'),
      dataIndex: 'name',
      key: 'name',
      render: () => {
        return <div>11111</div>
      },
    },
    {
      title: t('task.status'),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return <div>{record.status}</div>
      },
    },
    {
      title: t('task.myCapacity'),
      dataIndex: 'myCapacity',
      key: 'myCapacity',
    },
    {
      title: t('task.startTime'),
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: t('task.operations'),
      dataIndex: 'operations',
      key: 'operations',
      render: () => {
        return (
          <Space size={50}>
            <span onClick={linkToDetail} className="pointer link">
              {t('task.viewDetail')}
            </span>
            <span onClick={linkToEvent} className="pointer link">
              {t('task.viewEvent')}
            </span>
          </Space>
        )
      },
    },
  ]
  return (
    <div className="table-box">
      <Table
        // dataSource={dataSource}
        dataSource={props.tableData}
        columns={columns}
        bordered
      />
    </div>
  )
}

export default MyTable
