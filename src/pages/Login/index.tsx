import { Button, message } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
// import MyWave from '@com/MyWave'
import { loginApi } from '@api/index'
import { connect } from 'react-redux'
// import loginIcon from '@assets/images/login/loginIcon.png'
import { useSpring, animated } from 'react-spring';
import { filterWeb3Code } from '@utils/utils'

import representativeType from '@assets/images/login/representative-type.png'
import en from '@assets/images/login/en.png'
import ch from '@assets/images/login/ch.png'
import CHHover from '@assets/images/login/CHHover.png'
import ENHover from '@assets/images/login/ENHover.png'
import samurai1 from '@assets/images/login/samurai-1.svg'
import samurai2 from '@assets/images/login/samurai-2.svg'
import metamask from '@assets/images/login/metamask-fox.svg'

import './index.scss'
// import logoSvg from '../../assets/images/logo1.svg'
import logoSvg from '../../assets/images/logo.png'

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
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { hash } = history.location;
  const fromPathAry = hash.replace(/#/, '')?.split('/');
  const [languageHover, setLanguageHover] = useState(false)
  const isClick: any = useRef(true)
  const isInit: any = useRef(true);
  const rippleEl: any = useRef(null);
  const [animatedData, setAnimatedData] = useState({ top: 0, left: 0, width: 0, height: 0 });
  let redirectPath
  if (fromPathAry.length > 2) {
    redirectPath = `/${fromPathAry[1]}/${fromPathAry[2]}`
  } else {
    redirectPath = hash.replace(/#/, '')
  }
  const rippleAnim: any = useSpring({
    from: {
      ...animatedData,
      transform: 'scale(0)',
      opacity: 1
    },
    to: !isInit.current ? { opacity: 0, transform: 'scale(2)' } : {},
    config: {
      duration: 300
    },
    reset: true
  });



  const headLoginParams = (data: any) => {
    const { status } = data
    const { isAdmin,
      orgInfoCompletionLevel,
      connectNetworkStatus
    } = data.data || {}
    // const orgInfoCompletionLevel = 0,
    //   connectNetworkStatus = 0
    if (status !== 0) return
    if (!+isAdmin && connectNetworkStatus < 1) {// 是否是管理员，0-否，1-是'
      message.warning(`${t('login.loginTips')}`)
      return
    }

    props.InfoCompleteness({
      orgInfoCompletionLevel,// , //组织信息完善情况0 带申请  1 待完善 2 完成
      connectNetworkStatus,// //0 未入网  1已入网 99 已退网
    })
    props.loginInfo(data.data)
    console.log(redirectPath, data.data);

    if (+connectNetworkStatus < 1) {
      history.push({ pathname: '/didApplication', })
    } else if (redirectPath && redirectPath !== '/login') {
      history.push(redirectPath)
    } else {
      history.push('/')
    }
  }


  const loginFn = async () => {
    const { wallet } = props.state.wallet || {};
    const { walletConfig } = props.state
    try {
      // 1 获取地址
      const address = await wallet.connectWallet(walletConfig)
      if (!address) {
        return message.error(t('common.pleaseSwitchNetworks'))
      }
      const { data } = await loginApi.queryNonce()// 2获取 nonceId 
      const sign = await wallet.signForWallet(// 3获取签名  sign
        'login', address[0], data.nonce)
      if (!sign) return

      const loginInfo = await loginApi.loginFn({ // 4 登录
        address: address[0],
        sign,
        signMessage: wallet._getAbiForLogin(data.nonce)
      })

      console.log(isClick)

      props.setAddress(address[0])
      headLoginParams(loginInfo)
      isClick.current = true
      isInit.current = true
    } catch (error: any) {
      console.log(error)
      message.error(t(`exception.${filterWeb3Code(error.code)}`))
      isInit.current = true
      isClick.current = true
    }
  }

  const queryToken = (e: any) => {
    if (!isClick.current) return
    const event: any = e
    console.log(isClick)
    isInit.current = false
    isClick.current = false
    const parentEl = rippleEl.current.parentElement;
    const size = Math.max(parentEl.offsetWidth, parentEl.offsetHeight);
    setAnimatedData({
      width: size,
      height: size,
      top: event.y - size / 2 || 0,
      left: event.x - size / 2 || 0
    });
    loginFn()
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





  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  }

  return (
    <div className="login-box">
      {/* <MyWave /> */}
      <div className="login-form-box" >
        {/* <img className='logo' src={loginIcon} alt="" /> */}
        <img className='logo' src={logoSvg} alt="" />
        <div className='datum-left'>
          <div style={{
            height: '125px',
            // 'wordSpacing': i18n.language == 'en' ? '5px' : '',
            // letterSpacing: i18n.language == 'en' ? '0' : '5px',
          }}>
            <div className='datum-name'>{t('login.RosettaNet')}</div>
            <p>{t('login.loginSlogan')}</p>
          </div>
          <img className='representative-type' src={representativeType} alt="" />
        </div>
        <div className="form-box">
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
                <animated.span
                  className="g-ripple"
                  style={rippleAnim}
                  ref={rippleEl}
                ></animated.span>
                <img src={metamask} alt="samurai" className="icon" />
                <span className="text">Metamask</span>
              </div>
              {/* <div className='login-remarks'>
                {t('login.loginRemarks')}
              </div> */}
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
