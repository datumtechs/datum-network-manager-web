import { FC, useState, useEffect, useRef, createRef } from "react";
import { useTranslation } from 'react-i18next'
import { Table, Tabs, Button, message, Tooltip, Modal, Form, Input } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import "../scss/styles.scss"
import { voucher as voucherApi } from '@api/index'
import { filterIntegerAmount, copy, UseCredentialStatus, useAddressDisplay } from '@/utils/utils'
import ABIJson from '@/utils/DipoleRouter.json'// dex
import ERC20 from '@/utils/ERC20.json'// 恒涛提供
import { connect } from 'react-redux'
import FactoryJson from '@/utils/DipoleFactory.json'// 工厂合约
import SearchBar from '@/layout/components/SearchBar'
import UsageScene from '@com/UsageScene'


const VoucherTable: FC<any> = (props: any) => {
  const { location } = props
  const type = location?.state?.attributeType || ''
  // const [form]: any = Form.useForm()
  const form = useRef<any>()
  const { t, i18n } = useTranslation(),
    [activeKey, setActiveKey] = useState(type ? 1 : 0),
    [curPage, setCurPage] = useState(1),
    [totalNum, setTotalNum] = useState(0),
    [tableData, setTableData] = useState([]),
    [dexUrl, setDexUrl] = useState(''),
    [modalShow, setModalShow] = useState(false),
    history = useHistory(),
    { walletConfig } = props.state,
    pagination = {
      current: 1,
      defaultPageSize: 10,
    }
  // { TabPane } = Tabs
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

  }, [curPage, activeKey, searchText])

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
        keyword: searchText
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
    },
    bindData = (row) => {
      voucherApi.bindMetaData({
        dataTokenId: row.id,
        sign: ""
      }).then(res => {
        const { status } = res
        if (status == 0) {
          message.success(t('task.success'))
          query()
        }
      })
    }

  const columns: any = (type): any[] => {
    return [
      {
        title: ``,
        render: ({ }, { }, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
        width: 60,
      },
      {
        title: t('voucher.VoucherName'),
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: t('center.dataName'),
        dataIndex: '',
        ellipsis: true,
        render: (text, record, index) => record.dynamicFields?.metaDataName || '-'
      },
      {
        title: t('voucher.VoucherSymbol'),
        dataIndex: 'symbol',
        ellipsis: true,
      },
      {
        title: t('voucher.VoucherTotalRelease'),
        dataIndex: 'total',
        ellipsis: true,
        render: (text, record, index) => filterIntegerAmount(text)
      },
      {
        title: t('voucher.ContractAddress'),
        dataIndex: 'address',
        ellipsis: true,
        width: 150,
        render: (text, record, index) =>
          text
            ? <>
              <CopyOutlined style={{ marginRight: '10px' }} onClick={() => copy(text)} />
              <Tooltip placement="bottom" title={text} color="#fff" overlayClassName={'_tooltip'}>
                {useAddressDisplay(text)}
              </Tooltip>
            </>
            : '--'
      },
      {
        title: t('center.usageScene'),
        dataIndex: 'status',
        ellipsis: true,
        render: (text, record) => <UsageScene status={record.dynamicFields?.usage} />
      },
      {
        title: t('task.status'),
        dataIndex: 'usage',
        ellipsis: true,
        render: (text, record) => UseCredentialStatus(record.status)
      },
      {
        title: t('common.actions'),
        dataIndex: 'actions',
        width: '220px',
        render: (text: any, row: any, index: any) => {
          // 0-未发布，1-发布中，2-发布失败，3-发布成功，4-定价中，5-定价失败，6-定价成功，7-绑定中，8-绑定失败，9-绑定成功
          return <>
            {[3, 8].includes(row.status) ?
              <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => bindData(row)}>  {t('credential.bindData')}</Button>
              : ''}
            {[6].includes(row.status) ?
              <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => viewFn(row)}>  {t('center.view')}</Button>
              : ''}
            {[5, 9].includes(row.status) ?
              <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => setPrice(row)}>  {t('voucher.VoucherSetPrice')}</Button>
              : ''}
            {![0, 1, 4, 7,].includes(row.status) ?
              <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => updateConsumption(row)}>  {t('orgManage.modifyConsumption')}</Button>
              : ''}
          </>
        }
      },
    ]
  }

  const updateConsumption = (row) => {
    setModalShow(true)
  }

  const saveFn = () => {
    form.current.validateFields().then(values => {
      console.log(values);
    })
  }


  const OnPageChange = (page: number) => {
    setTableData([])
    setCurPage(page)
  }


  return <div className="voucher">
    <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('voucher.VoucherName')}`} />
    <Table
      className="com-table "
      dataSource={tableData}
      columns={columns()}
      rowKey={(record: any) => record.id}
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

    <Modal
      visible={modalShow}
      onOk={saveFn}
      destroyOnClose={true}
      centered={true}
      onCancel={() => setModalShow(false)}
      okText={t('common.submit')}
      cancelText={t('common.cancel')}
      title={t('orgManage.setAlgorithmConsumption')}>
      <Form
        // name="basic"
        ref={form}
      >
        <Form.Item name="Plaintext"
          label={t('center.Plaintext')}
          className="froup-item"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, "g"),
              message: `${t('common.pleaseEnterNumber')}`
            }]}>
          <Input className="form-box-input" placeholder={t('center.Plaintext')} />
        </Form.Item>
        <Form.Item name="ciphertext"
          label={t('center.ciphertext')}
          className="froup-item"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, "g"),
              message: `${t('common.pleaseEnterNumber')}`
            }]}>
          <Input
            className="form-box-input" placeholder={t('center.ciphertext')} />
        </Form.Item>
      </Form>
    </Modal >
  </div>
}

export default connect((state: any) => ({ state }))(VoucherTable)
