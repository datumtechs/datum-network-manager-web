import { FC, useState, useRef } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Form, Input, message
} from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { loginApi } from '@api/index'
import { connect } from 'react-redux'
import { filterAmount } from '@/utils/utils'

const mapDispatchToProps = (dispatch: any) => ({
  setIsReg: (data) => {
    dispatch({
      type: 'SET_ISREG',
      data
    })
  }
})


const Recharge: FC<any> = (props) => {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)

  const onFinish = () => {
    setLoading(true)
    if (BigInt(props?.observeBalance) <= 0) {
      recharge()
    }

    loginApi.setDid({}).then(res => {
      if (res.status === 0) {
        props?.baseInfo?.fetchData()
        message.success(`${t('tip.idSuccess')}`)
        props.setIsReg(true)
        props.setCurrent(3)
        props.InfoCompleteness(3, 0)
      }
      setLoading(false)
    })
  }

  const recharge = async () => {
    const { wallet } = props.state.wallet || {}
    const { web3 } = wallet
    setLoading(true)
    if (!props?.baseInfo.observerProxyWalletAddress) return
    const address = await wallet.connectWallet(props?.state?.walletConfig)
    if (!address) {
      return message.error(t('common.pleaseSwitchNetworks'))
    }
    await web3.eth.sendTransaction({
      from: address[0],
      to: props?.baseInfo.observerProxyWalletAddress,
      value: "1000000000000000000"
    }).on('receipt', () => {
      props.getBalance()
      setLoading(false)
    }).on('error', () => {
      props.getBalance()
      setLoading(false)
    })
  }


  return <>
    <p className="title center set-your-org-name-title">
      {t('DidApplication.InitializeIdentity')}
    </p>
    <p className="identifier" style={{ 'paddingRight': '22%' }}>
      <ExclamationCircleFilled />
      {
        i18n.language === 'en' ? ` ID (did) is a decentralized identity user, which is used for data asset, workflow operation, liquidation and other links in the project And initialize identity
          The ID requires a built-in administrator wallet to pay a certain service fee. Please ensure that the wallet has a certain balance before initializing the ID`:
          ` 身份标识(did)是去中心化的身份用户, 用于项目中的数据资产化,工作流运行,清算等多个环节. 而初始化身份标识需要内置管理员钱包支付一定的手续费, 请确保初始化身份标识前钱包有一定的余额`
      }
    </p>
    <p className="identifier">
      <span className="lable"> {t('DidApplication.OrganizationBuiltAdministratorWallet')}：</span>
    </p>
    <p className="identifier">
      <span className="lable" style={{ width: '80px' }}> {t('DidApplication.Address')}：</span>
      <span className="content">{props?.baseInfo.observerProxyWalletAddress}</span>
    </p>
    <p className="identifier">
      <span className="lable" style={{ width: '80px' }}> {t('DidApplication.Balance')}：</span>
      <span className="content">{filterAmount(String(props?.observeBalance))}   {props?.state?.walletConfig?.symbol}</span>
      <Button loading={loading} type="primary" style={{ marginLeft: "30px" }} className="submit-btn submit-btn-flex" size="small" onClick={recharge}>
        {t('DidApplication.Recharge')}
      </Button>
    </p>
    <div className="btn center">
      <Button loading={loading} type="primary" className="submit-bt submit-btn-flex" style={{ minWidth: "120px" }} onClick={onFinish}>
        {t('DidApplication.SetYourOrgNameButton')}
      </Button>
    </div>
    <style>{`
    .ant-form-item-children-icon{
      display:none
    }
    `}</style>
  </>
}

export default connect((state: any) => ({ state }), mapDispatchToProps)(Recharge)
