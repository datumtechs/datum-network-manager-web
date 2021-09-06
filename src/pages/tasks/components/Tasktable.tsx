import { FC } from 'react'
import { Table, Space, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

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
      width: 80,
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },

    {
      title: t('task.nameID'),
      dataIndex: 'taskName',
      width: 300,
      ellipsis: true,
      render: (text, record) => {
        return (
          <>
            <div className={record.reviewed ? '' : 'new-tips'}>{text}</div>
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
      width: 100,
      render: (text, record) => {
        return <Status status={record.status} />
      },
    },
    {
      title: t('task.myCapacity'),
      dataIndex: 'role',
      width: 140,
      render: text => {
        return <>{t(`task.role.${text}`)}</>
      },
    },
    {
      title: t('task.startTime'),
      dataIndex: 'createAt',
      width: 200,
      render: text => {
        return <>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</>
      },
    },
    {
      title: t('task.actions'),
      dataIndex: 'taskId',
      width: 200,
      render: text => {
        return (
          <Space size={50}>
            <span onClick={() => linkToDetail(text)} className="pointer link">
              {t('task.viewDetail')}
            </span>
            <span onClick={() => linkToEvent(text)} className="pointer link">
              {t('task.viewEvent')}
            </span>
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
