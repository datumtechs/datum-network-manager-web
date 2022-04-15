import { FC, useEffect, useState } from 'react'
import { Button, Card, Input, message, Spin } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Big from 'big.js'
import stepTwo from '@assets/images/voucher/step_two.svg'
import exchange from '@assets/images/voucher/exchange.svg'
import warning from '@assets/images/voucher/warning.svg'
import ABIJson from '@/utils/DipoleRouter.json'//dex
import ERC20 from '@/utils/ERC20.json'//恒涛提供
import { voucher } from '@api'

const PriceSeting: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory(),
    [routerToken, setRouterToken] = useState(''),
    [latValue, setLatValue] = useState('1'),
    [mtsValue, setMstValue] = useState('1'),
    [spinning, setSpinning] = useState(false),
    { walletConfig } = props.state,
    { location } = props,
    {
      dataAddress,
      name, dataTokenId, total } = location.state

  // const dataAddress = '0x38e5d728ccfa4be0849c249200820f6f68c13b0c',
  // routerToken = '0xef5bad1b4bc03df3b6d62fe914e145126a5ff80d'
  const fomatFloat = function (value, n) {
    var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    var s = f.toString();
    return s;
  }

  const rate = () => {
    if (!!!mtsValue) return ''
    let value: string | number = parseFloat(new Big(BigInt(mtsValue)).div(BigInt(latValue)))
    value = fomatFloat(value, 8)
    return value
  }

  const divFn = () => {
    if (!!!mtsValue) return ''
    let value: string | number = parseFloat(new Big(BigInt(latValue)).div(BigInt(mtsValue)))
    value = fomatFloat(value, 8)
    return value
  }

  //数据授权 授权
  const toAuthorization = async (web3, address) => {
    try {
      const contract = new web3.eth.Contract(      //构建 数据 合约 
        ERC20,
        dataAddress
      );
      await contract.methods.approve( //数据凭证授权
        routerToken,//像合约数据凭证授权
        '90000000000000000000'
      ).send({ from: address })
    } catch (e) {
      console.log('合约授权失败', e)
      setSpinning(false)
    }
  }


  const release = async () => {
    const { wallet } = props.state.wallet || {}
    try {
      const { web3 } = wallet

      // 1 获取地址
      const flag = await wallet.eth.isConnected()//判断是否连接当前网络
      if (!flag) return
      const address = await wallet.connectWallet(walletConfig)
      //数据授权
      setSpinning(true)
      // debugger
      await toAuthorization(web3, address[0])

      //构建合约
      const myContract = new web3.eth.Contract(
        ABIJson,
        routerToken,
      );

      //获取nonce
      const nonce = await web3.eth.getTransactionCount(address[0])

      setSpinning(false)
      //ERC20 合约的方法签名
      /**
       * function addLiquidityETH(
       *   address token,
       *   uint amountTokenDesired,
       *   uint amountTokenMin,
       *   uint amountETHMin,
       *   address to,
       *   uint deadline
       * ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
       */
      const params = [

      ]

      //发起交易
      const contract = await myContract.methods.addLiquidityETH(
        dataAddress,
        '10000000000000000000',//mtsValue + '000000000000000000',// 兑换的值
        '10000000000000000000',//mtsValue + '000000000000000000',
        '1000000000000000000',//latValue + '000000000000000000',
        address[0],//主账号 mainAddress
        Date.now() + 1200000 //区块时间+20分钟
      )
      // const encodeABI = await contract.encodeABI();
      // const gas = await web3.eth.estimateGas({
      //   to: address[0],
      //   data: encodeABI
      // })
      //@ts-ignore
      window.apple = myContract
      await contract.send({
        from: address[0],
        value: '1000000000000000000',//latValue + '000000000000000000',//let
        gas: '3500000',
        // nonce: 0,
      }).on('transactionHash', function (hash) {
        sendTransactionData(nonce, hash)
      }).on('error', function (error) {
        console.log(error)
      })

    } catch (e) {
      setSpinning(false)
      console.log('发起交易失败', e)
    }
  }


  const submit = async () => {
    if (BigInt(total) < BigInt(mtsValue)) {
      message.warning(t('voucher.hasExceeded'))
      return
    }
    release()
  }
  const sendTransactionData = (nonce, hash) => {
    voucher.postdDataTokenUp({
      "dataTokenId": dataTokenId,
      "hash": hash,
      nonce
    }).then(res => {
      const { data, status } = res
      if (status === 0) {
        history.push({
          pathname: '/voucher/NoAttribute',
          state: {
            attributeType: 'Unpriced',
          },
        })
      }
    })
  }


  useEffect(() => {
    voucher.getUpConfig().then(res => {
      const { data } = res
      if (data.routerToken) {
        setRouterToken(data.routerToken)
      }
    })
  }, [])

  return <div className='price-seting'>
    <Spin wrapperClassName="wrap-spin" tip={t('common.dataAuthProgress')} spinning={spinning}>
      <Card className='details-top-box layout-box'>
        <div className='details-name-box'>
          <div className='address'>
            <p>{t('voucher.VoucherName')}：{name}</p>
            <p>{t('voucher.ContractAddress')}：{dataAddress}</p>
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
              <Input value={latValue} onChange={v => setLatValue(String(v.target.value).replace(/\D/g, ''))} maxLength={18} />
            </div>
          </div>

          <div className='price-icon'>
            <img src={exchange} alt="" />
          </div>
          <div className='price-mtstk'>
            <p className='price-type-title'>{name}</p>
            <p className='price-secondary-title'>{t('voucher.Circulation')}：{total}</p>
            <div className='price-type-input'>
              <span>{t('voucher.Add')}</span>
              <Input value={mtsValue} onChange={v => setMstValue(String(v.target.value).replace(/\D/g, ''))} maxLength={18} />
            </div>
          </div>
        </div>
        <div className='price-exchange-tips'>
          <img src={warning} alt="" />
          <div>
            <p>{t('voucher.InitialPrice')}：{mtsValue && mtsValue ? 1 : 0} {name} = {divFn() || 0} LAT ； {latValue && mtsValue ? 1 : 0} LAT = {rate() || 0} {name} </p>
            <p>{t('voucher.InitialPriceTips')}.</p>
          </div>
        </div>
        <div className='exchange-button'>
          <Button className='but' onClick={() => history.go(-1)}>{t('common.return')}</Button>
          <Button type="primary" className="but" onClick={submit}>{t('voucher.Confirm')}</Button>
        </div>
      </Card>
    </Spin>
  </div>
}

export default connect((state: any) => ({ state }))(PriceSeting)