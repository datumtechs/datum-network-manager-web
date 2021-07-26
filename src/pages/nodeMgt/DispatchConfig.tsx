/* eslint-disable no-nested-ternary */
import React, { FC, useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Bread from '../../layout/components/Bread'
import './scss/config.scss'
import { BaseInfoContext } from '../../layout/index'
import { nodeApi } from '../../api/index'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const DispatchConfig: FC<any> = (props: any) => {
  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()
  const baseInfo = useContext(BaseInfoContext)
  console.log(baseInfo)

  const [hasService, setHasService] = useState<boolean>(false)
  const [isConnect, setIsConnect] = useState<boolean>(false)
  const [showStatus, setShowStatus] = useState<boolean>(false)
  const [showLoading, setShowShowLoading] = useState<boolean>(false)

  const onFinish = () => {}
  const onFinishFailed = () => {}

  useEffect(() => {
    form.setFieldsValue({
      carrierIp: baseInfo.carrierIp,
      carrierPort: baseInfo.carrierPort,
    })
  }, [baseInfo])

  useEffect(() => {
    if (baseInfo.status === 1) {
      setHasService(true)
    } else {
      setHasService(false)
    }
  }, [baseInfo.status])

  const testServiceFn = () => {
    setShowShowLoading(true)
    // 192.168.21.164:4444
    const { carrierIp, carrierPort } = form.getFieldsValue()
    nodeApi.connectNode({ ip: carrierIp, port: carrierPort }).then(res => {
      // setIsConnect()
      setShowShowLoading(false)
      setShowStatus(true)
      if (res.status === 0) {
        setIsConnect(true)
      } else {
        setIsConnect(false)
      }
    })
  }

  const joinNetwork = () => {
    nodeApi.applyJoinNetwork().then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.joinNetworkSuccess')}`)
        props.setBaseInfoStatus(true)
      } else {
        message.error(`${t('tip.joinNetworkFailed')}`)
      }
    })
  }

  const missNetwork = () => {
    // const { ip, port } = form.getFieldsValue()
    nodeApi.withDrawNetwork().then(res => {
      if (res.status === 0) {
        message.success(`${t('node.logoutSuccess')}`)
        props.setBaseInfoStatus(false)
      } else {
        message.error(`${t('node.logoutFailed')}`)
      }
    })
  }

  return (
    <>
      <div className="layout-box">
        <div className="bread-box">
          <Bread />
        </div>
        <div className="form-box">
          <Form
            size="large"
            name="basic"
            form={form}
            labelAlign="left"
            labelCol={{ style: { width: i18n.language === 'en' ? 180 : 120, whiteSpace: 'pre-wrap' } }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item colon label={t('common.orgName')} name="name" className="form-item">
              <p className="title">{baseInfo.name}</p>
            </Form.Item>
            <Form.Item colon label={t('common.orgIdentify')} name="identityId" className="form-item">
              <p className="title">{baseInfo.identityId}</p>
            </Form.Item>
            <Form.Item colon label={t('common.internalIP')} name="carrierIp" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item>
            <Form.Item colon label={t('common.internalPort')} name="carrierPort" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item>
            {/* <Form.Item label={t('common.status')} name="username" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item> */}
            <Form.Item>
              {hasService ? (
                <>
                  <Button
                    type="primary"
                    className="btn submit-btn"
                    style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                    onClick={testServiceFn}
                  >
                    {t('node.reConnectService')}
                  </Button>
                  {showLoading ? (
                    <Spin className="loading-icon" indicator={antIcon} />
                  ) : showStatus ? (
                    isConnect ? (
                      <span className="success_color status">{t('node.connectSuccess')}</span>
                    ) : (
                      <span className="failed_color status">{t('node.connenctFailed')}</span>
                    )
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    className="btn submit-btn"
                    onClick={testServiceFn}
                    style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                  >
                    {t('node.connectService')}
                  </Button>
                  {/* // TODO 需要抽离 */}
                  {showLoading ? (
                    <Spin className="loading-icon" indicator={antIcon} />
                  ) : showStatus ? (
                    isConnect ? (
                      <span className="success_color status">{t('node.connectSuccess')}</span>
                    ) : (
                      <span className="failed_color status">{t('node.connenctFailed')}</span>
                    )
                  ) : (
                    ''
                  )}
                </>
              )}
            </Form.Item>
            <Form.Item>
              {hasService ? (
                <Button
                  type="primary"
                  className="btn submit-btn"
                  // disabled={!isConnect}
                  onClick={missNetwork}
                  style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                  htmlType="submit"
                >
                  {t('node.logoutNetwork')}
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    disabled={!isConnect}
                    className="btn submit-btn"
                    onClick={joinNetwork}
                    style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                    htmlType="submit"
                  >
                    {t('overview.submit')}
                  </Button>
                </>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default connect(
  (state: any) => ({ state }),
  (dispatch: any) => ({
    setBaseInfoStatus: (data: boolean) => {
      dispatch({
        type: 'SET_BASEINFO_STATUS',
        data,
      })
    },
  }),
)(DispatchConfig)
