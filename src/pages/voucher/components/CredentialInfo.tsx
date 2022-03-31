import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, InputNumber } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import stepone from '@assets/images/voucher/step_one.svg'
import Web3Utils, { toBech32Address, decodeBech32Address } from '@alayanetwork/web3-utils'
// import ABIJson from '@util/DipoleRouter.json'
import ABIJson from '../../../utils/DipoleRouter.json'
import ERC20 from '../../../utils/ERC20.json'
import { async } from 'q'

const CredentialInfo: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory(),
    form = useRef<any>(),
    dataToken = useRef('0xef63762d032c004df819ba6f029c767b030a891b'),
    routerToken = useRef('0x65c9e7689e6c1679053a98919533d4edd55989b7')

  //数据授权 授权
  const toAuthorization = async (web3, address) => {

    try {
      //构建 数据 合约 
      const contract = new web3.eth.Contract(
        ERC20,
        dataToken
      );

      //数据凭证授权
      const Auth = await contract.methods.approve(
        routerToken,//像合约数据凭证授权
        '90000000000000000000'
      ).send({ from: address })
    } catch (e) {
      console.log('合约授权', e)
    }
  }

  const submit = async () => {
    // debugger
    // form.current.validateFields().then(values => {
    //   console.log(values);

    // })
    const { wallet } = props.state.wallet || {}
    try {
      const { eth, web3 } = wallet
      // 1 获取地址
      const flag = await wallet.eth.isConnected()//判断是否连接当前网络
      if (!flag) return
      const address = await wallet.connectWallet()

      //数据授权
      await toAuthorization(web3, address[0])

      //构建合约
      const myContract = new web3.eth.Contract(
        ABIJson,
        routerToken,
      );

      //获取nonce
      const nonce = await web3.eth.getTransactionCount(address[0])
      console.log(nonce)
      //发起交易
      const contract = await myContract.methods.addLiquidityETH(
        dataToken,
        '10000000000000000000',//
        '10000000000000000000',
        '10000000000000000000',
        address[0],//主账号 mainAddress
        Date.now() + 1200000 //区块时间+20分钟
      ).send({
        from: address[0],
        value: "10000000000000000000",
        nonce: 0
      }).on('transactionHash', function (hash) {
        console.log('transactionHash', hash)
      })
      //   .on('confirmation', function (confirmationNumber, receipt) {
      //   console.log('confirmation', confirmationNumber, receipt)
      // }).on('receipt', function (receipt) {
      //   console.log('receipt', receipt)
      // })
      console.log('contract', contract)




      //  //数据凭证 0xef63762d032c004df819ba6f029c767b030a891b
      //  String dataToken = "lat1aa3hvtgr9sqym7qehfhs98rk0vps4zgmnsu8dt";

      //  //router合约 0x65c9e7689e6c1679053a98919533d4edd55989b7
      //  String routerToken = "lat1vhy7w6y7dst8jpf6nzge2v75ah24nzdha5zklr";

      //  //主账号 0xc115ceadf9e5923330e5f42903fe7f926dda65d2
      //  String mainAddress = "lat1cy2uat0eukfrxv897s5s8lnljfka5ewjtnrfhx";
      //  String mainPrivate = "0x03a4130e4abb887a296eb38c15bbd83253ab09492a505b10a54b008b7dcc1668";

      //console.log(toBech32Address('lat1', '0x65c9e7689e6c1679053a98919533d4edd55989b7'))//加密为lat
      //console.log(decodeBech32Address('lat1vhy7w6y7dst8jpf6nzge2v75ah24nzdha5zklr'))//解密为
      // const nonce = await web3.eth.getTransactionCount(address[0])
      // myContract.methods.addLiquidityETH(
      //   "0xef63762d032c004df819ba6f029c767b030a891b",//数据凭证  dataToken
      //   '10000000000000000000',
      //   '10000000000000000000',
      //   '10000000000000000000',
      //   address[0],//主账号 mainAddress
      //   Date.now() + 1200000 //区块时间
      // ).send({
      //   from: address[0],
      //   // to: "0x65c9e7689e6c1679053a98919533d4edd55989b7",//合约
      //   // nonce,
      //   // gasPrice: 10000000000,//燃料价格
      //   // gas: 210000,//燃料限制
      //   value: "10000000000000000000",
      // })

    } catch (e) {
      console.log('发起交易', e)
    }
  }



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