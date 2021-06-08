import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../layout/components/Bread'

export const DispatchConfig: FC<any> = () => {
  const { t } = useTranslation()
  const onFinish = () => {}
  const onFinishFailed = () => {}
  return (
    <>
      <div className="layout-box">
        <div className="bread-box">
          <Bread />
        </div>
        <div className="form-box">
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label={t('common.orgName')}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              {t('common.noModify')}
            </Form.Item>
            <Form.Item
              label={t('common.orgName')}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              {t('common.noModify')}
            </Form.Item>
            <Form.Item
              label={t('common.orgName')}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder={t('common.noModify')} />
            </Form.Item>
            <Form.Item
              label={t('common.orgName')}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder={t('common.noModify')} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
