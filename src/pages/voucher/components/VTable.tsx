import { FC, useState, useEffect, useRef, createRef } from "react";
import { useTranslation } from 'react-i18next'
import { Table, Tabs, Button, message, Tooltip } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import "../scss/styles.scss"
import { voucher as voucherApi } from '@api/index'
import { filterAmount } from '@/utils/utils'


const VoucherTable: FC<any> = (props: any) => {
  const { location } = props
  const type = location?.state?.attributeType || ''
  // debugger
  // console.log(type)
  const { t } = useTranslation(),
    [activeKey, setActiveKey] = useState(type ? 1 : 0),
    [curPage, setCurPage] = useState(1),
    [totalNum, setTotalNum] = useState(0),
    [tableData, setTableData] = useState([]),
    [dexUrl, setDexUrl] = useState(''),
    history = useHistory(),
    pagination = {
      current: 1,
      defaultPageSize: 10,
    },
    { TabPane } = Tabs,
    refDom = useRef<any>([])

  useEffect(() => {
    query()
    queryConfig()
  }, [])

  useEffect(() => {
    query()

  }, [curPage, activeKey])

  const viewFn = (row) => {
    window.open(`${dexUrl}?outputCurrency=${row.address}`)
  },
    setPrice = (row) => {
      history.push({
        pathname: '/myData/dataVoucherPublishing/PriceSet',
        state: {
          dataAddress: row.address,
          name: row.name,
          dataTokenId: row.id,
          symbol: row.symbol,
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
          setTotalNum(res.total)
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
      width: '20%',
      className: "no-right-border"
    },
    {
      title: t('voucher.VoucherSymbol'),
      dataIndex: 'symbol',
      width: '15%',
      ellipsis: true,
    },
    {
      title: t('voucher.VoucherTotalRelease'),
      dataIndex: 'total',
      ellipsis: true,
      width: '15%',
      render: (text, record, index) => filterAmount(text)
    },
    {
      title: t('voucher.ContractAddress'),
      dataIndex: 'address',
      ellipsis: true,
      // width: 360,
      render: (text, record, index) =>
        text
          ? <>
            <CopyOutlined style={{ marginRight: '10px' }} onClick={() => copy(index)} />
            <input readOnly style={{ position: 'absolute', height: '10px', width: '10px', opacity: 0, zIndex: -1 }} value={text} ref={(e) => refDom.current[index] = e} />
            <Tooltip placement="bottom" title={text} color="#fff" overlayClassName={'_tooltip'}>
              {text}
            </Tooltip>
          </>
          : '--'
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      width: '120px',
      render: (text: any, row: any, index: any) => {
        // 定价状态：0-未定价，1-已定价
        return <>
          {activeKey == 1 ?
            <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => viewFn(row)}>  {t('center.view')}</Button> :
            row.status == 3 || row.status == 5 ?
              <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => setPrice(row)}>  {t('voucher.VoucherSetPrice')}</Button>
              : ''
          }
        </>
      },
    },
  ]

  const copy = (index) => {
    // 有兼容性 暂时先这样
    try {
      const addressDom = refDom.current[index]
      console.log(addressDom.select)
      addressDom.select()
      const res = document.execCommand('copy')
      if (res) {
        message.success(t('common.copySuccess'))
        return
      }
      message.error(t('common.copyFailed'))
    } catch {
      message.error(t('common.copyFailed'))
    }
  }

  const OnPageChange = (page: number) => {
    setTableData([])
    setCurPage(page)
  }

  const tableDom = (key) => {
    return <Table
      dataSource={tableData}
      columns={columns}
      key={key}
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
  }

  const callback = (key) => {
    setActiveKey(key)
    setCurPage(1)
    // query()
  }

  return <div className="voucher">
    <Tabs onChange={callback}
      activeKey={String(activeKey)}
      tabBarGutter={20}>
      <TabPane tab={t('voucher.UnpricedVoucher')} key="0">
        {tableDom('Unpriced')}
      </TabPane>
      <TabPane tab={t('voucher.PricedVoucher')} key="1">
        {tableDom('priced')}
      </TabPane>
    </Tabs>
  </div>
}

export default VoucherTable
