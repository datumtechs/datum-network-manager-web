import React, { FC, useState, useEffect } from 'react'
import { Table, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import useComputeNodeDetailTable from '@hooks/useComputeNodeDetailTable'
import { fileSizeChange, formatDuring, newChangeSizeFn } from '@utils/utils'

const ComputeDetailTable: FC<any> = (props: any) => {
  const pagination = {
    defaultPageSize: 10,
    pageSize: 10,
  }
  const { id,
    core, memory, bandwidth } = props
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const [total, totalSet] = useState<number>(0)
  const [tableData, tableDataSet] = useState([])
  const [curPage, curPageSet] = useState<number>(1)

  // TODO 跳转到task部分
  const linkToTask = obj => {
    history.push({
      pathname: '/tasks/taskDetail',
      state: {
        id: obj.taskId,
      },
    })
  }
  const { table } = useComputeNodeDetailTable({ id, curPage, pageSize: pagination.pageSize })

  const onPageChange = (page: number) => {
    curPageSet(page)
  }

  useEffect(() => {
    if (table) {
      totalSet(table.total)
      tableDataSet(table.data)
    }
  }, [table])

  const linkToDetail = obj => {
    history.push({
      pathname: '/tasks/taskDetail',
      state: {
        taskId: obj.taskId,
        taskName: obj.taskName
      },
    })
  }


  const columns = [
    {
      title: t(`common.Num`),
      width: 60,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('node.curTaskByNode'),
      dataIndex: 'taskName',
      key: 'taskName',
      ellipsis: true
    },
    {
      title: t('node.startInfoAndTaskTime'),
      dataIndex: 'sponsorStartTime',
      key: 'sponsorStartTime',
      width: 300,
      render: (text, record, index) => {
        return (
          <>
            <Row>
              <Col span={6}>{t('computeNodeMgt.startTime')}:</Col>
              <Col span={18}>{record.startAt && dayjs(record.startAt).format('YYYY-MM-DD HH:mm:ss')}</Col>
            </Row>
            <Row>
              <Col span={6}>{t('computeNodeMgt.sponsor')}:</Col>
              <Col span={18}>{Object.values(record?.dynamicFields).join('') || 'N/A'}</Col>
            </Row>
            <Row>
              <Col span={6}>{t('computeNodeMgt.timeSpan')}:</Col>
              <Col span={18}>{record.endAt.indexOf('1970-01-01T00:00:00') > 0 ? formatDuring(dayjs(record.endAt).valueOf() - dayjs(record.startAt).valueOf()) : '00:00:00'}</Col>
            </Row>
          </>
        )
      },
    },
    {
      title: t('node.eachTaskCost'),
      dataIndex: 'eachNode',
      key: 'eachNode',
      width: 400,
      render: (text, record, index) => {
        const _data = record.dynamicFields
        return (
          <>
            <Row>
              <Col span={4}>CPU:</Col>
              <Col span={8}>{_data.usedCore} {_data.usedCore ? t('overview.core') : ''}</Col>
              <Col span={12}>{`( ${(_data.usedCore / core) ? (((_data.usedCore / core) || 0) * 100).toFixed(2) : 0
                } % ${t('overview.occupied')} )`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.memory')}:</Col>
              <Col span={8}>{fileSizeChange(_data.usedMemory)}</Col>
              <Col span={12}>{`( ${_data.usedMemory / memory ? (((_data.usedMemory / memory) || 0) * 100).toFixed(2) : '0.00'
                } % ${t('overview.occupied')} )`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.bandwidth')}:</Col>
              <Col span={8}>{newChangeSizeFn(_data.usedBandwidth)}ps</Col>
              <Col span={12}>{`( ${_data.usedBandwidth / bandwidth ? (((_data.usedBandwidth / bandwidth) || 0) * 100).toFixed(2) : '0.00'
                } % ${t('overview.occupied')} )`}</Col>
            </Row>
          </>
        )
      },
    },
    {
      title: t('task.actions'),
      dataIndex: 'sponsorStartTime',
      key: 'sponsorStartTime',
      render: (text, record, index) => {
        return (
          <div className="AliM pointer link" onClick={linkToDetail.bind(this, record)}>
            {t('task.viewDetail')}
          </div>
        )
      },
    },
  ]
  return (
    <Table
      className="com-table com-table-multiline com-table-lr-padding"
      dataSource={tableData}
      rowKey={re => `${re.identityId}_${re.id}`}
      columns={columns}
      pagination={{
        defaultCurrent: 1, showSizeChanger: false, total, onChange: onPageChange,
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
      }}
    />
  )
}
export default ComputeDetailTable
