import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, InputNumber, message, Row, Tooltip } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { voucher } from '@api'
import { QuestionCircleOutlined } from '@ant-design/icons'
import ERC721Factory from '@/utils/erc721/ERC721Factory.json'
import { Complement, filterWeb3Code, filterIntegerAmount } from '@/utils/utils'
import { requestCancel } from '@/utils/loading'

const AttributedPublishing: FC<any> = (props: any) => {

  const { t, i18n } = useTranslation();
  const history = useHistory();
  const form = useRef<any>();
  const [factoryAddress, setDataTokenFactory] = useState('');
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
        ERC721Factory,
        factoryAddress,
      );
      const nonce = await web3.eth.getTransactionCount(address[0])

      // 发起交易
      await myContract.methods.deployERC721Contract(
        'Datum-' + params.name,
        params.symbol,
        metaDataId,
        3 //明文设置1，为密文设置2，为明文和密文支持设置3
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
    const data = localStorage.getItem('AttributemetaDataDbId')
    console.log(data, dataId);

    if (data && (data === dataId)) {
      submiting.current = true
      setLoading(true)
      query(data)
    }
    if (data && (data !== dataId)) {
      localStorage.setItem('AttributemetaDataDbId', '')
    }

    if (!dataId) history.go(-1)
    voucher.queryPublishConfig({
      "dataTokenId": dataTokenId || ''
    }).then(res => {
      const { data } = res
      if (data?.factoryAddress) {
        setDataTokenFactory(data.factoryAddress)
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
    voucher.postAttributeTransaction({
      "hash": hash,
      "metaDataDbId": dataId,// metaDataId,
      "name": 'Datum-' + params.name,
      "symbol": params.symbol,
      owner: address,
      nonce
    }).then(res => {
      const { data, status } = res
      if (status === 0) {
        localStorage.setItem('AttributemetaDataDbId', data)
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

    voucher.queryAttributeTokenStatus({
      "id": +id || null
    }).then(async (res) => {
      const { data } = res

      form.current.setFieldsValue({
        name: data.name ? data.name.replace('Datum-', '') : '',
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
          localStorage.setItem('AttributemetaDataDbId', '')
          submiting.current = false
          history.push({
            // pathname: '/voucher/AttributeCredential/credentialInventory',
            pathname: '/voucher/AttributeCredential',
            state: {
              dataAddress: data.address,
              name: data.name.replace('Datum-', ''),
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

export default connect((state: any) => ({ state }))(AttributedPublishing)