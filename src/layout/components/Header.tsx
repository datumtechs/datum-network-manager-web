import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import Nav from './Nav'
import cnSvg from '../../assets/images/2.icon_cn.svg'
import enSvg from '../../assets/images/2.icon_en.svg'

const Header = (props: any) => {
  const { t, i18n } = useTranslation()
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  }

  const switchLogin = () => {
    props.sendAction()
    console.log(props);

  }

  return <div className="header-box">
    <div className="logo" >{t('login.RosettaNet')}</div>
    <div className="nav">
      <Nav list={props.list} />
    </div>
    {props.state.indexReducer.isLogin}
    <div className="menu">
      <p className="company">XXX company</p>
      <p className="lang-btn pointer" onClick={changeLanguage}>
        {i18n.language === 'en' ? <img src={cnSvg} alt="" /> : <img src={enSvg} alt="" />}
      </p>
      <p className="logout pointer" onClick={switchLogin}>{t('login.logout')}</p>
    </div>
  </div >
}

const mapStateToProps = (state: any) => ({ state })


const mapDispatchToProps = (dispatch: any) => (
  {
    sendAction: () => {
      dispatch({
        type: 'LOGIN'
      })
    }
  }
)
// export default Header
export default connect(mapStateToProps, mapDispatchToProps)(Header);