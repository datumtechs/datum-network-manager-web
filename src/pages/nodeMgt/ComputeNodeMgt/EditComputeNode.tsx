import React, { FC } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../../layout/components/Bread'
import '../scss/config.scss'

export const EditComputeNode: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { location } = props

  // const tailLayout = {
  //   wrapperCol: { offset: 4, span: 8 },
  // }
  const { type } = location.state
  console.log('location.state', type)
  const onFinish = () => {}
  const onFinishFailed = () => {}
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="form-box">
        <Form
          size="large"
          name="basic"
          labelAlign="left"
          labelCol={{ style: { width: i18n.language === 'en' ? 200 : 120, whiteSpace: 'pre-wrap' } }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item colon label={t('dataNodeMgt.nodeName')} name="nodename" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalIP')} name="internalIP" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalIp')} name="externalIp" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalPort')} name="internalPort" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalPort')} name="externalPort" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item label={t('common.remark')} name="remark" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item style={{ marginLeft: i18n.language === 'en' ? 200 : 120 }} className="form-item">
            <Button className="btn re-btn">{t('common.return')}</Button>
            <Button
              type="primary"
              className="btn sub-btn"
              // style={{ marginLeft: i18n.language === 'en' ? 200 : 120 }}
              htmlType="submit"
            >
              {t('common.submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
