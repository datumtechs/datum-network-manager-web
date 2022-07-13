import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Tabs, message, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { resourceApi } from '@api/index'
import MyModal from '@com/MyModal'
// import useInterval from '@hooks/useInterval'
// import { tableInterVal } from '@constant/index'
import warnSvg from '@assets/images/10.icon1.svg'
import successSvg from '@assets/images/9.icon1.svg'
// import { changeSizeFn } from '@utils/utils'
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
  const [totalNum, setTotalNum] = useState(0)
  const [statusNum, setStatus] = useState(0)
  const [tableData, setTableData] = useState<{ string: any } | any>([])
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { i18n } = useTranslation()

  const initTableData = () => {
    console.log(statusNum)
    resourceApi.queryMydataByKeyword({ keyword: searchText, pageNumber: curPage, pageSize: 10, status: statusNum }).then(res => {
      if (res.status === 0) {
        setTotalNum(res.total)
        setTableData(res.data)
      }
    })
  }

  useEffect(() => {
    initTableData()
  }, [curPage, searchText, statusNum])

  useEffect(() => {
    initTableData()
  }, [])

  useEffect(() => {
    if (pop.type !== '') {
      setIsModalVisible(true)
    }
  }, [pop])

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
        dataStatus: +row.status === 2 ||
          +row.status === 5 ||
          +row.status === 6 ||
          +row.status === 7 ||
          +row.status === 8 ||
          +row.status === 9 ? '1' : '0'
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

  const goCredential = (type, row) => {
    console.log(type);
    let url = ''
    if (type == 'attributeCredential') {
      url = 'voucher/NoAttribute'
    } else if (type == 'noAttributeCredential') {
      url = 'voucher/NoAttribute'
    }
    if (!url) return
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
      }
    })
  }

  const columns: any[] = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 70,
      align: 'center'
    },
    {
      title: t('center.dataName'),
      dataIndex: 'metaDataName',
      // width: 180,
      // align: 'center',
      ellipsis: true,
    },
    {
      title: t('center.metaStatus'),
      dataIndex: 'status',
      key: 'status',
      // width: 130,
      ellipsis: true,
      render: (text, record, index) => {
        //元数据的状态 (0: 未知; 1: 未发布; 2: 已发布; 3: 已撤销;4:已删除;
        //5: 发布中; 6: 撤回中; 7: 凭证发布失败; 8: 凭证发布中; 9:已发布凭证)
        //10已绑定凭证
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
            </div>;
            break;
          case 5:
            dom = domFn('center.InReleaseData')
            break;
          case 6:
            dom = domFn('center.WithdrawingData')
            break;
          case 7:
            dom = domFn('center.voucherPublishingFailed')
            break;
          case 8:
            dom = domFn('center.voucherPublishing')
            break;
          case 9:
          case 10:
            dom = <div className="status-box">
              <img src={successSvg} alt="" />
              <p>{t('center.issuedVoucher')}</p>
            </div>;
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
        //元数据的状态 (0: 未知; 1: 未发布; 2: 已发布; 3: 已撤销;4:已删除;
        //5: 发布中; 6: 撤回中; 7: 凭证发布失败; 8: 凭证发布中; 9:已发布凭证)
        ////10已绑定凭证

        // return (record.status == 2 || record.status == 7) ?
        //   <span className='data-symbol' onClick={toRelease.bind(this, record)}>
        //     {t('dataNodeMgt.publishDataVoucher')}</span> :
        //   record.status == 9 || record.status == 10 ? record?.dynamicFields?.dataTokenName + '(' + record?.dynamicFields?.dataTokenSymbol + '）' : '--'
        return <>
          <p><span style={{ display: "inline-block", width: "75px" }}>{t('credential.attributeCredential')}:</span>  <span onClick={goCredential.bind(this, 'attributeCredential', record)}>--</span> </p>
          <p><span style={{ display: "inline-block", width: "75px" }}>{t('credential.noAttributeCredential')}:</span>  <span onClick={goCredential.bind(this, 'noAttributeCredential', record)}>--</span> </p>
        </>
      }
    },
    {
      title: t('common.actions'),
      width: i18n.language === 'en' ? 400 : 'auto',
      dataIndex: 'actions',
      // key: 'actions',
      render: (text: any, row: any, index: any) => {
        //元数据的状态 (0: 未知; 1: 未发布; 2: 已发布; 3: 已撤销;4:已删除;
        //5: 发布中; 6: 撤回中; 7: 凭证发布失败; 8: 凭证发布中; 9:已发布凭证)
        //10已绑定凭证
        let list = [
          {
            name: row.status >= 2 ? t('center.view') : t('UserCenter.ProfileButtonEdit'),//查看
            fn: viewFn.bind(this, row),
            show: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10]
          },
          {
            name: t('center.download'),//下载
            fn: downloadFn.bind(this, row),
            show: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10]
          },
          {
            name: t('center.withdraw'),//撤回
            fn: withDrawFn.bind(this, row),
            show: [2, 7]
          },
          {
            name: t('center.publish'),//发布
            fn: publishFn.bind(this, row),
            show: [0, 1, 3]
          },
          {
            name: t('common.copy'),//复制
            fn: saveAsNewData.bind(this, row),
            show: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10]
          },
          {
            name: t('center.delete'),//删除
            fn: deleteFn.bind(this, row),
            show: [0, 1, 3]
          },
        ]
        // if (+row.status === 2) {
        return (
          <div className="operation-box">
            {list.map((_: any) => {
              // debugger
              return _.show.includes(row.status) ? <p className="btn pointer link pr10" key={_.name} onClick={_.fn}>
                {_.name}
              </p> : ''
            })}
            <p className="btn pointer link pr10" onClick={toRelease.bind(this, row)}>
              {t('credential.releaseCredential')}
            </p>
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
      }}
    />
  }
  const operations = {
    right: <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('myData.dataName')}`} />
  }

  return (
    <div className="data-table-box">
      <Tabs onChange={callback}
        tabBarGutter={20}
        tabBarExtraContent={operations}>
        {/* type="card"
        className={"data-mgt-tabs"}> */}
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
          style={{ marginLeft: '10px' }}
          className="plus-button"
          icon={<PlusOutlined />}
          onClick={() => history.push('/myData/dataAddition')}
        >
          {t('myData.addData')}
        </Button>} disabled key="3" />
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
