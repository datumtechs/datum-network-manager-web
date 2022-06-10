import { useContext, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Dropdown, Menu, Space, Input, Form, message } from 'antd'
import { loginApi, authApi } from '@api'
import cnSvg from '@assets/images/2.icon_cn.svg'
import enSvg from '@assets/images/2.icon_en.svg'
import menuSvg from '@assets/images/1.3.svg'
import { BaseInfoContext } from '../index'
import Bread from './Bread'


const Header = (props: any) => {
  const { loginInfo } = props.state.loginInfo
  const { orgInfo } = props.state.org || {}
  const { address } = props.state.address || {}
  const { t, i18n } = useTranslation()
  const baseInfo = useContext(BaseInfoContext)
  const { pathname } = useLocation()
  const history = useHistory()
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
    localStorage.setItem('i18n', i18n.language)
  }

  const switchLogin = () => {
    props.sendAction()
    props.setLoginInfo({})
  }

  const linkTo = (route) => {
    if (!props.state.isReg) {
      message.info(t(`common.plzApplyDid`))
      return
    }
    history.push(route)
  }
  const useAddressDisplay = (address: string) => {
    if (!address) return ''
    if (!address.startsWith('0x')) return address
    return address.substring(0, 4) + '...' + address.substring(address.length - 4)
  }

  const menu = (dom?) => <Menu className="personal-box">
    <Menu.Item key="name" className="personal-info-name"><img className="personal-info-head-portrait" src={menuSvg} />{useAddressDisplay(address)}</Menu.Item>
    {dom}
    <Menu.Item key="logout" className="personal-logout" onClick={switchLogin}>
      {t('login.logout')}
    </Menu.Item>
  </Menu>


  const [menus, setmenus] = useState(menu())
  const juris = (juris: string) => {
    const list = loginInfo?.resourceList || []
    return list.some(v => {
      return v.value == juris
    });
  }
  useEffect(() => {
    setmenus(menu(
      <>
        {juris('userCenter/Profile') ? <Menu.Item key="Profile" onClick={() => linkTo("/userCenter/Profile")}>{t('UserCenter.Profile')}</Menu.Item> : ""}
        {juris('userCenter/userInfo') ? <Menu.Item key="DatumIdentity" onClick={() => linkTo("/userCenter/userInfo")}>{t('UserCenter.DatumIdentity')}</Menu.Item> : ""}
        {juris('userCenter/updateAdmin') ? <Menu.Item key="updateAdmin" onClick={() => linkTo("/userCenter/updateAdmin")}>{t('UserCenter.updateAdmin')}</Menu.Item> : ""}
      </>
    ))
    console.log('语言辩护');
    
  }, [loginInfo,i18n.language])


  return (
    <>
      <div className={pathname === '/overview' ? 'main-head-box' : 'header-box '}>
        <div className="bread-box">
          <Bread />
        </div>
        <Space className="operation-box" size={20}>
          <div className="lang-btn pointer" onClick={changeLanguage}>
            {i18n.language === 'en' ? <img src={cnSvg} alt="" /> : <img src={enSvg} alt="" />}
          </div>
          <div className="pointer">
            <Dropdown overlay={ menus} placement="bottomRight" arrow>
              <div className='user-info'>
                <img src={menuSvg} alt="" />
                <span>{useAddressDisplay(address) || ''}</span>
              </div>
            </Dropdown>
          </div>
        </Space>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => ({ state })

const mapDispatchToProps = (dispatch: any) => ({
  sendAction: () => {
    dispatch({
      type: 'LOGOUT',
    })
  },
  setLoginInfo: (data) => {
    dispatch({
      type: 'LOGININFO',
      data
    })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
