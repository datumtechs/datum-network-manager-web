import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, InputNumber, message, Row, Tooltip } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { voucher } from '@api'
import { QuestionCircleOutlined } from '@ant-design/icons'
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
  const { dataTokenId, metaDataId, metaDataName, dataId } = location.state;
  const [loading, setLoading] = useState(false);
  const submiting = useRef(false)



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
        params.name,
        params.symbol,
        String(params.initialSupply + Complement),
        String(params.initialSupply + Complement),
        metaDataId
      ).send({
        from: address[0]
      }).on('transactionHash', (hash) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        sendTransactionData(params, nonce, hash)
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

  const sendTransactionData = (params, nonce, hash) => {
    voucher.postTransaction({
      "desc": params.DescriptionValue,
      "hash": hash,
      "metaDataId": dataId,// metaDataId,
      "name": params.name,
      "symbol": params.symbol,
      "total": params.initialSupply + Complement,
      "init": params.initialSupply + Complement,
      nonce
    }).then(res => {
      const { data, status } = res
      if (status === 0) {
        localStorage.setItem('metaDataId', data)
        query(data)
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
        name: data.name,
        symbol: data.symbol,
        initialSupply: filterIntegerAmount(data.total) //data.total
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
            pathname: '/myData/dataVoucherPublishing/PriceSet',
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

  useEffect(() => {
    const data = localStorage.getItem('metaDataId')
    if (data) {
      submiting.current = true
      // receipt.current = true
      setLoading(true)
      query(data)
    }
  }, [])



  return <div className='credential-info-seting'>
    <Card className='details-top-box layout-box p-20'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('center.dataName')}：{metaDataName}</p>
          <p>{t('center.metaDataID')}：{metaDataId}</p>
        </div>
      </div>
      <p className='title'>{t('voucher.CredentialName')}</p>

      <Form
        ref={form}
        colon={false}
        size={"large"}
        // labelCol={{ span:  ? 2 : 4 }}
        wrapperCol={{ span: 12 }}
        className={i18n.language == 'zh' ? 'zh-label-width' : 'en-label-width'}
      >
        <Form.Item
          label={`${t('voucher.VoucherName')}`}
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              validator: (rule, value, callback): any => {
                if (!value) return callback(`${t('credential.pleaseEnter')}${t('voucher.VoucherName')}`)
                if (value.length < 2) return callback(t('common.inputValueminlength'))
                return /^[A-Za-z0-9]+$/.test(value) ? callback() : callback(t('voucher.OnlyLettersNumbersEntered'));
              },
            },
          ]}
        >
          <Input prefix={<span style={{ color: '#1D2832' }}>Datum-</span>} className="no-border" placeholder={t('credential.caseAndNumberPlaceholder')} maxLength={64} />
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
          <Input maxLength={64} minLength={2} placeholder={t('credential.caseAndNumberPlaceholder')} />
        </Form.Item>
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