import { FC, useEffect, useState } from 'react'
import { Button, Card, Input, message, Spin, Tooltip } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Big from 'big.js'
import stepTwo from '@assets/images/voucher/step_two.svg'
import exchange from '@assets/images/voucher/exchange.svg'
import warning from '@assets/images/voucher/warning.svg'
import { voucher } from '@api'
import ABIJson from '@/utils/DipoleRouter.json'// dex
import ERC20 from '@/utils/ERC20.json'// 恒涛提供
import { Complement,filterWeb3Code } from '@/utils/utils'

const PriceSeting: FC<any> = (props: any) => {
  const { t } = useTranslation();
    const history = useHistory();
    const [routerToken, setRouterToken] = useState('');
    const [latValue, setLatValue] = useState('');
    const [mtsValue, setMstValue] = useState('');
    // [spinning, setSpinning] = useState(false),
    const [submting, setSubmting] = useState(false);
    const { walletConfig } = props.state;
    const { location } = props;
    const {
      dataAddress, name,
      dataTokenId, total,
      symbol
    } = location.state


  const divFn = (type?) => {
    if (BigInt(mtsValue) <= BigInt(0) || BigInt(latValue) <= BigInt(0)) return ''
    let value: string = type ? new Big(mtsValue).div(latValue).toFixed(8) : new Big(latValue).div(mtsValue).toFixed(8)
    value = value.replace(/(?:.0*|(.\d+?)0+)$/, '$1')
    return value
  }

  const toAuthorization = async (web3, address) => {
    const contract = new web3.eth.Contract(      // 构建 数据 合约 
      ERC20,
      dataAddress
    );
    const amound = await contract.methods.allowance(
      address,
      routerToken
    ).call()
    console.log(amound)
    if (amound > 0) return

    await contract.methods.approve( // 数据凭证授权
      routerToken,
      total
    ).send({ from: address })
  }


  const release = async () => {
    const { wallet } = props.state.wallet || {}
    try {
      const { web3 } = wallet
       
      const flag = await wallet.eth.isConnected()// 判断是否连接当前网络
      if (!flag) return
      // 1 获取地址
      
      const address = await wallet.connectWallet(walletConfig)
      // debugger
      if (!address) {
        return message.warning(t('common.pleaseSwitchNetworks'))
      }
      console.log('123123123',address&& address[0]);
      
      const balance = await web3.eth.getBalance(address[0])
      if (BigInt(balance) < BigInt(latValue + Complement)) {
        return message.warning(t('common.currentWalletInsufficient'))
      }

      //  数据授权
      // setSpinning(true)
      setSubmting(true)
      await toAuthorization(web3, address[0])
      //  构建合约
      const myContract = new web3.eth.Contract(
        ABIJson,
        routerToken,
      );

      //  获取nonce
      const nonce = await web3.eth.getTransactionCount(address[0])

      // setSpinning(false)
      //  ERC20 合约的方法签名
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
      // 发起交易

      const contract = await myContract.methods.addLiquidityETH(
        dataAddress,
        mtsValue + Complement,// 兑换的值
        mtsValue + Complement,
        latValue + Complement,
        address[0],// 主账号 mainAddress
        Date.now() + 1200000 // 区块时间+20分钟
      )

      const gas = await contract.estimateGas({
        from: address[0],
        value: latValue + Complement,
      }).catch(err => console.log(err))
      const gasPrice = await web3.eth.getGasPrice()
      await contract.send({
        from: address[0],
        value: latValue + Complement,// let
        gas,
        gasPrice,
      }).on('transactionHash', (hash) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        sendTransactionData(nonce, hash)
      })
    } catch (e:any) {
      setSubmting(false)
      // setSpinning(false)
      message.error(t(`exception.${filterWeb3Code(e.code)}`))
      console.log('发起交易失败', e)
      // message.warning(t('tip.operationFailed'))
    }
  }


  const submit = async () => {
    const totalNum = total.replace(Complement, '')
    if (BigInt(totalNum) < BigInt(mtsValue)) {
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
        setSubmting(false)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        goNoAttribute('type')
      }
    }).catch(() => setSubmting(false))
  }

  const goNoAttribute = (type?) => {
    history.push({
      pathname: '/voucher/NoAttribute',
      state: {
        attributeType: type == 'type' ? 'Un' : '',
      },
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
    {/* <Spin wrapperClassName="wrap-spin" tip={t('common.dataAuthProgress')} spinning={spinning}> */}
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
          <Tooltip placement="top" title={symbol}>
            <p className='price-type-title'>{symbol}</p>
          </Tooltip>
          <p className='price-secondary-title'>{t('voucher.Circulation')}：{total && total.replace(Complement, '') || ''}</p>
          <div className='price-type-input'>
            <span>{t('voucher.Add')}</span>
            <Input value={mtsValue} onChange={v => setMstValue(String(v.target.value).replace(/\D/g, ''))} maxLength={18} />
          </div>
        </div>
      </div>
      <div className='price-exchange-tips'>
        <img src={warning} alt="" />
        <div>
          <p>{t('voucher.InitialPrice')}：{mtsValue && mtsValue ? 1 : 0} {symbol} = {divFn() || 0} LAT ； {latValue && mtsValue ? 1 : 0} LAT = {divFn('rate') || 0} {symbol} </p>
          <p>{t('voucher.InitialPriceTips')}.</p>
        </div>
      </div>
      <div className='exchange-button'>
        <Button className='but' onClick={goNoAttribute}>{t('common.return')}</Button>
        <Button type="primary" className="but _submit"
          disabled={!(latValue && mtsValue)}
          loading={submting}
          onClick={submit}>{t('voucher.Confirm')}</Button>
      </div>
    </Card>
    {/* </Spin> */}
  </div>
}

export default connect((state: any) => ({ state }))(PriceSeting)