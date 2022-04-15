import { FC, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { Table, Tabs, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import "../scss/styles.scss"
import { voucher as voucherApi } from '@api/index'


const VoucherTable: FC<any> = (props: any) => {
  const { location } = props
  const type = location?.state?.attributeType || ''
  // console.log(type)
  // debugger
  const { t } = useTranslation(),
    [activeKey, setActiveKey] = useState(type ? 0 : 1),
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

  useEffect(() => {
    query()

  }, [curPage, activeKey])

  const viewFn = (row) => {
    window.open(dexUrl)
  },
    setPrice = (row) => {
      const { type } = props
      history.push({
        // pathname: `/voucher/${type ? 'NoAttribute' : 'Template'}/PriceSet`,
        pathname: `/voucher/NoAttribute/PriceSet`,
        state: {
          dataAddress: row.address,
          name: row.name,
          dataTokenId: row.id,
          total: row.total
        },
      })
    },
    query = () => {
      voucherApi.queryUnpricedVoucher({
        pageNumber: curPage,
        pageSize: 10,
        status: +activeKey
      }).then(res => {
        const { data, status } = res
        if (status === 0) {
          setTableData(data)
        }
      })

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
      ellipsis: true,
      className: "no-right-border"
    },
    {
      title: t('voucher.VoucherSymbol'),
      dataIndex: 'symbol',
      ellipsis: true,
      className: "no-right-border",
    },
    {
      title: t('voucher.VoucherTotalRelease'),
      dataIndex: 'total',
      ellipsis: true,
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
      width: '100px',
      render: (text: any, row: any, index: any) => {
        // 定价状态：0-未定价，1-已定价
        return <>
          {activeKey == 1 ?
            <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => viewFn(row)}>  {t('center.view')}</Button> :
            row.status == 3 || row.status == 5 || true ?
              <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => setPrice(row)}>  {t('voucher.VoucherSetPrice')}</Button>
              : ''
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
    dataSource={tableData}
    columns={columns}
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
    setCurPage(1)
    // query()
  }

  return <div className="voucher">
    <Tabs onChange={callback}
      activeKey={String(activeKey)}
      tabBarGutter={20}>
      <TabPane tab={t('voucher.PricedVoucher')} key="1">
        {tableDom}
      </TabPane>
      <TabPane tab={t('voucher.UnpricedVoucher')} key="0">
        {tableDom}
      </TabPane>
    </Tabs>
  </div>
}

export default VoucherTable

