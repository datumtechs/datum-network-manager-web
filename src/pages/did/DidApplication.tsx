import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Form, Input } from 'antd'
import './scss/did.scss'

export const DidApplication: FC<any> = () => {
  const { t } = useTranslation()
  const onFinish = () => {}
  const onFinishFailed = () => {}
  return (
    <div className="did-box">
      <div className="title">{t('common.plzApplyDid')}</div>
      <div className="form-box">
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label={t('common.orgName')}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder={t('common.noModify')} />
          </Form.Item>
        </Form>
      </div>
      <div className="btn">
        <Button type="primary" className="submit-btn">
          {t('common.submit')}
        </Button>
      </div>
    </div>
  )
}
