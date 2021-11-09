import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Space } from 'antd'
import { useHistory } from 'react-router-dom'
import MyTaskStatusBar from './MyTaskStatusBar'
import { resourceApi } from '../../../../api/index'

export const MyDetailTask: FC<any> = (props: any) => {

  const { t } = useTranslation()
  const { metadataName, metadataId } = props.location.state
  const [curPage, curPageSet] = useState<number>(1)
  const [totalNum, totalNumSet] = useState<number>(0)
  const [tableData, tableDataSet] = useState([])
  const history = useHistory()

  const goDetail = (record) => {
    history.push({
      pathname: '/tasks/taskDetail',
      state: {
        taskId: record.taskId,
        taskName: record.taskName
      },
    })
  }
  const goEvent = (record) => {
    history.push({
      pathname: '/tasks/TaskEvent',
      state: {
        taskId: record.taskId,
        taskName: record.taskName
      },
    })
  }

  const dataSource = [
    {
      id: '1',
      taskName: '明珠',
      status: 'pending',
      role: 'owner',
      duration: '1111'
    },
    {
      id: '2',
      taskName: '明珠',
      status: 'failed',
      role: 'dataSupplier',
      duration: '1111'
    },
    {
      id: '3',
      taskName: '明珠',
      status: 'succeeded',
      role: 'algoSupplier',
      duration: '1111'
    },
    {
      id: '4',
      taskName: '明珠',
      status: 'computing',
      role: 'receiver',
      duration: '1111'
    },
    {
      id: '5',
      taskName: '明珠',
      status: 'computing',
      role: 'powerSupplier',
      duration: '1111'
    },
  ]
  const pagination = {
    defaultPageSize: 10,
  }

  const role = obj => {
    return Object.keys(obj).map((v) => {
      if (!obj[v]) return ''
      return <MyTaskStatusBar key={obj[v]} role={v} width={122} />
    })
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
      render: (text, record) => {
        return <MyTaskStatusBar status={record.status} width={82} />

      }
    },
    // owner: 任务发起方; dataSupplier: 数据提供方: powerSupplier: 算力提供方; receiver: 结果接收方; algoSupplier:算法提供方)'
    {
      title: t('task.myCapacity'),
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => {
        return role(record.dynamicFields)
      }
    },
    {
      title: t('task.startTimeAndTaskSpent'),
      dataIndex: 'startAt',
      key: 'startAt',
      render: (text, record) => {
        return <>
          <p>{record.startAt}</p>
          <p>{record.duration}</p>
        </>
      }
    },
    {
      title: t('common.actions'),
      render: (text, record, index) => {
        return <Space className="operation-box" size={10}>
          <span onClick={() => goDetail(record)} className="btn pointer">{t('task.viewDetail')}</span>
          <span onClick={() => goEvent(record)} className="btn pointer">{t('task.viewEvent')}</span>
        </Space>
      }
    },
  ]

  const OnPageChange = (page: number) => {
    curPageSet(page)
  }


  const initTabel = () => {
    resourceApi.queryDataJoinTaskList({
      keyword: '',
      // metadataId
      metaDataId: metadataId,
      pageNumber: curPage,
      pageSize: 10,
    }).then(res => {
      if (res.status === 0) {
        tableDataSet(res.data)
        totalNumSet(res.total)
      }
    })
  }


  useEffect(() => {
    initTabel()
  }, [])

  return <div className="layout-box">
    <div className="add-data-box">
      <div className="top-title-box">
        <p className="top-title-">{t('center.dataName')}:&nbsp;&nbsp;</p>
        <p>{metadataName}</p>
      </div>
      <div className="top-title-box">
        <p>{t('center.metaDataID')}:&nbsp;&nbsp;</p>
        <p>{metadataId}</p>
      </div>
    </div>
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        // dataSource={dataSource}
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