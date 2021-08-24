import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Dropdown, Menu, Space } from 'antd'
import GlobalSearch from '../../components/GlobalSearch'
import Bread from './Bread'
import cnSvg from '../../assets/images/2.icon_cn.svg'
import enSvg from '../../assets/images/2.icon_en.svg'
import menuSvg from '../../assets/images/1.3.svg'
import searchSvg from '../../assets/images/1.1.svg'
import { BaseInfoContext } from '../index'
import { loginApi } from '../../api'

const Header = (props: any) => {
  const { t, i18n } = useTranslation()
  const [showSearch, showSearchSet] = useState(false)
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

  const handleOnBlur = () => {
    showSearchSet(false)
  }

  const menu = () => {
    return (
      <Menu className="personal-box">
        {baseInfo && baseInfo.name ? (
          <>
            <Menu.Item key="name">{baseInfo?.name}</Menu.Item>{' '}
            <Menu.Item key="edit">{t('login.editOrgName')}</Menu.Item>
          </>
        ) : null}

        <Menu.Item key="logout" onClick={switchLogin}>
          {t('login.logout')}
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div className="header-box">
      <div className="bread-box">
        <Bread />
      </div>
      <Space className="operation-box" size={20}>
        {showSearch ? <GlobalSearch handleOnBlur={handleOnBlur}></GlobalSearch> : ''}
        <div className="pointer" onClick={() => showSearchSet(!showSearch)}>
          <img src={searchSvg} alt="" />
        </div>
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
