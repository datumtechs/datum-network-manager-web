import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, InputNumber, message, Row, Tooltip } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { voucher } from '@api'
import { QuestionCircleOutlined } from '@ant-design/icons'
// import stepone from '@assets/images/voucher/step_one.svg'
import ABIJson from '@/utils/DataTokenFactory.json'
import { Complement, filterWeb3Code, filterIntegerAmount } from '@/utils/utils'
import { requestCancel } from '@/utils/loading'

const CredentialInfo: FC<any> = (props: any) => {

  const { t, i18n } = useTranslation();
  const history = useHistory();
  const form = useRef<any>();
  const [dataTokenFactory, setDataTokenFactory] = useState('');
  const { walletConfig } = props.state;
  const { location } = props;
  const { dataTokenId, metaDataId, metaDataName, dataId, usage } = location.state;
  const [loading, setLoading] = useState(false);
  const submiting = useRef(false)
  // const receipt = useRef(false)
  // const [datas,setDatas] = useState<any>({})


  const initialState: any = useRef()

  const release = async (params) => {
    const { wallet } = props.state.wallet || {}

    try {
      const { web3 } = wallet
      setLoading(true)
      submiting.current = true
      // 1 获取地址
      const flag = await wallet.eth.isConnected()// 判断是否连接当前网络
      if (!flag) return
      const address = await wallet.connectWallet(walletConfig)
      if (!address) {
        return message.error(t('common.pleaseSwitchNetworks'))
      }
      // 构建合约
      const myContract = new web3.eth.Contract(
        ABIJson,
        dataTokenFactory,
      );
      const nonce = await web3.eth.getTransactionCount(address[0])

      // 发起交易
      await myContract.methods.createToken(
        'Datum-' + params.name,
        params.symbol,
        String(params.initialSupply + Complement),
        String(params.initialSupply + Complement),
        metaDataId
      ).send({
        from: address[0]
      }).on('transactionHash', (hash) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        sendTransactionData(params, nonce, hash, address[0])
      })


    } catch (e: any) {
      setLoading(false)
      message.error(t(`exception.${filterWeb3Code(e.code)}`))
      submiting.current = false
    }
  }

  const submit = async () => {
    form.current.validateFields().then(values => {
      release(values)
    })
  }


  useEffect(() => {
    const data = localStorage.getItem('metaDataId')
    if (data && (data === dataId)) {
      submiting.current = true
      // receipt.current = true
      setLoading(true)
      query(data)
    }

    if (data && (data !== dataId)) {
      localStorage.setItem('metaDataId', '')
    }

    if (!dataId) history.go(-1)
    voucher.getPublishConfig({
      "dataTokenId": dataTokenId || ''
    }).then(res => {
      const { data } = res
      if (data?.dataTokenFactory) {
        setDataTokenFactory(data.dataTokenFactory)
      }
    })

    return () => {
      requestCancel.del('/api/v1/dataToken/getDataTokenStatus')
      setLoading(false)
      submiting.current = false
      if (initialState.timeOut) {
        clearTimeout(initialState.current)
      }
    }
  }, [])

  const timeOut = (id) => {
    if (!submiting) return
    if (initialState.current) {
      clearTimeout(initialState.current)
    }
    initialState.current = setTimeout(() => {
      query(id)
    }, 1000)
  }

  const sendTransactionData = (params, nonce, hash, address) => {
    voucher.postTransaction({
      "desc": '',
      "hash": hash,
      "metaDataDbId": dataId,// metaDataId,
      "name": 'Datum-' + params.name,
      "symbol": params.symbol,
      "total": params.initialSupply + Complement,
      "init": params.initialSupply + Complement,
      ciphertextFee: String(params.ciphertextConsumption) + Complement,
      plaintextFee: String(params.plaintextConsumption) + Complement,
      nonce,
      owner: address
    }).then(res => {
      const { data, status } = res
      if (status === 0) {
        localStorage.setItem('metaDataId', data)
        query(data)
      } else if (status == 1045) {
        history.go(-1)
      }
    })
  }

  const query = async (id) => {
    if (!id) return
    const { wallet } = props.state.wallet || {}
    const { web3 } = wallet

    voucher.queryDataTokenStatus({
      "id": +id || null
    }).then(async (res) => {
      const { data } = res

      form.current.setFieldsValue({
        name: data?.name ? data?.name.replace('Datum-', '') : '',
        symbol: data?.symbol,
        plaintextConsumption: filterIntegerAmount(data?.plaintextFee),
        ciphertextConsumption: filterIntegerAmount(data?.ciphertextFee),
        initialSupply: filterIntegerAmount(data?.total) //data.total
      })
      if (data?.status == 3) {
        web3.eth.getTransactionCount(data.address).then(res => {
          console.log(res);
          if (!res) {
            timeOut(id)
            return
          }
          setLoading(false)
          localStorage.setItem('metaDataId', '')
          // setDatas(data)
          submiting.current = false
          history.push({
            pathname: '/voucher/NoAttribute',
            // pathname: '/myData/dataVoucherPublishing/PriceSet',
            state: {
              dataAddress: data.address,
              name: data.name,
              dataTokenId: data.id,
              total: data.total,
              symbol: data.symbol
            },
          })
        })
      } else if (data?.status == 2) {
        setLoading(false)
        submiting.current = false
        message.error(t('center.voucherPublishingFailed'))
      } else {
        timeOut(id)
      }
    }).catch(e => {
      setLoading(false)
      submiting.current = false
    })
  }

  // useEffect(() => {

  // }, [])



  return <div className='credential-info-seting'>
    <Card className='details-top-box layout-box p-20'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('center.dataName')}：{metaDataName}</p>
          <p>{t('center.metaDataID')}：{metaDataId}</p>
        </div>
      </div>
      {/* <div className='speed-progress'>
        <img src={stepone} alt="" />
      </div> */}
      <p className='title'>{t('voucher.CredentialName')}</p>

      <Form
        ref={form}
        colon={false}
        size={"large"}
        wrapperCol={{ span: 12 }}
        className={i18n.language == 'zh' ? 'zh-label-width' : 'en-label-width'}
      >
        <Form.Item
          label={`${t('voucher.Name')}`}
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              validator: (rule, value, callback): any => {
                if (!value) return callback(`${t('credential.pleaseEnter')}${t('voucher.Name')}`)
                if (value.length < 2) return callback(t('common.inputValueminlength'))
                return /^[A-Za-z0-9]+$/.test(value) ? callback() : callback(t('voucher.OnlyLettersNumbersEntered'));
              },
            },
          ]}
        >
          <Input
            onChange={e => form.current.setFieldsValue({ name: e.target?.value.replace(/\s*/g, "") } || '')}
            prefix={<span style={{ color: '#1D2832' }}>Datum-</span>} className="no-border" placeholder={t('credential.caseAndNumberPlaceholder')} maxLength={58} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label={`${t('voucher.Symbol')}`}
          name="symbol"
          rules={[
            {
              required: true,
              validator: (rule, value, callback): any => {
                if (!value) return callback(`${t('credential.pleaseEnter')}${t('voucher.Symbol')}`)
                if (value.length < 2) return callback(t('common.inputValueminlength'))
                return /^[A-Za-z0-9]+$/.test(value) ? callback() : callback(t('voucher.OnlyLettersNumbersEntered'));
              },
            },
          ]}
        >
          <Input
            onChange={e => form.current.setFieldsValue({ symbol: e.target?.value.replace(/\s*/g, "") } || '')}
            maxLength={64} minLength={2} placeholder={t('credential.caseAndNumberPlaceholder')} />
        </Form.Item>
        <p className='title'>{t('voucher.CirculationTotal')} </p>
        <Form.Item
          labelAlign="left"
          label={`${t('voucher.Circulation')}:`}
          name="initialSupply"
          rules={[
            {
              pattern: new RegExp(/^[1-9]\d*$/, "g"),
              message: `${t('common.pleaseEnterNumber')}`
            },
            { required: true, message: `${t('voucher.RequiredCirculation')}` }]}
        >
          <Input
            onChange={e => form.current.setFieldsValue({ initialSupply: e.target?.value.replace(/\s*/g, "") } || '')}
            maxLength={18} minLength={2} placeholder={`${t('voucher.RequiredCirculation')}`} />
        </Form.Item>
        <p className='title'>{t('credential.setConsumption')}
          <Tooltip placement="topLeft" title={t('credential.setConsumptionTips')}>
            <QuestionCircleOutlined style={{ 'fontSize': '18px', 'color': '#3C3588', marginLeft: "20px" }} />
          </Tooltip>
        </p>
        {[2, 3].includes(+usage) ?
          <Form.Item
            labelAlign="left"
            label={`${t('credential.ciphertextConsumption')}:`}
            name="ciphertextConsumption"
            initialValue={1}
            rules={[
              {
                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                message: `${t('common.pleaseEnterNumber')}`
              },
              { required: true, message: `${t('credential.pleaseEnter')} ${t('credential.ciphertextConsumption')}` }]}
          >
            <Input
              onChange={e => form.current.setFieldsValue({ ciphertextConsumption: e.target?.value.replace(/\s*/g, "") } || '')}
              maxLength={18} placeholder={`${t('credential.pleaseEnter')}${t('credential.ciphertextConsumption')}`} minLength={1} />
          </Form.Item> : ''
        }
        {[1, 3].includes(+usage) ?
          <Form.Item
            labelAlign="left"
            label={`${t('credential.plaintextConsumption')}:`}
            name="plaintextConsumption"
            initialValue={1}
            rules={[
              {
                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                message: `${t('common.pleaseEnterNumber')}`
              },
              { required: true, message: `${t('credential.pleaseEnter')} ${t('credential.plaintextConsumption')}` }]}
          >
            <Input
              onChange={e => form.current.setFieldsValue({ plaintextConsumption: e.target?.value.replace(/\s*/g, "") } || '')}
              maxLength={18} minLength={1} placeholder={`${t('credential.pleaseEnter')}${t('credential.plaintextConsumption')}`} />
          </Form.Item> : ""
        }


        <Form.Item
          labelAlign="left"
          label={` `}
        >
          <div className='exchange-button' style={{ marginTop: '30px' }}>
            <Button className='but' onClick={() => history.go(-1)}>{t('common.previousStep')}</Button>
            <Button type="primary" className="but" loading={loading} onClick={submit}>{t('voucher.PublishCredential')}</Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  </div>
}

export default connect((state: any) => ({ state }))(CredentialInfo)