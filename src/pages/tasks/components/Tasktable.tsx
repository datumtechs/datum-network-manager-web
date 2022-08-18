import { FC } from 'react'
import { Table, Space, Tooltip, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { formatDuring } from '@utils/utils'
import MyTaskStatusBar from '@pages/myData/DataMgt/components/MyTaskStatusBar'


const MyTable = (props, ref) => {
  const { tableData, total, pageNumber, pageSize } = props
  const history = useHistory()
  const { t, i18n } = useTranslation()

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

  const onPageChange = (page, pageSize) => {
    console.log(page, pageSize);

    props.pageChange(page, pageSize)
  }

  const role = obj => {
    return Object.keys(obj).map((v) => {
      if (!obj[v]) return ''
      return <MyTaskStatusBar key={v} role={v} width={150} margin={1} />
    })
  }

  const columns: any = [
    {
      title: t(`common.Num`),
      width: 60,
      render: (text, record, index) => `${(pageNumber - 1) * pageSize + (index + 1)}`
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
          <div className="task-table-actions">
            <Button type="link" onClick={() => linkToDetail(record)} >
              {t('task.viewDetail')}
            </Button>
            <Button type="link" onClick={() => linkToEvent(record)}>
              {t('task.viewEvent')}
            </Button>
          </div>
        )
      },
    },
  ]
  return (
    <Table
      className="com-table com-table-lr-padding"
      dataSource={tableData}
      columns={columns}
      rowKey={_ => (_.id + _.taskId)}
      pagination={{
        current: pageNumber, pageSize: pageSize,
        total: total,
        onChange: onPageChange,
        onShowSizeChange: onPageChange,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50', '100'],
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
      }}
    />
  )
}

export default MyTable
