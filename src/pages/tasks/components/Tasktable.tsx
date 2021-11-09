import { FC } from 'react'
import { Table, Space, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import MyTaskStatusBar from '../../myData/DataMgt/components/MyTaskStatusBar'
import { formatDuring } from '../../../utils/utils'

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
  const { tableData, total, pageNumber } = props
  const history = useHistory()
  const pagination = {
    current: 1,
    defaultPageSize: 5,
  }
  const { t } = useTranslation()

  const linkToDetail = obj => {
    history.push({
      pathname: '/tasks/taskDetail',
      state: {
        taskId: obj.taskId,
        taskName: obj.taskName
      },
    })
  }
  const linkToEvent = obj => {
    history.push({
      pathname: '/tasks/TaskEvent',
      state: {
        taskId: obj.taskId,
        taskName: obj.taskName
      },
    })
  }

  const onPageChange = page => {
    props.pageChange(page)
  }

  const role = obj => {
    return Object.keys(obj).map((v) => {
      if (!obj[v]) return ''
      return <MyTaskStatusBar key={obj[v]} role={v} width={150} margin={1} />
    })
  }

  const columns: any = [
    {
      title: t('common.Num'),
      width: 50,
      render: (text, record, index) => {
        return <>
          <span>
            {`${(pageNumber - 1) * pagination.defaultPageSize + (index + 1)}`}
          </span>
          <span className='new-tips'></span>
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
        return <MyTaskStatusBar status={record.status} width={100} />
      },
    },
    {
      title: t('task.myCapacity'),
      dataIndex: 'role',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return role(record.dynamicFields)
      },
    },
    {
      title: `${t('task.startTimeAndTaskSpent')}`,
      width: 100,
      render: (text, record) => {
        return <>
          <p>{dayjs(record.createAt).format('YYYY-MM-DD HH:mm:ss')}</p>
          {
            record.status === 3 || record.status === 4 ?
              <p>
                {t('myData.duration')}:&nbsp;{formatDuring(dayjs(record.endAt).valueOf() - dayjs(record.createAt).valueOf())}
              </p>
              : ''
          }
          {
            record.status === 1 || record.status === 2 ?
              <p>
                {t('myData.timeSpent')}:&nbsp;{formatDuring(dayjs(Date.now()).valueOf() - dayjs(record.createAt).valueOf())}
              </p> : ''
          }
        </>
      },
    },
    {
      title: t('task.actions'),
      dataIndex: 'taskId',
      width: 100,
      render: (text, record) => {
        return (
          <Space size={50}>
            <p onClick={() => linkToDetail(record)} className="pointer link">
              {t('task.viewDetail')}
            </p>
            <p onClick={() => linkToEvent(record)} className="pointer link">
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
        rowKey={_ => (_.id + _.ownerIdentityId)}
        bordered
        pagination={{ defaultCurrent: 1, defaultPageSize: 5, total, onChange: onPageChange }}
      />
    </div>
  )
}

export default MyTable
