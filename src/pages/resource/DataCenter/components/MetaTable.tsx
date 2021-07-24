import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space } from 'antd'
import { resourceApi } from '../../../../api/index'
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
      pathname: '/resource/myData/dataDetail',
      state: {
        type: 'view',
        id: row.id,
        from: 'dataCenter',
      },
    })
  }
  const [dataSource, dataSourceSet] = useState([])
  const columns = [
    {
      title: '',
      render: (text, record, index) => `${(curPage - 1) * pagination.pageSize + (index + 1)}`,
    },
    {
      title: t('center.name&metaID'),
      dataIndex: 'fileName',
      render: (text, record, index) => {
        return (
          <>
            <Space size={60}>
              <span>{text}</span>
              <span className="link pointer pl-40" onClick={() => linkMeta(record)}>
                {t('center.viewMetaData')}
              </span>
            </Space>
            <div>ID: {record.metaDataId}</div>
          </>
        )
      },
    },
    {
      title: t('center.dataProvider'),
      dataIndex: 'orgName',
    },
    {
      title: t('center.dataFields'),
      render: (text, record) => {
        return <>{record.metaDataColumnList.join()}</>
      },
    },
  ]
  const getList = () => {
    const param = { keyword: props.searchText, pageNumber: curPage, pageSize: 10 }
    const apiName = props.searchText ? 'queryDCMetaDataListByKeyWord' : 'queryDCMetaDataList'
    resourceApi[apiName](param).then(res => {
      if (res?.status === 0) {
        dataSourceSet(res.data)
        totalSet(res.total)
      }
    })
  }
  useEffect(() => {
    getList()
  }, [props.searchText, curPage])
  return (
    <div className="data-table-box">
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
