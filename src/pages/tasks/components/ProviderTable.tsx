import React, { FC } from 'react'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

const ProviderTable: FC<any> = () => {
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()
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
      title: t('task.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('task.identity'),
      dataIndex: 'identity',
      key: 'identity',
    },
    {
      title: t('task.metadataNameID'),
      dataIndex: 'metadataNameID',
      key: 'metadataNameID',
      render: () => {
        return <div></div>
      },
    },
  ]
  return (
    <div className="table-box">
      <Table dataSource={dataSource} columns={columns} bordered />
    </div>
  )
}

export default ProviderTable
