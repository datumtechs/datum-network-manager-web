import React, { FC } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../layout/components/Bread'
import './scss/config.scss'

export const DispatchConfig: FC<any> = () => {
  const { t, i18n } = useTranslation()
  console.log(i18n)
  // const tailLayout = {
  //   wrapperCol: { offset: 4, span: 8 },
  // }
  const onFinish = () => {}
  const onFinishFailed = () => {}
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
            labelAlign="left"
            labelCol={{ style: { width: i18n.language === 'en' ? 180 : 120, whiteSpace: 'pre-wrap' } }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item colon label={t('common.orgName')} name="orgName" className="form-item">
              <p className="title">乌克兰基辅特级竞标赛</p>
            </Form.Item>
            <Form.Item colon label={t('common.orgIdentify')} name="orgIdentify" className="form-item">
              <p className="title">乌克兰基辅特级竞标赛</p>
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
              <Button
                type="primary"
                className="btn submit-btn"
                style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                htmlType="submit"
              >
                {t('overview.submit')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
