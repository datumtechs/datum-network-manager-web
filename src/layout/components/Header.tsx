import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Dropdown, Menu, Space, Input, Form, message } from 'antd'
import cnSvg from '@assets/images/2.icon_cn.svg'
import enSvg from '@assets/images/2.icon_en.svg'
import menuSvg from '@assets/images/1.3.svg'
import Bread from './Bread'
import { useAddressDisplay } from '@/utils/utils'


const Header = (props: any) => {
  const { loginInfo } = props.state.loginInfo
  const { address } = props.state.address || {}
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const history = useHistory()
  const authList = useRef<any>()
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


  const menu = (dom?) => <Menu className="personal-box">
    <Menu.Item key="name" className="personal-info-name"><img className="personal-info-head-portrait" src={menuSvg} />{useAddressDisplay(address)}</Menu.Item>
    {dom}
    <Menu.Item key="logout" className={authList.current?.length ? 'personal-logout' : 'personal-logout no-admin'} onClick={switchLogin}>
      {t('login.logout')}
    </Menu.Item>
  </Menu>


  const [menus, setmenus] = useState(menu())
  const juris = () => {
    const list = loginInfo?.resourceList || []
    const routes = [
      {
        name: 'userCenter/Profile',
        value: <Menu.Item key="Profile" onClick={() => linkTo("/userCenter/Profile")}>{t('UserCenter.Profile')}</Menu.Item>
      }, {
        name: 'userCenter/userInfo',
        value: <Menu.Item key="DatumIdentity" onClick={() => linkTo("/userCenter/userInfo")}>{t('UserCenter.DatumIdentity')}</Menu.Item>
      }, {
        name: 'userCenter/updateAdmin',
        value: <Menu.Item key="updateAdmin" onClick={() => linkTo("/userCenter/updateAdmin")}>{t('UserCenter.updateAdmin')}</Menu.Item>
      }
    ]
    return authList.current = routes.filter(v => list.some(item => item.value == v.name))
  }
  useEffect(() => {
    setmenus(menu(juris().map(v => v.value)))
  }, [loginInfo, i18n.language])


  return (
    <>
      <div className={'header-box '}>
        <div className="bread-box">
          <Bread />
        </div>
        <Space className="operation-box" size={20}>
          <div className="lang-btn pointer" onClick={changeLanguage}>
            {i18n.language === 'en' ? <img src={cnSvg} alt="" /> : <img src={enSvg} alt="" />}
          </div>
          <div className="pointer">
            <Dropdown overlay={menus} overlayClassName="dropdown-tran" placement="bottomRight" arrow>
              <div className='user-info'>
                <img src={menuSvg} alt="" />
                <span style={{ width: '100px' }}>{useAddressDisplay(address) || ''}</span>
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
