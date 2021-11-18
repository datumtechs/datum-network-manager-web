import { FC, useEffect, useState } from 'react'
import { Descriptions, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fileSizeChange } from '@utils/utils'

const ComputingTable: FC<any> = (props: any) => {
  const history = useHistory()
  const { tableData } = props
  const [curPage, curPageSet] = useState<number>(1)

  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  const { t } = useTranslation()

  const onPageChange = (page: number) => {
    curPageSet(page)
  }

  const columns = [
    {
      title: t('common.Num'),
      width: 80,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },

    {
      title: t('task.name'),
      dataIndex: 'nodeName',
      width: 300,
      render: (text, record) => {
        return (
          <span>{record?.dynamicFields?.orgName || 'N/A'} ({record?.partyId})</span>
        )
      }
    },
    {
      title: t('task.identity'),
      dataIndex: 'nodeIdentityId',
      ellipsis: true,
      render: (text, record) => {
        return <span>{record?.identityId || 'N/A'}</span>
      }
    },
    {
      title: t('task.occupiedResources'),
      dataIndex: 'usedCore',
      ellipsis: true,
      render: (text, record) => {
        return (
          <ul className="power-occupied-item">
            <li>
              <span>{t('overview.cpu')}:  {`${record.usedCore || 0} ${record.usedCore ? t('overview.core') : ''}`}</span>
            </li>
            <li>
              <span>{t('overview.memory')}: </span>
              {record.usedMemory ? fileSizeChange(record.usedMemory) : 0}
            </li>
            <li>
              <span>{t('overview.bandwidth')}: </span>
              {record.usedBandwidth ? `${fileSizeChange(record.usedBandwidth)}P/S` : 0}
            </li>
          </ul>
        )
      },
    },
  ]

  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        bordered
        rowKey={_ => _.partyId || (new Date().getTime())}
        scroll={{ x: '100%' }}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}

export default ComputingTable
