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
        id,
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

  const dataSource = [
    {
      coordinateSide: 'aaaa',
      createTime: '111111111111111',
      id: 0,
      ownerIdentityId: '1111111111',
      powerNodeId: '11111',
      resultSide: '222222',
      taskId: '3333',
      taskName: '3344444444444',
      taskStartTime: '5555555',
      updateTime: '2222222222222',
      usedBandwidth: 0,
      usedCore: 0,
      usedMemory: 0,
      connStatus: '2',
    },
  ]
  const columns = [
    {
      title: 'No.',
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('computeNodeMgt.nodeTask'),
      dataIndex: 'nodeTask',
      key: 'nodeTask',
      render: (text, record, index) => {
        return (
          <div>
            <p className="details">
              <span>{record.taskName}</span>
              <span className="pointer link" onClick={() => linkToTask(record)}>
                {t('computeNodeMgt.detail')}
              </span>
            </p>
            <p>ID:&nbsp; {record.id}</p>
          </div>
        )
      },
    },
    // {
    //   title: t('common.operations'),
    //   width: 120,
    //   dataIndex: 'operations',
    //   key: 'operations',
    //   render: (text: any, row: any, index: any) => {
    //     console.log('row', row)
    //     return (
    //       <span className="btn pointer" onClick={viewInfo}>
    //         {t('computeNodeMgt.detail')}
    //       </span>
    //     )
    //   },
    // },
    {
      title: t('computeNodeMgt.sponsorStartTime'),
      dataIndex: 'sponsorStartTime',
      key: 'sponsorStartTime',
      render: (text, record, index) => {
        return (
          <div>
            <p>{record.ownerIdentityId}</p>
            <p>{dayjs(record.taskStartTime).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
        )
      },
    },
    // {
    //   title: t('computeNodeMgt.startTime'),
    //   dataIndex: 'startTime',
    //   key: 'startTime',
    // },
    {
      title: t('computeNodeMgt.receiver'),
      dataIndex: 'resultSideName',
      key: 'resultSideName',
    },
    {
      title: t('computeNodeMgt.collaborators'),
      dataIndex: 'coordinateSideName',
      key: 'coordinateSideName',
    },
    {
      title: t('computeNodeMgt.eachNode'),
      dataIndex: 'eachNode',
      key: 'eachNode',
      render: (text, record, index) => {
        return (
          <div key={index}>
            <Row>
              <Col span={4}>CPU:</Col>
              <Col span={8}>{record.usedCore} cores</Col>
              <Col span={12}>{`(${t('overview.occupied')} ${
                isNaN(record.usedCore / core) ? '0.00' : ((record.usedCore / core) * 100).toFixed(2)
              } %)`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.memory')}:</Col>
              <Col span={8}>{fileSizeChange(record.usedMemory)}</Col>
              <Col span={12}>{`(${t('overview.occupied')} ${
                isNaN(record.usedMemory / memory) ? '0.00' : ((record.usedMemory / memory) * 100).toFixed(2)
              } %)`}</Col>
            </Row>
            <Row>
              <Col span={4}>{t('overview.bandwidth')}:</Col>
              <Col span={8}>{fileSizeChange(record.usedBandwidth)}P/S</Col>
              <Col span={12}>{`(${t('overview.occupied')} ${
                isNaN(record.usedBandwidth / bandwidth) ? '0.00' : ((record.usedBandwidth / bandwidth) * 100).toFixed(2)
              } %)`}</Col>
            </Row>
          </div>
        )
      },
    },
  ]
  return (
    <div className="table-box">
      <Table
        // dataSource={dataSource}
        dataSource={tableData}
        rowKey={re => re.id}
        columns={columns}
        pagination={{ defaultCurrent: 1, total, onChange: onPageChange }}
      />
    </div>
  )
}
export default ComputeDetailTable
