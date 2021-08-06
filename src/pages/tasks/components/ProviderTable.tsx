import React, { FC, useState } from 'react'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

const ProviderTable: FC<any> = (props: any) => {
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()
  const [curPage, curPageSet] = useState<number>(1)
  const onPageChange = (page: number) => {
    curPageSet(page)
  }
  const columns = [
    {
      title: 'No.',
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
      title: t('task.metadataNameID'),
      dataIndex: 'metaDataName',
      render: (text, record) => {
        return (
          <div>
            {text}({record.metaDataId})
          </div>
        )
      },
    },
  ]
  return (
    <div className="table-box">
      <Table
        dataSource={props.tableData}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          onChange: onPageChange,
        }}
        bordered
      />
    </div>
  )
}

export default ProviderTable
