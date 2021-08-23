import { useTranslation } from 'react-i18next'
import Nav from './Nav'
import logoSvg from '../../assets/images/4.logo.svg'

const SideBar = (props: any) => {
  const { t } = useTranslation()
  return (
    <div className="side-box">
      <div className="logo">
        <img src={logoSvg} alt="" />
      </div>
      <div className="sys-name">{t('login.RosettaNet')}</div>
      <div className="menu-box">
        <Nav list={props.list} />
      </div>
    </div>
  )
}

export default SideBar
