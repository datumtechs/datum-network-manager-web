import { FC } from 'react'
import { Table, Space, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import MyTaskStatusBar from '../../myData/DataMgt/components/MyTaskStatusBar'

const Status: FC<any> = (props: any) => {
  const { t } = useTranslation()

  const color = {
    pending: '#FFA505',
    running: '#5D5C65',
    failed: '#F5222D',
    success: '#0BB27A',
  }
  return (
    <span style={{ color: color[props.status] || 'inherit', fontSize: '15px', fontWeight: 'bold' }}>
      {props.status ? `${t(`task.${props.status}`)}` : '/'}
    </span>
  )
}

const MyTable = (props, ref) => {
  const { tableData, total } = props
  const history = useHistory()
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()

  const linkToDetail = id => {
    history.push({
      pathname: '/tasks/taskDetail',
      state: {
        id,
      },
    })
  }
  const linkToEvent = id => {
    history.push({
      pathname: '/tasks/TaskEvent',
      state: {
        id,
      },
    })
  }

  const onPageChange = page => {
    props.pageChange(page)
  }

  const columns = [
    {
      title: t('common.Num'),
      width: 60,
      render: (text, record, index) => {
        return <>
          <p className={record.reviewed ? '' : 'new-tips'}></p>
          <p>
            <span>
              {`${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`}
            </span>
          </p>
        </>
      }
    },

    {
      title: t('task.nameID'),
      dataIndex: 'taskName',
      width: 120,
      ellipsis: true,
      render: (text, record) => {
        return (
          <>
            <div>{text}</div>
            <Tooltip placement="topLeft" title={record.taskId}>
              <div className="ellipsis">{record.taskId}</div>
            </Tooltip>
          </>
        )
      },
    },
    {
      title: t('task.status'),
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (text, record) => {
        return <MyTaskStatusBar status={record.status} width={82} />
      },
    },
    {
      title: t('task.myCapacity'),
      dataIndex: 'role',
      width: 100,
      render: (text, record) => {
        return <MyTaskStatusBar role={record.role} width={122} />
      },
    },
    {
      title: `${t('task.startTimeAndTaskSpent')}`,
      width: 100,
      render: (text, record) => {
        return <>
          <p>{dayjs(record.taskStartTime).format('YYYY-MM-DD HH:mm:ss')}</p>
          <p>
            {t('myData.duration')}:{ }
          </p>
          <p>
            {t('myData.timeSpent')}:{ }
          </p>
        </>
      },
    },
    {
      title: t('task.actions'),
      dataIndex: 'taskId',
      width: 100,
      render: text => {
        return (
          <Space size={50}>
            <p onClick={() => linkToDetail(text)} className="pointer link">
              {t('task.viewDetail')}
            </p>
            <p onClick={() => linkToEvent(text)} className="pointer link">
              {t('task.viewEvent')}
            </p>
          </Space>
        )
      },
    },
  ]
  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={_ => _.id}
        bordered
        pagination={{ defaultCurrent: 1, total, onChange: onPageChange }}
      />
    </div>
  )
}

export default MyTable
