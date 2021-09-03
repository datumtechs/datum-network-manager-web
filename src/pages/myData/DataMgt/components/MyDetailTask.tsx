import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'
import MyTaskStatusBar from './MyTaskStatusBar'

export const MyDetailTask: FC<any> = (props: any) => {

  const { t } = useTranslation()
  const [curPage, curPageSet] = useState<number>(1)
  const [totalNum, totalNumSet] = useState<number>(0)
  const dataSource = [
    {
      id: '1',
      taskName: '明珠',
      status: 'pending',
      role: 'algoSupplier',
      duration: '1111'
    }
  ]
  const pagination = {
    defaultPageSize: 10,
  }
  const columns = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 80,
    },
    {
      title: t('task.taskName'),
      dataIndex: 'taskName',
      key: 'taskName',
    },
    // 任务状态 pending: 等在中; running: 计算中; failed: 失败; success: 成功)
    {
      title: t('task.status'),
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => {
        return <></>
      }
    },
    // owner: 任务发起方; dataSupplier: 数据提供方: powerSupplier: 算力提供方; receiver: 结果接收方; algoSupplier:算法提供方)'
    {
      title: t('task.myCapacity'),
      dataIndex: 'role',
      key: 'role',
      render: (text, record, index) => {
        return <MyTaskStatusBar status={record.status} padding={38} />

      }
    },
    {
      title: t('task.startTimeAndTaskSpent'),
      dataIndex: 'startAt',
      key: 'startAt',
      render: (text, record, index) => {
        return <>
          <p>{record.startAt}</p>
          <p>{record.duration}</p>
        </>
      }
    },
    {
      title: t('common.actions'),
      render: (text, record, index) => {
        return <></>
      }
    },
  ]

  const OnPageChange = () => { }

  return <div className="layout-box">
    <div className="add-data-box">
      <div className="top-title-box">
        <p className="top-title-">{t('center.dataName')}:&nbsp;&nbsp;</p>
        <p>{ }222222222222222222222222222222222</p>
      </div>
      <div className="top-title-box">
        <p>{t('center.metaDataID')}:&nbsp;&nbsp;</p>
        <p>{ }222222222222222222222222222222222</p>
      </div>
    </div>
    <div className="data-table-box">
      <Table
        // dataSource={tableData}
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{
          defaultCurrent: 1,
          current: curPage,
          defaultPageSize: 10,
          total: totalNum,
          onChange: OnPageChange,
        }}
      />
    </div>
  </div>
}