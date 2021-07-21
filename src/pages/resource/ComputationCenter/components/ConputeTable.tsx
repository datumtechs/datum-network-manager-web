import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'

const CenterTable: FC<any> = () => {
  const { t } = useTranslation()
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const dataSource = [
    {
      key: '1',
      status: '胡彦斌',
      cpu: 32,
      memory: '西湖区湖底公园1号',
      bandWidth: '西湖区湖底公园1号',
    },
    {
      key: '12',
      status: '胡彦斌',
      cpu: 32,
      memory: '西湖区湖底公园1号',
      bandWidth: '西湖区湖底公园1号',
    },
  ]
  const columns = [
    {
      title: '',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('center.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('center.cpu'),
      dataIndex: 'cpu',
      key: 'cpu',
    },
    {
      title: t('center.memory'),
      dataIndex: 'memory',
      key: 'memory',
    },
    {
      title: t('center.bandwidth'),
      dataIndex: 'bandWidth',
      key: 'bandWidth',
    },
  ]
  return (
    <div className="data-table-box">
      <Table dataSource={dataSource} columns={columns} bordered />
    </div>
  )
}

export default CenterTable
