import { FC, useState, useEffect, useRef, createRef } from "react";
import { useTranslation } from 'react-i18next'
import { Table, Tabs, Button, message, Tooltip } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import "../scss/styles.scss"
import { voucher as voucherApi } from '@api/index'
import { filterIntegerAmount, copy } from '@/utils/utils'
import ABIJson from '@/utils/DipoleRouter.json'// dex
import ERC20 from '@/utils/ERC20.json'// 恒涛提供
import { connect } from 'react-redux'
import FactoryJson from '@/utils/DipoleFactory.json'// 工厂合约
import SearchBar from '@/layout/components/SearchBar'

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
    { walletConfig } = props.state,
    pagination = {
      current: 1,
      defaultPageSize: 10,
    },
    { TabPane } = Tabs
  const [searchText, setSearchText] = useState("")
  const [routerToken, setRouterToken] = useState('');
  useEffect(() => {
    query()
    queryConfig()
    voucherApi.getUpConfig().then(res => {
      const { data } = res
      if (data.routerToken) {
        setRouterToken(data.routerToken)
      }
    })
  }, [])

  useEffect(() => {
    query()

  }, [curPage, activeKey])

  const toAuthorization = async (web3, DataAddress) => {
    try {
      const { wallet } = props.state.wallet || {}
      const contract = new web3.eth.Contract(      // 构建 数据 合约 
        ERC20,
        DataAddress
      );
      console.log('contract', walletConfig);
      const address = await wallet.connectWallet(walletConfig)
      console.log('address', address);
      const amound = await contract.methods.allowance(
        address[0],
        routerToken
      ).call()
      console.log('amound', amound);
      // throw new Error()
      return Promise.resolve(amound)
    } catch (e) {
      message.warning(t('voucher.CredentialNotDeployed'))
      return Promise.resolve('error')
    }
  }


  const viewFn = (row) => {
    window.open(`${dexUrl}?outputCurrency=${row.address}`)
  },
    setPrice = async (row) => {
      const { wallet } = props.state.wallet || {}
      try {
        const { web3 } = wallet
        const amound = await toAuthorization(web3, row.address)
        if (amound == 'error') return
        //  构建路由合约
        const myContract = new web3.eth.Contract(
          ABIJson,
          routerToken,
        );

        //查询工厂合约地址
        const factory = await myContract.methods.factory().call()

        //构建工厂合约
        const FactoryContract = new web3.eth.Contract(
          FactoryJson,
          factory,
        );

        //请i去weth 合约
        const WETH = await myContract.methods.WETH().call()

        const pair = await FactoryContract.methods.getPair(WETH, row.address).call()
        if (pair !== '0x0000000000000000000000000000000000000000') {//没有币兑地址  第一次
          const { data, status } = await voucherApi.updateDataTokenStatus({ dataTokenId: row.id, status: 6 })
          if (status == 0) {
            message.warning(t('voucher.CredentialPublished'))
            query()
          }
          return
        }
      } catch (e) {
        console.log(e);
        return
      }

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
        status: +activeKey,
        searchText: searchText
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
      render: (text, record, index) => filterIntegerAmount(text)
    },
    {
      title: t('voucher.ContractAddress'),
      dataIndex: 'address',
      ellipsis: true,
      // width: 360,
      render: (text, record, index) =>
        text
          ? <>
            <CopyOutlined style={{ marginRight: '10px' }} onClick={() => copy(text)} />
            {/* <input readOnly style={{ position: 'absolute', height: '10px', width: '10px', opacity: 0.01, zIndex: -1 }} value={text} ref={(e) => refDom.current[index] = e} /> */}
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
  const operations = {
    right: <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('voucher.VoucherName')}`} />
  }

  return <div className="voucher">
    <Tabs onChange={callback}
      tabBarExtraContent={operations}
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

export default connect((state: any) => ({ state }))(VoucherTable)
