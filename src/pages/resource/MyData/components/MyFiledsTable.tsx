import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table } from 'antd'

const MyFiledsTable: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const linkMeta = () => {
    history.push('/resource/dataCenter/metaDataDetail')
  }
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      dataProvider: 32,
      dataFields: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦斌',
      dataProvider: 32,
      dataFields: '西湖区湖底公园1号',
    },
  ]
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('center.fileField'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('center.dataType'),
      dataIndex: 'dataProvider',
      key: 'dataProvider',
    },
    {
      title: t('center.remarks'),
      dataIndex: 'dataFields',
      key: 'dataFields',
    },
  ]
  return (
    <div className="data-table-box">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default MyFiledsTable
