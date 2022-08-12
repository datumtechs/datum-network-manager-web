import { FC, useState, useEffect, useRef, createRef } from "react";
import { useTranslation } from 'react-i18next'
import { Table, Tabs, Button, message, Tooltip, Modal, Form, Input } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import "../scss/styles.scss"
import { voucher as voucherApi, resourceApi } from '@api/index'
import { filterIntegerAmount, copy, UseCredentialStatus, useAddressDisplay, Complement } from '@/utils/utils'
import ABIJson from '@/utils/DipoleRouter.json'// dex
import ERC20 from '@/utils/ERC20.json'// 恒涛提供
import { connect } from 'react-redux'
import FactoryJson from '@/utils/DipoleFactory.json'// 工厂合约
import SearchBar from '@/layout/components/SearchBar'
import UsageScene from '@com/UsageScene'
import { QuestionCircleOutlined } from '@ant-design/icons'


const VoucherTable: FC<any> = (props: any) => {
  const { location } = props
  const type = location?.state?.attributeType || ''
  const form = useRef<any>()
  const { t, i18n } = useTranslation()
  const [curPage, setCurPage] = useState(1)
  const [totalNum, setTotalNum] = useState(0)
  const [tableData, setTableData] = useState([])
  const [dexUrl, setDexUrl] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const history = useHistory()
  const { walletConfig } = props.state
  const pagination = { current: 1, defaultPageSize: 10 }
  const [activeRow, setActiveRow] = useState<any>({})
  const [searchText, setSearchText] = useState("")
  const [routerToken, setRouterToken] = useState('');
  const [modalLoading, setModalLoading] = useState(false)
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
  }, [curPage, searchText])

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
  }
  const setPrice = async (row) => {
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
    bindData = async (row) => {
      try {
        const { wallet, } = props.state.wallet
        const { walletConfig } = props.state
        setModalLoading(true)
        const address = await wallet.connectWallet(walletConfig)
        const metaDateDetails = await resourceApi.queryMetaDataDetail(row.metaDataDbId)
        const metaDateOptionData = await resourceApi.getMetaDataOption({ id: row.metaDataDbId })
        if (metaDateDetails.status !== 0) return setModalLoading(false)
        if (metaDateOptionData.status !== 0) return setModalLoading(false)
        const metaData = metaDateDetails.data
        const params = [
          metaData?.metaDataName,
          metaData?.metaDataType,
          metaData?.dynamicFields?.dataHash,
          metaData?.desc,
          metaData?.dynamicFields?.locationType,
          metaData?.metaDataType,
          String(metaData?.industry),
          String(metaData?.status),
          metaDateOptionData.data,
        ]
        const data: any = { dataTokenId: row.id }
        const sign = await wallet.signData(params, address[0])
        data.sign = sign
        if (!data.sign) return setModalLoading(false)
        voucherApi.bindMetaData(data).then(res => {
          const { status } = res
          if (status == 0) {
            message.success(t('task.success'))
            query()
          }
        })
      } catch (e) {

      }

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
    setActiveRow(row)
    setModalShow(true)
  }

  const saveFn = () => {
    form.current.validateFields().then(async (values) => {
      console.log(values);
      try {
        const { wallet, } = props.state.wallet
        const { walletConfig } = props.state
        const Plain = values.Plaintext ? String(values.Plaintext) + Complement : ''
        const cipher = values.ciphertext ? String(values.ciphertext) + Complement : ''
        setModalLoading(true)
        const address = await wallet.connectWallet(walletConfig)
        const metaDateDetails = await resourceApi.queryMetaDataDetail(activeRow.metaDataDbId)
        const metaDateOptionData = await resourceApi.getMetaDataOption({ id: activeRow.metaDataDbId })
        if (metaDateOptionData.status !== 0) return setModalLoading(false)
        if (metaDateDetails.status !== 0) return setModalLoading(false)
        const metaData = metaDateDetails.data
        const newMetaDateOptionData = JSON.parse(metaDateOptionData.data)
        const options = JSON.parse(newMetaDateOptionData.consumeOptions)
        if (Plain) options[0].plainAlgoConsumeUnit = Plain
        if (cipher) options[0].cryptoAlgoConsumeUnit = cipher
        newMetaDateOptionData.consumeOptions = JSON.stringify([options[0]])
        const params = [
          metaData?.metaDataName,
          metaData?.metaDataType,
          metaData?.dynamicFields?.dataHash,
          metaData?.desc,
          metaData?.dynamicFields?.locationType,
          metaData?.metaDataType,
          String(metaData?.industry),
          String(metaData?.status),
          JSON.stringify(newMetaDateOptionData),
        ]
        const data: any = { dataTokenId: activeRow.id }
        if (Plain) data.newPlaintextFee = Plain
        if (cipher) data.newCiphertextFee = cipher
        const sign = await wallet.signData(params, address[0])
        data.sign = sign
        if (!data.sign) return setModalLoading(false)
        voucherApi.updateFee(data).then(res => {
          const { status } = res
          if (status == 0) {
            message.success(t("task.success"))
          }
          setModalLoading(false)
        })

      } catch (e) { setModalLoading(false) }
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
      confirmLoading={modalLoading}
      destroyOnClose={true}
      centered={true}
      onCancel={() => (setModalShow(false), setModalLoading(false))}
      okText={t('common.submit')}
      cancelText={t('common.cancel')}
      title={<>{t('orgManage.setAlgorithmConsumption')}
        <Tooltip placement="topLeft" title={<div>{i18n.language == 'en' ? "You can modify the voucher once every 24 hours (single task consumption)" : "您可以每隔24小时修改一次凭证单次任务消耗量"}</div>}>
          &nbsp;&nbsp;<QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588' }} />
        </Tooltip>
      </>}>
      <Form
        labelCol={{ span: 6 }}
        ref={form}
      >
        {
          [1, 3].includes(activeRow?.dynamicFields?.usage) ? <Form.Item name="Plaintext"
            label={t('center.Plaintext')}
            className="froup-item"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                message: `${t('common.pleaseEnterNumber')}`
              }]}>
            <Input className="form-box-input" placeholder={t('center.Plaintext')} addonAfter={activeRow.symbol} />
          </Form.Item> : ""}
        {
          [2, 3].includes(activeRow?.dynamicFields?.usage) ?
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
                className="form-box-input" placeholder={t('center.ciphertext')} addonAfter={activeRow.symbol} />
            </Form.Item> : ""
        }
      </Form>
    </Modal >
  </div>
}

export default connect((state: any) => ({ state }))(VoucherTable)
