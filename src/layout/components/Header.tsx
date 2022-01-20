import { useContext, useState, useRef } from 'react'
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
  const { orgInfo } = props.state.org
  const { t, i18n } = useTranslation()
  const baseInfo = useContext(BaseInfoContext)
  const { pathname } = useLocation()
  const history = useHistory()
  const formRef = useRef<any>(null)
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
    localStorage.setItem('i18n', i18n.language)
  }

  const switchLogin = () => {
    props.sendAction()
    loginApi.logoutFn().then(res => {
      if (res.status === 0) history.push('/login')
    })
  }

  const linkTo = (route) => {
    if (!props.state.isReg) {
      message.info(t(`common.plzApplyDid`))
      return
    }
    history.push(route)
  }


  const menu = () => {
    return (
      <Menu className="personal-box">
        <Menu.Item key="name" className="personal-info-name"><img className="personal-info-head-portrait" src={menuSvg} />{baseInfo?.name}</Menu.Item>
        <Menu.Item key="Profile" onClick={() => linkTo("/userCenter/Profile")}>{t('UserCenter.Profile')}</Menu.Item>
        <Menu.Item key="MetisIdentity" onClick={() => linkTo("/userCenter/userInfo")}>{t('UserCenter.MetisIdentity')}</Menu.Item>
        <Menu.Item key="logout" className="personal-logout" onClick={switchLogin}>
          {t('login.logout')}
        </Menu.Item>
      </Menu>
    )
  }

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
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <img src={menuSvg} alt="" />
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
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
