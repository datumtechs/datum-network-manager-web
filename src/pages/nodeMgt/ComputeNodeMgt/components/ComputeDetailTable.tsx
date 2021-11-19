import React, { FC, useState, useEffect } from 'react'
import { Table, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import useComputeNodeDetailTable from '@hooks/useComputeNodeDetailTable'
import { fileSizeChange, formatDuring } from '@utils/utils'

const ComputeDetailTable: FC<any> = (props: any) => {
  const pagination = {
    defaultPageSize: 10,
    pageSize: 10,
  }
  const { id,
    core, memory, bandwidth,
    identityId } = props
  const { t } = useTranslation()
  const history = useHistory()
  const [total, totalSet] = useState<number>(0)
  const [tableData, tableDataSet] = useState([])
  const [curPage, curPageSet] = useState<number>(1)
  // const [totalCpu, totalCpuSet] = useState<number>(0)
  // const [totalMemory, totalMemorySet] = useState<number>(0)
  // const [totalBandwidth, totalBandwidthSet] = useState<number>(0)

  // TODO 跳转到task部分
  const linkToTask = obj => {
    history.push({
      pathname: '/tasks/taskDetail',
      state: {
        id: obj.taskId,
      },
    })
  }
  const { table } = useComputeNodeDetailTable({ id, identityId, curPage, pageSize: pagination.pageSize })

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
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('node.curTaskByNode'),
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: t('node.startInfoAndTaskTime'),
      dataIndex: 'sponsorStartTime',
      key: 'sponsorStartTime',
      render: (text, record, index) => {
        return (
          <>
            <Row>
              <Col span={6}>{t('computeNodeMgt.startTime')}:</Col>
              <Col span={18}>{record.startAt && dayjs(record.startAt + '.000Z').format('YYYY-MM-DD HH:mm:ss')}</Col>
            </Row>
            <Row>
              <Col span={6}>{t('computeNodeMgt.sponsor')}:</Col>
              <Col span={18}>{Object.values(record?.dynamicFields).join('') || 'N/A'}</Col>
            </Row>
            <Row>
              <Col span={6}>{t('computeNodeMgt.timeSpan')}:</Col>
              <Col span={18}>{record.endAt !== '1970-01-01T00:00:00' ? formatDuring(dayjs(record.endAt).valueOf() - dayjs(record.startAt).valueOf()) : '00:00:00'}</Col>
            </Row>
          </>
        )
      },
    },
    {
      title: t('node.eachTaskCost'),
      dataIndex: 'eachNode',
      key: 'eachNode',
      render: (text, record, index) => {
        return (
          <>
            <Row>
              <Col span={4}>CPU:</Col>
              <Col span={8}>{record.costCore} {record.costCore ? t('overview.core') : ''}</Col>
              <Col span={12}>{`( ${(record.costCore / core) ? (((record.costCore / core) || 0) * 100).toFixed(2) : 0
                } % ${t('overview.occupied')} )`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.memory')}:</Col>
              <Col span={8}>{fileSizeChange(record.costMemory)}</Col>
              <Col span={12}>{`( ${record.costMemory / memory ? (((record.costMemory / memory) || 0) * 100).toFixed(2) : '0.00'
                } % ${t('overview.occupied')} )`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.bandwidth')}:</Col>
              <Col span={8}>{fileSizeChange(record.costBandwidth)}P/S</Col>
              <Col span={12}>{`( ${record.costBandwidth / bandwidth ? (((record.costBandwidth / bandwidth) || 0) * 100).toFixed(2) : '0.00'
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
            {/* <p>{record.ownerIdentityId}</p>
            <p>{dayjs(record.taskStartTime).format('YYYY-MM-DD HH:mm:ss')}</p> */}
          </div>
        )
      },
    },
  ]
  return (
    <div className="data-table-box">
      <Table
        // dataSource={dataSource}
        dataSource={tableData}
        rowKey={re => `${re.identityId}_${re.id}`}
        columns={columns}
        pagination={{ defaultCurrent: 1, showSizeChanger: false, total, onChange: onPageChange }}
      />
    </div>
  )
}
export default ComputeDetailTable
