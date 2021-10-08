import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space, Tooltip } from 'antd'
import { resourceApi } from '../../../api/index'
import '../scss/index.scss'

const MetaTable: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const history = useHistory()

  const [curPage, setCurPage] = useState<number>(1)
  const [total, totalSet] = useState<number>(0)
  const onPageChange = num => {
    setCurPage(num)
  }
  const pagination = {
    current: 1,
    pageSize: 10,
  }
  const linkMeta = row => {
    history.push({
      pathname: '/dataCenter/metaDataDetail',
      state: {
        id: row.id,
        type: 'view'
      },
    })
  }
  const [dataSource, dataSourceSet] = useState([])
  const columns = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.pageSize + (index + 1)}`,
      width: 80,
    },
    {
      title: t('center.name&metaID'),
      dataIndex: 'fileName',
      width: 300,
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{text}</span>
            </div>
            <Tooltip title={record.metaDataId}>
              <div className="ellipsis" style={{ whiteSpace: 'nowrap' }}>
                ID: &nbsp;{record.metaDataId}
              </div>
            </Tooltip>
          </>
        )
      },
    },
    {
      title: t('center.dataProviderAndIdentifier'),
      render: (text, record) => {
        return <>{record.remarks}</>
      },
    },
    {
      title: t('center.dataSize'),
      render: (text, record) => {
        return <>{record.remarks}</>
      },
    },
    {
      title: t('myData.metaDataPublishTime'),
      render: (text, record) => {
        return <>{record.remarks}</>
      },
    },
    {
      title: t('common.actions'),
      width: 120,
      render: (text, record) => {
        return <span className="link pointer" onClick={() => linkMeta(record)}>
          {t('center.viewMetaData')}
        </span>
      },
    },

  ]
  const getList = () => {
    const param = { pageNumber: curPage, pageSize: 10 }
    const apiName = 'queryDCMetaDataList'
    resourceApi[apiName](param).then(res => {
      if (res?.status === 0) {
        dataSourceSet(res.data)
        totalSet(res.total)
      }
    })
  }
  useEffect(() => {
    getList()
  }, [curPage])
  return (
    <div className="table-box">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ total, onChange: onPageChange }}
        rowKey={_ => _.id}
        bordered
      />
    </div>
  )
}

export default MetaTable
