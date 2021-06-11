import React, { FC } from 'react'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

const ComputeDetailTable: FC<any> = (props: any) => {
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()
  const linkToTask = obj => {}

  const dataSource = [
    {
      key: '1',
      id: '111111111111111',
      nodeTask: '胡彦斌',
      sponsorStartTime: '胡彦斌',
      sponsor: '张学友',
      startTime: '1919-19-19',
      receiver: '胡彦斌',
      collaborators: '胡彦斌',
      eachNode: {
        cpu: 'XX cores （XXX% occupied）',
        Memory: 'XX MB （XXX% occupied）',
        Bandwidth: 'XX Mbps （XXX% occupied）',
      },
    },
    {
      key: '2',
      id: '222222222222222',
      nodeTask: '胡彦斌',
      sponsorStartTime: '胡彦斌',
      sponsor: '刘德华',
      startTime: '1919-19-19',
      receiver: '胡彦斌',
      collaborators: '胡彦斌',
      eachNode: {
        cpu: 'XX cores （XXX% occupied）',
        Memory: 'XX MB （XXX% occupied）',
        Bandwidth: 'XX Mbps （XXX% occupied）',
      },
    },
    {
      key: '3',
      id: '3333333333333333',
      nodeTask: '胡彦斌',
      sponsorStartTime: '胡彦斌',
      sponsor: '吴彦祖',
      startTime: '1919-19-19',
      receiver: '胡彦斌',
      collaborators: '胡彦斌',
      eachNode: {
        cpu: 'XX cores （XXX% occupied）',
        Memory: 'XX MB （XXX% occupied）',
        Bandwidth: 'XX Mbps （XXX% occupied）',
      },
    },
    {
      key: '4',
      id: '44444444444444444',
      nodeTask: '胡彦斌',
      sponsorStartTime: '胡彦斌',
      sponsor: '金城武',
      startTime: '1919-19-19',
      receiver: '胡彦斌',
      collaborators: '胡彦斌',
      eachNode: {
        cpu: 'XX cores （XXX% occupied）',
        Memory: 'XX MB （XXX% occupied）',
        Bandwidth: 'XX Mbps （XXX% occupied）',
      },
    },
  ]
  const columns = [
    {
      title: '',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('computeNodeMgt.nodeTask'),
      dataIndex: 'nodeTask',
      key: 'nodeTask',
      render: (text, record, index) => {
        return (
          <div>
            <p onClick={() => linkToTask(record)}>{record.nodeTask}</p>
            <p>{record.id}</p>
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
            <p>{record.sponsor}</p>
            <p>{record.startTime}</p>
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
      dataIndex: 'receiver',
      key: 'receiver',
    },
    {
      title: t('computeNodeMgt.collaborators'),
      dataIndex: 'collaborators',
      key: 'collaborators',
    },
    {
      title: t('computeNodeMgt.eachNode'),
      dataIndex: 'eachNode',
      key: 'eachNode',
      render: (text, record, index) => {
        return (
          <div key={index}>
            {record.eachNode ? (
              Object.keys(record.eachNode).map(node => (
                <p key={index}>
                  {node}:&nbsp;&nbsp; {record.eachNode[node]}
                </p>
              ))
            ) : (
              <></>
            )}
          </div>
        )
      },
    },
  ]
  return (
    <div className="table-box">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
export default ComputeDetailTable
