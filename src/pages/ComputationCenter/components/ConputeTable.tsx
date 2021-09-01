import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'
import { resourceApi } from '../../../api/index'
import { changeSizeFn } from '../../../utils/utils'
import '../scss/ConputeTable.scss'

const CenterTable: FC<any> = (props: any) => {
  const { t } = useTranslation()

  const pagination = {
    current: 1,
    pageSize: 10,
  }
  const [curPage, setCurPage] = useState<number>(1)
  const [total, totalSet] = useState<number>(0)
  const onPageChange = num => setCurPage(num)
  const dealRemain = (all, used) => {
    if (all === 0) return '0'
    return (((all - used) / all) * 100).toFixed(2)
  }
  const [dataSource, dataSourceSet] = useState([])
  const columns = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.pageSize + (index + 1)}`,
    },
    {
      title: t('center.cptName&metaID'),
      dataIndex: 'orgName',
      render: (text, record, index) => {
        return (
          <>
            <div>{text}</div>
            <div>ID: {record.identityId}</div>
          </>
        )
      },
    },
    {
      title: t('center.status'),
      dataIndex: 'status',
      render: text => {
        // return <>{t(`center. ${text === '1' ? 'stsOccupied' : 'stsFree'}`)}</>
        return <>{text === '1' ? t('center.stsOccupied') : t('center.stsFree')}</>
      },
    },
    {
      title: t('center.cpu'),
      dataIndex: 'totalCore',
      render: (text, record, index) => {
        return (
          <div className="power-col">
            <div className="prev-orange">
              <span className="name">{text}</span>
              {t('center.cores')}
            </div>
            <div>
              {t('center.remaining')}: <span className="remain-num">{dealRemain(text, record.usedCore)}</span>
              <span className="remain-unit">%</span>
            </div>
          </div>
        )
      },
    },
    {
      title: t('center.memory'),
      dataIndex: 'totalMemory',
      render: (text, record, index) => {
        return (
          <div className="power-col">
            <div className="prev-seagreen">
              <span className="name">{changeSizeFn(text).replace(/[A-Za-z]*$/, '')}</span>
              {changeSizeFn(text).replace(/^[^A-Za-z]*/, '')}
            </div>
            <div>
              {t('center.remaining')}: <span className="remain-num">{dealRemain(text, record.usedMemory)}</span>
              <span className="remain-unit">%</span>
            </div>
          </div>
        )
      },
    },
    {
      title: t('center.bandWidth'),
      dataIndex: 'totalBandwidth',
      render: (text, record, index) => {
        return (
          <div className="power-col">
            <div className="prev-steelblue">
              <span className="name">{changeSizeFn(text).replace(/[A-Za-z]*$/, '')}</span>
              {changeSizeFn(text).replace(/^[^A-Za-z]*/, '')}P/S
            </div>
            <div>
              {t('center.remaining')}: <span className="remain-num">{dealRemain(text, record.usedBandwidth)}</span>
              <span className="remain-unit">%</span>
            </div>
          </div>
        )
      },
    },
  ]
  const getList = () => {
    const param = { keyword: props.searchText, pageNumber: curPage, pageSize: 10 }
    const apiName = props.searchText ? 'queryPCMetaDataListByKeyWord' : 'queryPCMetaDataList'
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
        pagination={{ total, onChange: onPageChange }}
        columns={columns}
        rowKey={_ => _.identityId}
        bordered
      />
    </div>
  )
}

export default CenterTable
