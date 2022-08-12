import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Tabs, message, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { resourceApi } from '@api/index'
import MyModal from '@com/MyModal'
import warnSvg from '@assets/images/10.icon1.svg'
import successSvg from '@assets/images/9.icon1.svg'
import SearchBar from '@/layout/components/SearchBar'
import { connect } from 'react-redux'

const MyDataTable: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TabPane } = Tabs;
  const history = useHistory()
  const [searchText, setSearchText] = useState("")
  const [pop, setPop] = useState({ type: '', id: '', fileName: '', })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [curPage, setCurPage] = useState(1)
  const [totalNum, setTotalNum] = useState(0)
  const [statusNum, setStatus] = useState(0)
  const [tableData, setTableData] = useState<{ string: any } | any>([])
  const [activeRow, setActiveRow] = useState<any>({})
  const [modalLoading, setModalLoading] = useState<any>(false)
  const pagination = { current: 1, defaultPageSize: 10, }
  const { i18n } = useTranslation()

  const initTableData = () => {
    resourceApi.queryMydataByKeyword({ keyword: searchText, pageNumber: curPage, pageSize: 10, status: statusNum }).then(res => {
      if (res.status === 0) {
        setTotalNum(res.total)
        setTableData(res.data)
      }
    })
  }

  useEffect(() => { initTableData() }, [curPage, searchText, statusNum])

  useEffect(() => { initTableData() }, [])

  useEffect(() => { if (pop.type !== '') setIsModalVisible(true) }, [pop])

  const handleOk = async () => {
    let data: any = {}
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
    setModalLoading(true)
    const { wallet, } = props.state.wallet
    const { walletConfig } = props.state
    const address = await wallet.connectWallet(walletConfig)
    const requestOptionData = await resourceApi.getMetaDataOption({ id: activeRow.id })
    if (requestOptionData.status !== 0) return
    const params = [
      activeRow.metaDataName,
      activeRow.metaDataType,
      activeRow.dynamicFields.dataHash,
      activeRow.desc,
      activeRow.dynamicFields.locationType,
      activeRow.metaDataType,
      String(activeRow.industry),
      String(activeRow.status),
      requestOptionData.data,
    ]

    try {
      const sign = await wallet.signData(params, address[0])
      data.sign = sign
    } catch (e) { console.log(e); }
    if (!data.sign) return setModalLoading(false)
    resourceApi.metaDataAction(data).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.operationSucces')}`)
        setIsModalVisible(false)
        initTableData()
      }
      setModalLoading(false)
    })
  }
  const handleCancel = () => (setIsModalVisible(false), setModalLoading(false))

  const viewFn = row => {
    history.push({
      pathname: '/myData/dataMgt/dataDetail',
      state: {
        type: 'edit',
        id: row.id,
        metaDataId: row.metaDataId,
        // (0-未知;1-还未发布的新表;2-已发布的表;3-已撤销的表;101-已删除;102-发布中;103-撤回中;)
        dataStatus: +row.status > 1 ? '1' : '0'
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
    setActiveRow(row)
    setPop({
      type: 'publish',
      id: row.id,
      fileName: row.metaDataName,
    })
  }

  const deleteFn = (row: any) => {
    setActiveRow(row)
    setPop({
      type: 'delete',
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
      message.error(`${t('tip.operationFailed')}`)
    }
    reader.readAsText(steam)
  }

  const downloadFn = (row: any) => {
    const { metaDataName } = row
    resourceApi.downloadMeta({ id: row.id }).then(res => {
      const typeList = ['application/json']
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

  const goCredential = (type, row) => {
    let url = ''
    let token = ''
    if (type == 'attributeCredential') {
      url = '/voucher/AttributeCredential'
      token = row.dynamicFields.attributeDataTokenName
    } else if (type == 'noAttributeCredential') {
      url = '/voucher/NoAttribute'
      token = row.dynamicFields.dataTokenName
    }
    if (!url) return
    if (!token) return
    history.push({
      pathname: url,
      state: {
        metaDataId: row.metaDataId,
        metaDataName: row.metaDataName,
        dataId: row.id,
      }
    })

  }

  const toRelease = (row) => {
    history.push({
      pathname: '/myData/dataVoucherPublishing',
      state: {
        metaDataId: row.metaDataId,
        metaDataName: row.metaDataName,
        dataId: row.id,
        dataTokenAddress: row.dataTokenAddress,
        attributeDataTokenAddress: row.attributeDataTokenAddress
      }
    })
  }

  const columns: any[] = [
    {
      title: ``,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 60,
    },
    {
      title: t('center.dataName'),
      dataIndex: 'metaDataName',
      ellipsis: true,
    },
    {
      title: t('center.metaStatus'),
      dataIndex: 'status',
      key: 'status',
      // width: 130,
      ellipsis: true,
      render: (text, record, index) => {
        // (0-未知;1-还未发布的新表;2-已发布的表;3-已撤销的表;101-已删除;102-发布中;103-撤回中;)
        let dom: any = ''
        const domFn = (type = 'center.unPublishData') => {
          return <div className="status-box">
            <img src={warnSvg} alt="" />
            <p>{t(type)}</p>
          </div>
        }
        switch (record.status) {
          case 2:
            dom = <div className="status-box">
              <img src={successSvg} alt="" />
              <p>{t('center.pulishData')}</p>
              {/* 已发布 */}
            </div>;
            break;
          case 102:
            dom = domFn('center.InReleaseData')
            // {数据发布中}
            break;
          case 103:
            dom = domFn('center.WithdrawingData')
            // 数据撤回中
            break;
          default:
            dom = domFn()
            break;
        }
        return dom
      },
    },
    {
      title: t('dataNodeMgt.dataVoucherAndSymbol'),
      dataIndex: 'dynamicFields',
      ellipsis: true,
      render: (text, record: any, index) => {
        const attrDom = <p>
          <span style={{ display: "inline-block", width: "75px" }}>{t('credential.attributeCredential')}:</span>
          <span onClick={goCredential.bind(this, 'attributeCredential', record)}>{record.dynamicFields.attributeDataTokenName ? record.dynamicFields.attributeDataTokenName : '--'}</span>
        </p>
        const noAttr = <p>
          <span style={{ display: "inline-block", width: "75px" }}>{t('credential.noAttributeCredential')}:</span>
          <span onClick={goCredential.bind(this, 'noAttributeCredential', record)}>{record.dynamicFields.dataTokenName ? record.dynamicFields.dataTokenName : '--'}</span>
        </p>
        if (record.usage == 1) return <>{noAttr}</>
        if (record.usage == 2) return <>{attrDom}</>
        return <> {attrDom}{noAttr} </>
      }
    },
    {
      title: t('common.actions'),
      width: i18n.language === 'en' ? 400 : 'auto',
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        // (0-未知;1-还未发布的新表;2-已发布的表;3-已撤销的表;101-已删除;102-发布中;103-撤回中;)
        let list = [
          {
            name: row.status >= 2 ? t('center.view') : t('UserCenter.ProfileButtonEdit'),//查看 
            fn: viewFn.bind(this, row),
            show: [0, 1, 2, 3, 101, 102, 103]
          },
          {
            name: t('center.download'),//下载
            fn: downloadFn.bind(this, row),
            show: [0, 1, 2, 3, 101, 102, 103]
          },
          {
            name: t('common.copy'),//复制
            fn: saveAsNewData.bind(this, row),
            show: [0, 1, 2, 3, 101, 102, 103]
          },

          {
            name: t('center.delete'),//删除
            fn: deleteFn.bind(this, row),
            show: [0, 1]
          },
        ]
        return (
          <div className="operation-box">
            {list.map((_: any) => {
              return _.show.includes(row.status) ? <p className="btn pointer link pr10" key={_.name} onClick={_.fn}>
                {_.name}
              </p> : ''
            })}
            {row.status < 2 ?
              <p className="btn pointer link pr10" onClick={publishFn.bind(this, row)}>
                {t('center.publish')}
              </p> :
              <p className="btn pointer link pr10" onClick={toRelease.bind(this, row)}>
                {t('credential.releaseCredential')}
              </p>
            }
          </div>
        )
      },
    },
  ]

  const callback = (key) => {
    setStatus(+key)
    setCurPage(1)
  }



  const tableDom = (key) => {
    return <Table
      className="com-table com-table-multiline"
      dataSource={tableData}
      columns={columns}
      key={key}
      rowKey={record => record.id}
      pagination={{
        defaultCurrent: 1,
        current: curPage,
        defaultPageSize: 10,
        showSizeChanger: false,
        total: totalNum,
        onChange: OnPageChange,
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
      }}
    />
  }

  const operations = {
    right: <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('myData.dataName')}`} />
  }

  return (
    <div >
      <Tabs onChange={callback} className="com-tabs"
        tabBarGutter={20}
        tabBarExtraContent={operations}>
        <TabPane tab={t('dataNodeMgt.allData')} key="0">
          {tableDom('allData')}
        </TabPane>
        <TabPane tab={t('myData.issuedVoucher')} key="1">
          {tableDom('publishedData')}
        </TabPane>
        <TabPane tab={t('myData.noVoucherIssued')} key="2">
          {tableDom('unpublishedData')}
        </TabPane>
        <TabPane tab={<Button
          type="primary"
          style={{ marginLeft: '10px', height: '36px' }}
          className="plus-button"
          icon={<PlusOutlined />}
          onClick={() => history.push('/myData/dataAddition')}
        >
          {t('myData.addData')}
        </Button>} disabled key="3" />
      </Tabs>
      <MyModal width={600} loading={modalLoading} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} bordered>
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

// export default MyDataTable
export default connect((state: any) => ({ state }))(MyDataTable)

