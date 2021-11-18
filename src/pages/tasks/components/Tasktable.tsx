import { FC } from 'react'
import { Table, Space, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { formatDuring } from '@utils/utils'
import MyTaskStatusBar from '@pages/myData/DataMgt/components/MyTaskStatusBar'


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
      return <MyTaskStatusBar key={v} role={v} width={150} margin={1} />
    })
  }

  const columns: any = [
    {
      title: t('common.Num'),
      width: 30,
      render: (text, record, index) => {
        return <>
          <span>
            {`${(pageNumber - 1) * pagination.defaultPageSize + (index + 1)}`}
          </span>
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
        return <div className="task--table-status">
          <MyTaskStatusBar status={record.status} width={100} />
        </div>
      },
    },
    {
      title: t('task.myCapacity'),
      dataIndex: 'role',
      width: 120,
      render: (text, record) => {
        return <div className="task-table-role" >
          {role(record.dynamicFields)}
        </div>
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
                {t('myData.timeSpent')}:&nbsp;00:00:00
                {/* {formatDuring(dayjs(Date.now()).valueOf() - dayjs(record.createAt).valueOf())} */}
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
          <div className="operation-box task-table-actions">
            <div onClick={() => linkToDetail(record)} className="btn pointer">
              {t('task.viewDetail')}
            </div>
            <div onClick={() => linkToEvent(record)} className="btn pointer">
              {t('task.viewEvent')}
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={_ => (_.id + _.taskId)}
        bordered
        pagination={{ defaultCurrent: 1, defaultPageSize: 5, total, onChange: onPageChange }}
      />
    </div>
  )
}

export default MyTable
