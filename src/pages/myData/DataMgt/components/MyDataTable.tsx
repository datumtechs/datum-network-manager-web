import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Tabs, message } from 'antd'
import { resourceApi } from '@api/index'
import MyModal from '@com/MyModal'
import useInterval from '@hooks/useInterval'
import { tableInterVal } from '@constant/index'
import warnSvg from '@assets/images/10.icon1.svg'
import successSvg from '@assets/images/9.icon1.svg'
import { changeSizeFn } from '@utils/utils'
import SearchBar from '@/layout/components/SearchBar'

const MyDataTable: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TabPane } = Tabs;
  const history = useHistory()
  const [searchText, setSearchText] = useState("")
  const [pop, setPop] = useState({
    type: '',
    id: '',
    fileName: '',
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [curPage, setCurPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalNum, setTotalNum] = useState(0)
  const [tableData, setTableData] = useState([])
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  const initTableData = () => {
    resourceApi.queryMydataByKeyword({ keyword: searchText, pageNumber: curPage, pageSize: 10 }).then(res => {
      if (res.status === 0) {
        setTotalNum(res.total)
        setTableData(res.data)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    initTableData()
    setLoading(true)
  }, [curPage, searchText])

  useEffect(() => {
    if (pop.type !== '') {
      setIsModalVisible(true)
    }
  }, [pop])

  useInterval(() => {
    initTableData()
  }, tableInterVal)

  const handleOk = () => {
    let data = {}
    if (pop.type === 'publish') {
      data = {
        id: pop.id,
        action: 1,
      }
    } else if (pop.type === 'withdraw') {
      data = {
        id: pop.id,
        action: 0,
      }
    } else if (pop.type === 'delete') {
      data = {
        id: pop.id,
        action: -1,
      }
    }
    resourceApi.metaDataAction(data).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.operationSucces')}`)
        setIsModalVisible(false)
        initTableData()
      }
    })
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const viewFn = row => {
    history.push({
      pathname: '/myData/dataMgt/dataDetail',
      state: {
        type: 'edit',
        id: row.id,
        metaDataId: row.metaDataId,
        dataStatus: +row.status === 2 ? '1' : '0'
      },
    })
  }

  const saveAsNewData = row => {
    history.push({
      pathname: '/myData/dataMgt/saveNewData',
      state: {
        type: 'save',
        id: row.id,
        fileName: row.metaDataName,
      },
    })
  }
  const publishFn = (row: any) => {
    setPop({
      type: 'publish',
      id: row.id,
      fileName: row.metaDataName,
    })
  }

  const deleteFn = (row: any) => {
    setPop({
      type: 'delete',
      id: row.id,
      fileName: row.metaDataName,
    })
  }

  const withDrawFn = (row: any) => {
    setPop({
      type: 'withdraw',
      id: row.id,
      fileName: row.metaDataName,
    })
  }

  const download = (data: any, fileName: string) => {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', `${fileName}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const readFile = (steam) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const mes = JSON.parse(reader.result as any)
      message.error(`${t('tip.operationFailed')}`)
    }
    reader.readAsText(steam)
  }

  const downloadFn = (row: any) => {
    const { metaDataName } = row
    resourceApi.downloadMeta({ id: row.id }).then(res => {
      const typeList = ['application/json']
      // 以json返回 则非正常
      if (typeList.includes(res.type)) {
        readFile(res)
      } else {
        download(res, metaDataName)
        setIsModalVisible(false)
      }

    })
  }

  const OnPageChange = (page: number) => {
    setTableData([])
    setCurPage(page)
  }

  const toRelease = (row) => {
    console.log(row);

  }

  const columns = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 50,
    },
    {
      title: t('center.dataName'),
      dataIndex: 'metaDataName',
      width: 180,
      ellipsis: true,
      className: "no-right-border"
    },
    {
      title: t('center.metaStatus'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      className: "no-right-border",
      render: (text, record, index) => {
        // (0: 未知; 1: 未发布; 2: 已发布; 3: 已撤销
        if (+record.status === 2) {
          return (
            <div className="status-box">
              <img src={successSvg} alt="" />
              <p>{t('center.pulish')}</p>
            </div>
          )
        }
        return (
          <div className="status-box">
            <img src={warnSvg} alt="" />
            <p>{t('center.unPublish')}</p>
          </div>
        )
      },
    },
    {
      title: t('dataNodeMgt.dataVoucherAndSymbol'),
      dataIndex: 'Symbol',
      ellipsis: true,
      width: 220,
      className: "no-right-border",
      render: (text, record, index) => {
        return <span className='data-symbol' onClick={toRelease.bind(this, record)}>{text ? text : t('dataNodeMgt.publishDataVoucher')}</span>
      }
    },
    {
      title: t('common.actions'),
      width: 220,
      dataIndex: 'actions',
      // key: 'actions',
      render: (text: any, row: any, index: any) => {
        return (
          <div className="operation-box">
            <p className="btn pointer link pr10" onClick={() => viewFn(row)}>
              {t('center.view')}
            </p>
            <p className="btn pointer link pr10" onClick={() => downloadFn(row)}>
              {t('center.download')}
            </p>
            {+row.status === 2 ?
              <p className="btn pointer link pr10" onClick={() => withDrawFn(row)}>
                {t('center.withdraw')}
              </p> :
              <p className="btn pointer link pr10" onClick={() => publishFn(row)}>
                {t('center.publish')}
              </p>
            }
            <p className="btn pointer link pr10" onClick={() => saveAsNewData(row)}>
              {t('center.saveAsNewData')}
            </p>
            {+row.status === 2 ? '' :
              <p className="btn pointer link pr10" onClick={() => deleteFn(row)}>
                {t('center.delete')}
              </p>
            }
          </div>
        )
      },
    },
  ]

  const callback = (key) => {
    initTableData()
  }

  const tableDom = <Table
    dataSource={[...tableData, ...tableData]}
    // dataSource={dataSource}
    columns={columns}
    bordered
    loading={loading}
    rowKey={record => record.id}
    pagination={{
      defaultCurrent: 1,
      current: curPage,
      defaultPageSize: 10,
      showSizeChanger: false,
      total: totalNum,
      onChange: OnPageChange,
    }}
  />
  const operations = {
    right: <SearchBar onSearch={setSearchText} />
  }

  return (
    <div className="data-table-box">
      <Tabs onChange={callback}
        tabBarGutter={8}
        tabBarExtraContent={operations}
        type="card"
        className={"data-mgt-tabs"}>
        <TabPane tab={t('dataNodeMgt.allData')} key="1">
          {tableDom}
        </TabPane>
        <TabPane tab={t('dataNodeMgt.publishedData')} key="2">
          {tableDom}
        </TabPane>
        <TabPane tab={t('dataNodeMgt.unpublishedData')} key="3">
          {tableDom}
        </TabPane>
      </Tabs>
      <MyModal width={600} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} bordered>
        {pop.type === 'delete' ? (
          <p>
            {t('center.confirmDelete')}&nbsp;:&nbsp;{pop.fileName}
          </p>
        ) : (
          ''
        )}
        {pop.type === 'publish' ? (
          <p>
            {t('center.confirmPublish')}&nbsp;:&nbsp;{pop.fileName}
          </p>
        ) : (
          ''
        )}
        {pop.type === 'withdraw' ? (
          <p>
            {t('center.confirmWithdraw')}&nbsp;:&nbsp;{pop.fileName}
          </p>
        ) : (
          ''
        )}
      </MyModal>
    </div>
  )
}

export default MyDataTable
