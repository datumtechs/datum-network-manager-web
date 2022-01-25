/* eslint-disable no-empty */
import { Form, Input, Button, message } from 'antd'
import { useState, useEffect } from 'react'
import './index.scss'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import MyWave from '@com/MyWave'
import square1 from '@assets/images/1.img1.png'
import square2 from '@assets/images/1.img2.png'
import square3 from '@assets/images/1.img3.png'
import cnSvg from '@assets/images/2.icon_cn.svg'
import enSvg from '@assets/images/2.icon_en.svg'
import { loginApi } from '@api/index'
import { connect } from 'react-redux'

// import imageBottom from '../../assets/images/1.bj3.png'
const mapDispatchToProps = (dispatch: any) => ({
  InfoCompleteness: (data) => {
    dispatch({
      type: 'INFO_COMPLETENESS',
      data
    })
  }
})




const Login = (props: any) => {
  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()

  const history = useHistory()
  const { hash, search } = history.location
  const fromPathAry = hash.replace(/#/, '')?.split('/')
  let redirectPath
  if (fromPathAry.length > 2) {
    redirectPath = `/${fromPathAry[1]}/${fromPathAry[2]}`
  } else {
    redirectPath = hash.replace(/#/, '')
  }



  const onFinish = (values: any) => {
    const {
      login: { account, password, veriCode = 2222 },
    } = values
    loginApi.loginFn({ userName: account, passwd: password, code: veriCode }).then(res => {
      const { orgInfoCompletionLevel, connectNetworkStatus } = res.data || {}
      if (!connectNetworkStatus) {
        // } else if (connectNetworkStatus) {
        props.InfoCompleteness({
          orgInfoCompletionLevel,//, //组织信息完善情况0 带申请  1 待完善 2 完成
          connectNetworkStatus,// //0 未入网  1已入网 99 已退网
        })
        history.push({
          pathname: '/didApplication',
        })
      } else if (redirectPath) {
        history.push(redirectPath)
      } else {
        history.push('/')
      }
    })
  }
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  }
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "'${name}'",
  }
  return (
    <div className="login-box">
      <MyWave />
      <div className="login-form-box">
        <img src={square1} alt="" className="login-square-img1" />
        <img src={square2} alt="" className="login-square-img2" />
        <img src={square3} alt="" className="login-square-img3" />
        <p className="login-ball1" />
        <p className="login-ball2" />
        <p className="login-ball3" />
        <div className="text-box">
          <p className="p1">{t('login.RosettaNet')}</p>
          <p className="p2">{t('login.loginSlogan')}</p>
          <p className="p3">{t('login.loginRemarks')}</p>
        </div>
        <div className="form-box">
          <div className="switch-lang pointer" onClick={changeLanguage}>
            {i18n.language === 'en' ? <img src={cnSvg} alt="" /> : <img src={enSvg} alt="" />}
          </div>
          <p className="title">{t('login.login')}</p>
          <Form
            form={form}
            initialValues={{ remember: true }}
            className="content-box"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['login', 'account']}
              rules={[{ required: true, message: t('login.plzinput') + t('login.account') }]}
            >
              <Input bordered={false} placeholder={t('login.account')} className="login-form-height" />
            </Form.Item>
            <Form.Item
              name={['login', 'password']}
              rules={[{ required: true, message: t('login.plzinput') + t('login.password') }]}
            >
              <Input.Password
                visibilityToggle={false}
                size="large"
                bordered={false}
                placeholder={t('login.password')}
                className="login-form-height"
              />
            </Form.Item>
            <Form.Item
              name={['login', 'veriCode']}
              rules={[{ required: true, message: t('login.plzinput') + t('login.vericode') }]}
            >
              <Input bordered={false} placeholder={t('login.vericode')} className="login-form-height" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
              <Button block type="primary" htmlType="submit" className="login-form-height">
                {t('login.login')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect((state: any) => ({ state }), mapDispatchToProps)(Login) 
