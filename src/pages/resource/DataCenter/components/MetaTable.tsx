import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space } from 'antd'
import '../scss/index.scss'

const MetaTable: FC<any> = () => {
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
      title: t('center.name&metaID'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        return (
          <>
            <Space size={60}>
              <span>{text}</span>
              <span className="link pointer pl-40" onClick={linkMeta}>
                {t('center.viewMetaData')}
              </span>
            </Space>
            <div>ID:xxxxxxxxxxxxxxxxxx</div>
          </>
        )
      },
    },
    {
      title: t('center.dataProvider'),
      dataIndex: 'dataProvider',
      key: 'dataProvider',
    },
    {
      title: t('center.dataFields'),
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

export default MetaTable
