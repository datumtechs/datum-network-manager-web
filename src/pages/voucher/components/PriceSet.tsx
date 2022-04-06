import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Input } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import stepTwo from '@assets/images/voucher/step_two.svg'
import exchange from '@assets/images/voucher/exchange.svg'
import warning from '@assets/images/voucher/warning.svg'
import ABIJson from '@/utils/DipoleRouter.json'
import ERC20 from '@/utils/ERC20.json'
import { connect } from 'react-redux'

const PriceSeting: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory(),
    dataToken = useState('0x38e5d728ccfa4be0849c249200820f6f68c13b0c'),
    routerToken = useState('0xef5bad1b4bc03df3b6d62fe914e145126a5ff80d')

  //数据授权 授权
  const toAuthorization = async (web3, address) => {

    try {

      const contract = new web3.eth.Contract(      //构建 数据 合约 
        ERC20,
        dataToken
      );

      const Auth = await contract.methods.approve( //数据凭证授权
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
      debugger
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
        '10000000000000000000',// 兑换的值
        '10000000000000000000',
        '10000000000000000000',
        address[0],//主账号 mainAddress
        Date.now() + 1200000 //区块时间+20分钟
      ).send({
        from: address[0],
        value: "10000000000000000000",//let
        nonce: 0
      }).on('transactionHash', function (hash) {
        console.log('d', hash)
      })

      console.log('contract', contract)

    } catch (e) {
      console.log('发起交易', e)
    }
  }

  return <div className='price-seting'>
    <Card className='details-top-box layout-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('voucher.VoucherName')}：XXXX名称（XX符号）</p>
          <p>{t('voucher.ContractAddress')}：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </div>
      </div>
      <div className='speed-progress'>
        <img src={stepTwo} alt="" />
      </div>
      <p className='price-exchange-title'>{t('voucher.PleaseSetPriced')}：</p>
      <div className='price-exchange'>
        <div className='price-lat'>
          <p className='price-type-title'>Lat</p>
          <div className='price-type-input'>
            <span>{t('voucher.Add')}</span>
            <Input />
          </div>
        </div>
        <div className='price-icon'>
          <img src={exchange} alt="" />
        </div>
        <div className='price-mtstk'>
          <p className='price-type-title'>MTSTK-618</p>
          <p className='price-secondary-title'>{t('voucher.Circulation')}：XXX</p>
          <div className='price-type-input'>
            <span>{t('voucher.Add')}</span>
            <Input />
          </div>
        </div>
      </div>
      <div className='price-exchange-tips'>
        <img src={warning} alt="" />
        <div>
          <p>{t('voucher.InitialPrice')}：1 MTSTK-618 = XXX LAT ； 1 LAT = XXX MTSTK-618. </p>
          <p>{t('voucher.InitialPriceTips')}.</p>
        </div>
      </div>
      <div className='exchange-button'>
        <Button className='but' onClick={() => history.go(-1)}>{t('common.return')}</Button>
        <Button type="primary" className="but" onClick={submit}>{t('voucher.Confirm')}</Button>
      </div>
    </Card>
  </div>
}

export default connect((state: any) => ({ state }))(PriceSeting)