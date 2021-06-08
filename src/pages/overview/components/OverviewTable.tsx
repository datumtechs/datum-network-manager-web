import React, { FC } from 'react'
import { Table } from 'antd'
import './scss/OverviewTable.scss'

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
    title: () => {
      console.log('11111111')

      return <div className="">Tasks in Computing</div>
    },
    dataIndex: 'name',
    key: 'name',
    render: (text: any, row: any, index: any) => {
      console.log(text)
      console.log(row)
      console.log(index)
      return <>1111</>
    },
  },
  {
    title: 'CPU',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Memory',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Bandwidth',
    dataIndex: 'gradient',
    key: 'gradient',
  },
]

const OverviewTable: FC<any> = (props: any) => {
  console.log(props)
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  )
}

export default OverviewTable
