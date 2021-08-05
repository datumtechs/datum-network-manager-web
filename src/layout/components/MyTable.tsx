import React, { FC } from 'react'
import { Table } from 'antd'
// import { useTranslation } from 'react-i18next'

const MyTable: FC<any> = (props: any) => {
  console.log(props)
  // const { t } = useTranslation()
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]
  const columns = [
    {
      title: 'No.',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },

    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ]
  return (
    <div className="table-box">
      <Table dataSource={dataSource} columns={columns} bordered />
    </div>
  )
}

export default MyTable
