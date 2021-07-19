/* eslint-disable no-nested-ternary */
import React, { FC, useContext, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../layout/components/Bread'
import './scss/config.scss'
import { BaseInfoContext } from '../../layout/index'
import { nodeApi } from '../../api/index'

const DispatchConfig: FC<any> = () => {
  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()
  const baseInfo = useContext(BaseInfoContext)

  const [hasService, setHasService] = useState<boolean>(false)
  const [isConnect, setIsConnect] = useState<boolean>(false)
  const [showStatus, setShowStatus] = useState<boolean>(false)

  const onFinish = () => {}
  const onFinishFailed = () => {}

  useEffect(() => {
    if (baseInfo.carrierIp) {
      setHasService(true)
    } else {
      setHasService(false)
    }
  }, [baseInfo.carrierIp])

  const testServiceFn = () => {
    // 192.168.21.164:4444
    const { ip, port } = form.getFieldsValue()
    nodeApi.connectNode({ ip, port }).then(res => {
      // setIsConnect()
      setShowStatus(true)
      if (res.status === 0) {
        setIsConnect(true)
      } else {
        setIsConnect(false)
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
            <Form.Item colon label={t('common.orgName')} name="orgName" className="form-item">
              <p className="title">{baseInfo.name}</p>
            </Form.Item>
            <Form.Item colon label={t('common.orgIdentify')} name="orgIdentify" className="form-item">
              <p className="title">{baseInfo.identityId}</p>
            </Form.Item>
            <Form.Item colon label={t('common.internalIP')} name="ip" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item>
            <Form.Item colon label={t('common.internalPort')} name="port" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item>
            {/* <Form.Item label={t('common.status')} name="username" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item> */}
            <Form.Item>
              {hasService ? (
                <Button
                  type="primary"
                  className="btn submit-btn"
                  style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                  onClick={testServiceFn}
                >
                  {t('node.reConnectService')}
                </Button>
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
                  {showStatus ? (
                    isConnect ? (
                      <span className="success_color status">{t('node.connectSuccess')}</span>
                    ) : (
                      <span className="failed_color status">{t('node.connenctFailed')}</span>
                    )
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Form.Item>
            <Form.Item>
              {hasService ? (
                <Button
                  type="primary"
                  className="btn submit-btn"
                  disabled={!isConnect}
                  style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                  htmlType="submit"
                >
                  {t('overview.submit')}
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    disabled={!isConnect}
                    className="btn submit-btn"
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

export default DispatchConfig
