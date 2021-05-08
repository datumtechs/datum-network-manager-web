import { useTranslation } from 'react-i18next';
import Nav from './Nav'
import cnSvg from '../../assets/images/2.icon_cn.svg'
import enSvg from '../../assets/images/2.icon_en.svg'

const Header = (porps: any) => {
  const { t, i18n } = useTranslation()
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  }

  return <div className="header-box">
    <div className="logo" >{t('login.RosettaNet')}</div>
    <div className="nav">
      <Nav list={porps.list} />
    </div>
    <div className="menu">
      <p className="company">XXX company</p>
      <p className="lang-btn pointer" onClick={changeLanguage}>
        {i18n.language === 'en' ? <img src={cnSvg} alt="" /> : <img src={enSvg} alt="" />}
      </p>
      <p className="logout pointer">{t('login.logout')}</p>
    </div>
  </div >
}
export default Header