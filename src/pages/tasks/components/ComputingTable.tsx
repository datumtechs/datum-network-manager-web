import { FC, useEffect, useState } from 'react'
import { Descriptions, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fileSizeChange } from '../../../utils/utils'

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
      width: 50,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
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
              {`${record.usedCore} ${t('overview.core')}`}
              {/* {isNaN(record.usedCore / record.totalCore)
                ? '0.00'
                : ((record.usedCore / record.totalCore) * 100).toFixed(2)}
              % */}
            </li>
            <li>
              <span>{t('overview.memory')}: </span>
              {fileSizeChange(record.usedMemory)}
              {/* {isNaN(record.usedMemory / record.totalMemory)
                ? '0.00'
                : ((record.usedMemory / record.totalMemory) * 100).toFixed(2)}
              % */}
            </li>
            <li>
              <span>{t('overview.bandwidth')}: </span>
              {`${fileSizeChange(record.usedBandwidth)}P/S`}
              {/* {isNaN(record.usedBandwidth / record.totalBandwidth)
                ? '0.00'
                : ((record.usedBandwidth / record.totalBandwidth) * 100).toFixed(2)}
              % */}
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
        bordered
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
