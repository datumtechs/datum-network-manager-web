import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'
import { resourceApi } from '@api/index'
import { changeSizeFn,newChangeSizeFn } from '@utils/utils'
import MyTag from '@com/MyTag'
import '../scss/ConputeTable.scss'

const CenterTable: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()

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
  const [tableData, tableDataSet] = useState([])


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
      title: t('center.status'), // 算力状态
      dataIndex: 'status',
      render: text => {
        return <>{text === '1' ? <MyTag width={82} content={t('center.stsOccupied')} bgColor='#F9DDDB' color='#F5222D' radius={2} border='#FFA39E' />
          : <MyTag width={82} content={t('center.stsFree')} bgColor='#EBFDDA' color='#52C41A' border='#B7EB8F' radius={2} />}</>
      },
    },
    {
      title: t('center.cpu'),
      dataIndex: 'totalCore',
      render: (text, record, index) => {
        return (
          <div className="power-col">
            <div className="prev-orange">
              <span className="name">{text || 0}</span>
              {text ? t('center.cores') : ''}
            </div>
            {
              record.status === '0' ? '' :
                i18n.language === 'en' ?
                  !record.totalCore ? `0 ${t('overview.occupied')}` : `${(record.usedCore * 100 / record.totalCore).toFixed(2)}% ${t('overview.occupied')}`
                  : !record.totalCore ? `${t('overview.occupied')}: 0` : `${t('overview.occupied')}: ${(record.usedCore * 100 / record.totalCore).toFixed(2)}%`
            }
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
              {text ? changeSizeFn(text).replace(/^[^A-Za-z]*/, '') : ''}
            </div>
            {
              record.status === '0' ? '' :
                i18n.language === 'en' ?
                  record.totalMemory === 0 ? `0% ${t('overview.occupied')}` : `${(record.usedMemory * 100 / record.totalMemory).toFixed(2)}% ${t('overview.occupied')}`
                  : record.totalMemory === 0 ? `${t('overview.occupied')}: 0%` : `${t('overview.occupied')}: ${(record.usedMemory * 100 / record.totalMemory).toFixed(2)}%`
            }
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
              {text ? `${newChangeSizeFn(text).replace(/^[^A-Za-z]*/, '')} ps` : ''}
            </div>
            {
              record.status === '0' ? '' :
                i18n.language === 'en' ?
                  record.totalBandwidth === 0 ? `0% ${t('overview.occupied')}` : `${(record.usedBandwidth * 100 / record.totalBandwidth).toFixed(2)}% ${t('overview.occupied')}`
                  : record.totalBandwidth === 0 ? `${t('overview.occupied')}: 0%` : `${t('overview.occupied')}: ${(record.usedBandwidth * 100 / record.totalBandwidth).toFixed(2)}%`
            }
          </div>
        )
      },
    },
  ]
  const getList = () => {
    const param = { pageNumber: curPage, pageSize: 10 }
    const apiName = 'queryPCMetaDataList'
    resourceApi[apiName](param).then(res => {
      if (res?.status === 0) {
        tableDataSet(res.data)
        totalSet(res.total)
      }
    })
  }
  useEffect(() => {
    getList()
  }, [props.searchText, curPage])
  return (
    <div className="table-box">
      <Table
        dataSource={tableData}
        pagination={{ total, onChange: onPageChange }}
        columns={columns}
        rowKey={_ => _.identityId}
        bordered
      />
    </div>
  )
}

export default CenterTable
