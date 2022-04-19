import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, InputNumber, message, Row } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import stepone from '@assets/images/voucher/step_one.svg'
import ABIJson from '@/utils/DataTokenFactory.json'
import { Complement } from '@/utils/utils'
import { voucher } from '@api'
import { requestCancel } from '@/utils/loading'

const CredentialInfo: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory(),
    form = useRef<any>(),
    [dataTokenFactory, setDataTokenFactory] = useState(''),
    // [paramsData, setParams] = useState<any>({}),
    { walletConfig } = props.state,
    { location } = props,
    { dataTokenId, metaDataId, metaDataName, dataId } = location.state,
    [loading, setLoading] = useState(false),
    submiting = useRef(false)

  const initialState: any = useRef()

  const release = async (params) => {
    const { wallet } = props.state.wallet || {}

    try {
      const { web3 } = wallet
      setLoading(true)
      submiting.current = true
      // 1 获取地址
      const flag = await wallet.eth.isConnected()//判断是否连接当前网络
      if (!flag) return
      const address = await wallet.connectWallet(walletConfig)
      if (!address) {
        return message.error(t('common.pleaseSwitchNetworks'))
      }
      //构建合约
      const myContract = new web3.eth.Contract(
        ABIJson,
        dataTokenFactory,
      );
      const nonce = await web3.eth.getTransactionCount(address[0])

      //发起交易
      await myContract.methods.createToken(
        params.name,
        params.symbol,
        String(params.initialSupply + Complement),
        String(params.initialSupply + Complement),
        metaDataId
      ).send({
        from: address[0]
      }).on('transactionHash', function (hash) {
        sendTransactionData(params, nonce, hash)
      })


    } catch (e) {
      message.warning(t('tip.operationFailed'))
      setLoading(false)
      submiting.current = false
    }
  }

  const submit = async () => {
    form.current.validateFields().then(values => {
      release(values)
    })
  }


  useEffect(() => {
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
      "metaDataId": dataId,//metaDataId,
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

  const query = (id) => {
    // if (!id) {
    //   history.push({
    //     pathname: '/voucher/NoAttribute'
    //   })
    // }
    if (!id) return
    voucher.queryDataTokenStatus({
      "id": +id || null
    }).then(res => {
      const { data } = res
      if (data?.status == 3) {
        setLoading(false)
        localStorage.setItem('metaDataId', '')
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
      } else if (data?.status == 2) {
        setLoading(false)
        submiting.current = false
        message.error(t('center.voucherPublishingFailed'))
      } else {
        timeOut(id)
      }
    })
  }

  useEffect(() => {
    const data = localStorage.getItem('metaDataId')
    if (data) {
      submiting.current = true
      setLoading(true)
      query(data)
    }
  }, [])



  return <div className='credential-info-seting'>
    <Card className='details-top-box layout-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('center.dataName')}：{metaDataName}</p>
          <p>{t('center.metaDataID')}：{metaDataId}</p>
        </div>
      </div>
      <div className='speed-progress'>
        <img src={stepone} alt="" />
      </div>
      <Form
        ref={form}
        colon={false}
        size={"large"}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        <p className='title'>{t('voucher.CredentialName')}</p>
        <Form.Item
          label={t('voucher.Name')}
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              validator: (rule, value, callback): any => {
                if (value.length < 2) return callback(t('common.inputValueminlength'))
                return /^[A-Za-z0-9]+$/.test(value) ? callback() : callback(t('voucher.OnlyLettersNumbersEntered'));
              },
            },
            // { required: true, message: `${t('voucher.RequiredName')}` }
          ]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label={t('voucher.Symbol')}
          name="symbol"
          rules={[
            {
              required: true,
              validator: (rule, value, callback): any => {
                if (value.length < 2) return callback(t('common.inputValueminlength'))
                return /^[A-Za-z0-9]+$/.test(value) ? callback() : callback(t('voucher.OnlyLettersNumbersEntered'));
              },
            },
            // { required: true, message: `${t('voucher.RequiredSymbol')}` }
          ]}
        >
          <Input maxLength={64} minLength={2} />
        </Form.Item>
        <p className='title'>{t('voucher.CirculationTotal')}:</p>
        <Form.Item
          labelAlign="left"
          label={t('voucher.Circulation')}
          name="initialSupply"
          rules={[
            {
              pattern: new RegExp(/^[1-9]\d*$/, "g"),
              message: `${t('common.pleaseEnterNumber')}`
            },
            { required: true, message: `${t('voucher.RequiredCirculation')}` }]}
        >
          <Input maxLength={18} minLength={2} />
        </Form.Item>
        <p className='title'>{t('voucher.DescriptionTitle')}</p>
        <Form.Item
          labelAlign="left"
          label={t('voucher.DescriptionValue')}
          name="DescriptionValue"
        >
          <Input.TextArea maxLength={200} rows={4} showCount />
        </Form.Item>
      </Form>


      <div className='exchange-button'>
        <Button className='but' onClick={() => history.go(-1)}>{t('common.return')}</Button>
        <Button type="primary" className="but" loading={loading} onClick={submit}>{t('voucher.PublishCredential')}</Button>
      </div>
    </Card>
  </div>
}

export default connect((state: any) => ({ state }))(CredentialInfo)  