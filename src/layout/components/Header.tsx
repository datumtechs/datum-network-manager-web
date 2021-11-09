import { useContext, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Dropdown, Menu, Space, Input, Form, message } from 'antd'
import GlobalSearch from '../../components/GlobalSearch'
import Bread from './Bread'
import cnSvg from '../../assets/images/2.icon_cn.svg'
import enSvg from '../../assets/images/2.icon_en.svg'
import menuSvg from '../../assets/images/1.3.svg'
import searchSvg from '../../assets/images/1.1.svg'
import { BaseInfoContext } from '../index'
import { loginApi, authApi } from '../../api'
import MyModal from '../../components/MyModal'

const Header = (props: any) => {
  // console.log(props.state.org.orgInfo);
  const { orgInfo } = props.state.org
  const { t, i18n } = useTranslation()
  const [isModalVisible, isModalVisibleSet] = useState(false)
  const [showSearch, showSearchSet] = useState(false)
  const baseInfo = useContext(BaseInfoContext)
  const { pathname } = useLocation()
  const history = useHistory()
  const formRef = useRef<any>(null)
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
  const handleOk = () => {
    formRef.current.validateFields().then((values) => {
      authApi.upAuthName({
        identityName: values.name,
        identityId: orgInfo.identityId
      }).then(res => {
        if (res.status === 0) {
          isModalVisibleSet(false)
        } else {
          message.error(res.msg)
        }
      })
    })
  }

  const handleCancel = () => {
    isModalVisibleSet(false)
  }
  const showChangeName = () => {
    isModalVisibleSet(true)
  }

  const menu = () => {
    return (
      <Menu className="personal-box">
        {baseInfo && baseInfo.name ? (
          <>
            <Menu.Item key="name">{baseInfo?.name}</Menu.Item>{' '}
            {orgInfo.status !== 1 ? <Menu.Item key="edit" onClick={showChangeName}>
              {/* {orgInfo.status === 1 ? <Menu.Item key="edit" onClick={showChangeName}> */}
              {t('login.editOrgName')}
            </Menu.Item> : ''}
          </>
        ) : null}

        <Menu.Item key="logout" onClick={switchLogin}>
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
          {/* {showSearch ? <GlobalSearch handleOnBlur={handleOnBlur}></GlobalSearch> : ''} */}
          {/* <div className="pointer" onClick={() => showSearchSet(!showSearch)}>
            <img src={searchSvg} alt="" />
          </div> */}
          {/* 是否已经入网 TODO */}
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
      <MyModal width={600} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form ref={formRef} size="large" layout="vertical" name="renameOrg" labelAlign="left" initialValues={{ remember: true }}>
          <Form.Item colon label={t('common.orgName')} name="name" className="form-item" rules={[{ required: true, message: `${t('overview.setYourOrgName')}` }]}>
            <Input placeholder={t('login.rename')} />
          </Form.Item>
        </Form>
      </MyModal>
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
// export default Header
export default connect(mapStateToProps, mapDispatchToProps)(Header)
