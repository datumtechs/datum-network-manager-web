import { Button, message, Spin } from 'antd'
import { useState, useEffect, useRef, } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { loginApi } from '@api/index'
import { connect } from 'react-redux'
import { filterWeb3Code } from '@utils/utils'
import { LoadingOutlined } from '@ant-design/icons'

import representativeType from '@assets/images/login/representative-type.png'
import en from '@assets/images/login/en.png'
import ch from '@assets/images/login/ch.png'
import CHHover from '@assets/images/login/CHHover.png'
import ENHover from '@assets/images/login/ENHover.png'
import samurai1 from '@assets/images/login/samurai-1.svg'
import samurai2 from '@assets/images/login/samurai-2.svg'
import metamask from '@assets/images/login/metamask-fox.svg'
import logoSvg from '../../assets/images/logo.png'

import './index.scss'

const mapDispatchToProps = (dispatch: any) => ({
  InfoCompleteness: (data) => {
    dispatch({
      type: 'INFO_COMPLETENESS',
      data
    })
  },
  setAddress: (data) => {
    dispatch({
      type: 'SET_ADDRESS',
      data
    })
  },
  setWalletConfig: (data) => {
    dispatch({
      type: 'SET_WALLETCONFIG',
      data
    })
  },
  loginInfo: (data) => {
    dispatch({
      type: 'LOGININFO',
      data
    })
  }
})




const Login = (props: any) => {
  const history = useHistory();
  const { hash } = history.location;
  const { t, i18n } = useTranslation();
  const [languageHover, setLanguageHover] = useState(false)
  const isClick: any = useRef(false)
  const [loading, setLoading] = useState(false)


  const fromPathAry = hash.replace(/#/, '')?.split('/');
  let redirectPath
  if (fromPathAry.length > 2) {
    redirectPath = `/${fromPathAry[1]}/${fromPathAry[2]}`
  } else {
    redirectPath = hash.replace(/#/, '')
  }


  const changeLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  const queryToken = (e: any) => loginFn()
  const loginFn = async () => {
    const { wallet } = props.state.wallet || {};
    const { walletConfig } = props.state
    if (isClick.current) return
    isClick.current = true
    try {
      // 1 获取地址
      setLoading(true)
      const address = await wallet.connectWallet(walletConfig)
      if (!address) return message.error(t('common.pleaseSwitchNetworks')), isClick.current = false, setLoading(false)
      const { data } = await loginApi.queryNonce()// 2获取 nonceId 
      const sign = await wallet.signForWallet('login', address[0], data.nonce) // 3获取签名  sign
      if (!sign) return isClick.current = false, setLoading(false)

      const loginInfo = await loginApi.loginFn({ // 4 登录
        address: address[0],
        sign,
        signMessage: wallet._getAbiForLogin(data.nonce)
      })
      setLoading(false)
      props.setAddress(address[0])
      headLoginParams(loginInfo)
    } catch (error: any) {
      isClick.current = false
      setLoading(false)
      message.error(t(`exception.${filterWeb3Code(error.code)}`))
    }
  }

  const headLoginParams = (data: any) => {
    const { status } = data
    const { isAdmin,
      orgInfoCompletionLevel,
      connectNetworkStatus
    } = data.data || {}
    // const orgInfoCompletionLevel = 2
    //   connectNetworkStatus = 0
    if (status !== 0) return isClick.current = false
    if (!+isAdmin && connectNetworkStatus < 1) {// 是否是管理员，0-否，1-是'
      message.warning(`${t('login.loginTips')}`)
      isClick.current = false
      return
    }
    props.InfoCompleteness({
      orgInfoCompletionLevel,// , //组织信息完善情况1,2,3,4,5
      connectNetworkStatus,// //0 未入网  1已入网 99 已退网
    })
    props.loginInfo(data.data)
    isClick.current = false
    if (+connectNetworkStatus < 5) {
      history.push({ pathname: '/didApplication', })
    } else if (redirectPath && redirectPath !== '/login') {
      history.push(redirectPath)
    } else {
      history.push('/')
    }
  }


  const queryConfig = () => {
    loginApi.queryConfig().then((res: any) => {
      const { data } = res
      if (data.length) {
        const obj: any = {}
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        data && data.forEach((v: any) => {
          switch (v.key) {
            case 'chain_name':
              obj.chain_name = v.value;
              break;
            case 'chain_id':
              obj.chain_id = +v.value // 210309//v.value;
              break;
            case 'rpc_url':
              obj.rpc_url = v.value // 'https://10.1.1.51:6789'//v.value;
              break;
            case 'symbol':
              obj.symbol = v.value;
              break;
            case 'block_explorer_url':
              obj.block_explorer_url = v.value // 'https://uatscan.platon.network:1443/'//v.value;
              break;
            default:
              break;
          }
        });
        props.setWalletConfig({ ...obj })
      }
    })
  }

  useEffect(() => {
    queryConfig()
  }, [])



  return (
    <div className="login-box">
      <div className="login-form-box" >
        <img className='logo' src={logoSvg} alt="" />
        <div className='datum-left'>
          <div style={{ height: '125px' }}>
            <div className='datum-name'>{t('login.RosettaNet')}</div>
            <p>{t('login.loginSlogan')}</p>
          </div>
          <img className='representative-type' src={representativeType} alt="" />
        </div>
        <div className="form-box ">
          <div className='form-top'>
            <div className="connector-title">Metamask {t('login.extension')}</div>
            <div className="switch-lang pointer" onClick={changeLanguage}>
              <div onMouseMove={() => setLanguageHover(true)} onMouseLeave={() => setLanguageHover(false)}>
                {languageHover ?
                  i18n.language === 'en' ? <img src={ch} alt="" /> : <img src={en} alt="" />
                  :
                  i18n.language === 'en' ? <img src={CHHover} alt="" /> : <img src={ENHover} alt="" />
                }
              </div>
            </div>
          </div>


          {props.state.wallet.wallet ?
            <div className='plug-in-list'>
              <div onClick={queryToken} className="connector-block">
                <img src={metamask} alt="samurai" className="icon" />
                <span className="text">{loading ? <LoadingOutlined /> : 'Metamask'}</span>
              </div>
            </div>
            :
            <div className="samurai-box">
              <div className="samurai-line">
                <img src={samurai1} alt="" className="samurai-icon" />
                <p>{t('wallet.tip1')}</p>
              </div>
              <div className="samurai-line">
                <img src={samurai2} alt="" className="samurai-icon" />
                <p>{t('wallet.tip2')}</p>
              </div>
              <Button type="primary" className="install-btn" onClick={() => window.open(`https://devdocs.platon.network/docs/${i18n.language !== 'en' ? 'zh-CN' : 'en'}/MetaMask`)}>{t('login.install')}</Button>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default connect((state: any) => ({ state }), mapDispatchToProps)(Login)
