import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Tabs, message } from 'antd'
import { resourceApi } from '@api/index'
import warnSvg from '@assets/images/10.icon1.svg'
import successSvg from '@assets/images/9.icon1.svg'
import "./scss/styles.scss"

const MyTemplate: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TabPane } = Tabs;
  const history = useHistory()
  const [searchText, setSearchText] = useState("")

  const [curPage, setCurPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalNum, setTotalNum] = useState(0)
  const [tableData, setTableData] = useState([])

  const initTableData = () => {
    resourceApi.queryMydataByKeyword({ pageNumber: curPage, pageSize: 10 }).then(res => {
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
  }, [curPage])


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
      render: (text, record, index) => `${(curPage - 1) * 10 + (index + 1)}`,
      width: 50,
    },
    {
      title: t('MyModel.ModelName'),
      dataIndex: 'metaDataName',
      width: 180,
      ellipsis: true,
      className: "no-right-border"
    },
    {
      title: t('MyModel.ISPublish'),
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
      title: t('MyModel.CreationTime'),
      dataIndex: 'metaDataName',
      width: 180,
      ellipsis: true,
      className: "no-right-border"
    },
    {
      title: t('MyModel.AssociatedTask'),
      dataIndex: 'metaDataName',
      width: 180,
      ellipsis: true,
      className: "no-right-border"
    },
    {
      title: t('MyModel.CredentialsSymbols'),
      dataIndex: 'Symbol',
      ellipsis: true,
      width: 220,
      render: (text, record, index) => {
        return <span className='data-symbol' onClick={toRelease.bind(this, record)}>{text ? text : t('dataNodeMgt.publishDataVoucher')}</span>
      }
    }
  ]

  const callback = (key) => {
    initTableData()
    setCurPage(1)
  }

  const tableDom = (key) => {
    return <Table
      dataSource={[...tableData, ...tableData]}
      key={key}
      columns={columns}
      bordered
      loading={loading}
      rowKey={_ => _.id}
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

  return (
    <div className="layout-box my-template">
      <Tabs onChange={callback}
        tabBarGutter={8}
        type="card"
        className={"my-template-tabs"}>
        <TabPane tab={t('dataNodeMgt.allData')} key="1">
          {tableDom(1)}
        </TabPane>
        <TabPane tab={t('dataNodeMgt.publishedData')} key="2">
          {tableDom(2)}
        </TabPane>
        <TabPane tab={t('dataNodeMgt.unpublishedData')} key="3">
          {tableDom(3)}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MyTemplate
