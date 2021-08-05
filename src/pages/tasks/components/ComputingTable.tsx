import { FC, useEffect, useState } from 'react'
import { Descriptions, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ComputingTable: FC<any> = (props: any) => {
  const history = useHistory()
  const { tableData } = props

  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  const { t } = useTranslation()

  const columns = [
    {
      title: 'No.',
      width: 50,
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },

    {
      title: t('task.name'),
      dataIndex: 'nodeName',
    },
    {
      title: t('task.identity'),
      dataIndex: 'nodeIdentityId',
    },
    {
      title: t('task.occupiedResources'),
      dataIndex: 'usedCore',
      render: (text, record, index) => {
        return (
          <ul className="power-occupied-item">
            <li>
              <span>{t('overview.cpu')}: </span>
              {isNaN(record.usedCore / record.totalCore)
                ? '0.00'
                : ((record.usedCore / record.totalCore) * 100).toFixed(2)}
              %
            </li>
            <li>
              <span>{t('overview.memory')}: </span>{' '}
              {isNaN(record.usedMemory / record.totalMemory)
                ? '0.00'
                : ((record.usedMemory / record.totalMemory) * 100).toFixed(2)}
              %
            </li>
            <li>
              <span>{t('overview.bandwidth')}: </span>{' '}
              {isNaN(record.usedBandwidth / record.totalBandwidth)
                ? '0.00'
                : ((record.usedBandwidth / record.totalBandwidth) * 100).toFixed(2)}
              %
            </li>
          </ul>
        )
      },
    },
  ]
  return (
    <div className="table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={_ => _.nodeIdentityId}
        bordered
        // pagination={{
        //   defaultCurrent: 1,
        //   current: curPage,
        //   pageSize: 10,
        //   total: tableData.length,
        //   // onChange: onPageChange,
        // }}
      />
    </div>
  )
}

export default ComputingTable
