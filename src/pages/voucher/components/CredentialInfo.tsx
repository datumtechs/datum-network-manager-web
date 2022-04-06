import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, InputNumber } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import stepone from '@assets/images/voucher/step_one.svg'
import ABIJson from '@/utils/DataTokenFactory.json'
import { voucher } from '@api'

const CredentialInfo: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory(),
    form = useRef<any>(),
    state = props.state,
    routerToken = '0xef5bad1b4bc03df3b6d62fe914e145126a5ff80d'

  const submit = async () => {
    const params = { name: "", symbol: "", cap: 1000000000, initialSupply: "10000000000000000000000000000", metaDataHash: "0xcee2802044e7850f9dfe2ec275d785353e74717c660d21d6219bf8fb3bd8cecc" }
    // form.current.validateFields().then(values => {
    //   console.log(values);

    // })
    const { wallet } = props.state.wallet || {}
    try {
      const { web3 } = wallet
      // 1 获取地址
      const flag = await wallet.eth.isConnected()//判断是否连接当前网络
      if (!flag) return
      const address = await wallet.connectWallet()
      //构建合约
      const myContract = new web3.eth.Contract(
        ABIJson,
        routerToken,
      );

      //获取nonce
      const nonce = await web3.eth.getTransactionCount(address[0])
      //发起交易
      const contract = await myContract.methods.createToken(
        params.name,
        params.symbol,
        params.cap,
        params.initialSupply,
        params.metaDataHash
      ).send({
        from: address[0]
      }).on('transactionHash', function (hash) {
        console.log('d', hash)
        sendTransactionData(params)
      })

      console.log('contract', contract)

    } catch (e) {
      console.log('发起交易', e)
    }
  }

  const sendTransactionData = (params) => {
    voucher.postTransaction({
      "desc": params.desc,
      "hash": params.hash,
      "metaDataId": params.metaDataId,
      "name": params.name,
      "symbol": params.symbol,
      "total": params.total
    }).then(res => {

    }).catch(err => {

    })
  }

  useEffect(() => {
    if (!state.id) return
    console.log(state.id)
    voucher.getPublishConfig({
      "dataTokenId": state.id
    }).then(res => {

    }).catch(err => {

    })
  }, [])



  return <div className='credential-info-seting'>
    <Card className='details-top-box layout-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('voucher.VoucherName')}：XXXX名称（XX符号）</p>
          <p>{t('voucher.ContractAddress')}：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
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
          name="voucherName"
          labelAlign="left"
          rules={[{ required: true, message: `${t('voucher.RequiredName')}` }]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label={t('voucher.Symbol')}
          name="Symbol"
          rules={[{ required: true, message: `${t('voucher.RequiredSymbol')}` }]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <p className='title'>{t('voucher.CirculationTotal')}:</p>
        <Form.Item
          labelAlign="left"
          label={t('voucher.Circulation')}
          name="Circulation"
          rules={[{ required: true, message: `${t('voucher.RequiredCirculation')}` }]}
        >
          <InputNumber decimalSeparator="0" min={1} max={999999999} />
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
        <Button type="primary" className="but" onClick={submit}>{t('voucher.PublishCredential')}</Button>
      </div>
    </Card>
  </div>
}

export default connect((state: any) => ({ state }))(CredentialInfo)  