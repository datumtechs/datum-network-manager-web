import { FC, useEffect, useState } from 'react'
import { Descriptions, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fileSizeChange } from '../../../utils/utils'

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
              {t('overview.cpu')}: {record.usedCore ? record.usedCore : `0.00%`}
            </li>
            <li>
              {t('overview.memory')}: {record.usedMemory ? record.usedMemory : `0.00%`}
            </li>
            <li>
              {t('overview.bandwidth')}: {record.usedBandwidth ? record.usedBandwidth : `0.00%`}
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
