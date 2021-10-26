import React, { FC, useState, useEffect } from 'react'
import { Table, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import useComputeNodeDetailTable from '../../../../hooks/useComputeNodeDetailTable'
import { fileSizeChange } from '../../../../utils/utils'

const ComputeDetailTable: FC<any> = (props: any) => {
  const pagination = {
    defaultPageSize: 10,
    pageSize: 10,
  }
  const { id, core, memory, bandwidth } = props
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

  // const dataSource = [
  //   {
  //     coordinateSide: 'aaaa',
  //     createTime: '111111111111111',
  //     id: 0,
  //     ownerIdentityId: '1111111111',
  //     powerNodeId: '11111',
  //     resultSide: '222222',
  //     taskId: '3333',
  //     taskName: '3344444444444',
  //     taskStartTime: '5555555',
  //     updateTime: '2222222222222',
  //     usedBandwidth: 0,
  //     usedCore: 0,
  //     usedMemory: 0,
  //     connStatus: '2',
  //   },
  // ]
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
              <Col span={18}>{record.taskStartTime}</Col>
            </Row>
            <Row>
              <Col span={6}>{t('computeNodeMgt.sponsor')}:</Col>
              <Col span={18}>{ }</Col>
            </Row>
            <Row>
              <Col span={6}>{t('computeNodeMgt.timeSpan')}:</Col>
              <Col span={18}>{ }</Col>
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
              <Col span={8}>{record.usedCore} cores</Col>
              <Col span={12}>{`( ${isNaN(record.usedCore / core) ? '0.00' : ((record.usedCore / core) * 100).toFixed(2)
                } % ${t('overview.occupied')} )`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.memory')}:</Col>
              <Col span={8}>{fileSizeChange(record.usedMemory)}</Col>
              <Col span={12}>{`( ${isNaN(record.usedMemory / memory) ? '0.00' : ((record.usedMemory / memory) * 100).toFixed(2)
                } % ${t('overview.occupied')} )`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.bandwidth')}:</Col>
              <Col span={8}>{fileSizeChange(record.usedBandwidth)}P/S</Col>
              <Col span={12}>{`( ${isNaN(record.usedBandwidth / bandwidth) ? '0.00' : ((record.usedBandwidth / bandwidth) * 100).toFixed(2)
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
          <div className="AliM pointer link">
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
        dataSource={tableData}
        rowKey={re => re.id}
        columns={columns}
        pagination={{ defaultCurrent: 1, total, onChange: onPageChange }}
      />
    </div>
  )
}
export default ComputeDetailTable
