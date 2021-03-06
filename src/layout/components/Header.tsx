import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import Nav from './Nav'
import cnSvg from '../../assets/images/2.icon_cn.svg'
import enSvg from '../../assets/images/2.icon_en.svg'
import { BaseInfoContext } from '../index'
import { loginApi } from '../../api'

const Header = (props: any) => {
  const { t, i18n } = useTranslation()
  const baseInfo = useContext(BaseInfoContext)

  const history = useHistory()
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
    localStorage.setItem('i18n', i18n.language)
  }

  const linkToHome = () => {
    if (!baseInfo?.identityId) {
      return history.push('/didApplication')
    }
    return history.push('/overview')
  }

  const switchLogin = () => {
    props.sendAction()
    loginApi.logoutFn().then(res => {
      if (res.status === 0) history.push('/login')
    })
  }
  const showMessage = () => {
    console.log('TODO message style')
  }
  return (
    <div className="header-box">
      <div className="logo pointer" onClick={linkToHome}>
        {t('login.RosettaNet')}
      </div>
      <div className="nav">
        <Nav list={props.list} />
      </div>
      <div className="menu">
        <p className="company" onClick={showMessage}>
          {baseInfo?.name}
        </p>
        <p className="lang-btn pointer" onClick={changeLanguage}>
          {i18n.language === 'en' ? <img src={cnSvg} alt="" /> : <img src={enSvg} alt="" />}
        </p>
        <p className="logout pointer" onClick={switchLogin}>
          {t('login.logout')}
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ state })

const mapDispatchToProps = (dispatch: any) => ({
  sendAction: () => {
    dispatch({
      type: 'LOGOUT',
    })
  },
})
// export default Header
export default connect(mapStateToProps, mapDispatchToProps)(Header)
