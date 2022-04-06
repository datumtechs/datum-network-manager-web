import { FC, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { Table, Tabs, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import "../scss/styles.scss"
import { voucher as voucherApi } from '@api/index'

const datas: any = [{
  metaDataName: "1"
}]

const VoucherTable: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    [activeKey, setActiveKey] = useState(0),
    [curPage, setCurPage] = useState(1),
    [totalNum, setTotalNum] = useState(0),
    [tableData, setTableData] = useState([]),
    [dexUrl, setDexUrl] = useState(''),
    history = useHistory(),
    pagination = {
      current: 1,
      defaultPageSize: 10,
    },
    { TabPane } = Tabs
  useEffect(() => {
    query()
    queryConfig()
  }, [])

  const viewFn = (row) => {
    window.open(dexUrl)
    // const { type } = props
    // history.push({
    //   pathname: `/voucher/${type ? 'NoAttribute' : 'Template'}/Detauls`,
    //   state: {
    //     credentialID: row.credentialID,
    //     dataStatus: +row.status === 2 ? '2' : '1'
    //   },
    // })
  },
    setPrice = (row) => {
      const { type } = props
      history.push({
        pathname: `/voucher/${type ? 'NoAttribute' : 'Template'}/PriceSet`,
        state: {
          credentialID: row.credentialID,
          dataStatus: +row.status === 2 ? '2' : '1'
        },
      })
    },
    query = () => {
      voucherApi.queryUnpricedVoucher({
        pageNumber: curPage,
        pageSize: 10,
        status: +activeKey
      }).then(res => {
        const { data, code } = res
        if (code == 1000) {

        }
      })
      setTableData(datas)
    },
    queryConfig = () => {
      voucherApi.queryDexWebUrl().then(res => {
        const { data } = res
        setDexUrl(data)
      })
    }

  const columns: any[] = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 70,
      align: 'center',
      className: "no-right-border"
    },
    {
      title: t('voucher.VoucherName'),
      dataIndex: 'name',
      width: 180,
      ellipsis: true,
      className: "no-right-border"
    },
    {
      title: t('voucher.VoucherSymbol'),
      dataIndex: 'symbol',
      className: "no-right-border",
    },
    {
      title: t('voucher.VoucherTotalRelease'),
      dataIndex: 'total',
      className: "no-right-border",

    },
    (() => +activeKey == 0 ? {
      title: t('voucher.VoucherNumberOfHolders'),
      dataIndex: 'holder',
      ellipsis: true,
      className: "no-right-border",
    } : {
      className: "no-right-border",
      width: 0,
      ellipsis: true,
    })(),
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        // 定价状态：0-未定价，1-已定价
        return <>
          {activeKey == 0 ?
            <Button type="link" onClick={() => viewFn(row)}>  {t('center.view')}</Button> :
            <Button type="link" onClick={() => setPrice(row)}>  {t('voucher.VoucherSetPrice')}</Button>
          }
        </>
      },
    },
  ]

  const OnPageChange = (page: number) => {
    setTableData([])
    setCurPage(page)
  }

  const tableDom = <Table
    dataSource={[...tableData, ...tableData]}
    columns={columns}
    bordered
    rowKey={(record: any) => record.id}
    pagination={{
      defaultCurrent: 1,
      current: curPage,
      defaultPageSize: 10,
      showSizeChanger: false,
      total: totalNum,
      onChange: OnPageChange,
    }}
  />

  const callback = (key) => {
    setActiveKey(key)
    query()
  }

  return <div className="voucher">
    <Tabs onChange={callback}
      tabBarGutter={8}
      type="card"
      className={"voucher-tabs"}>
      <TabPane tab={t('voucher.PricedVoucher')} key="0">
        {tableDom}
      </TabPane>
      <TabPane tab={t('voucher.UnpricedVoucher')} key="1">
        {tableDom}
      </TabPane>
    </Tabs>
  </div>
}

export default VoucherTable

