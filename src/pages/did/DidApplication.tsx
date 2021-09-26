import { FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import './scss/did.scss'
import { loginApi } from '../../api/index'
import { orgReg } from '../../utils/reg'
import { BaseInfoContext } from '../../layout/index'

export const DidApplication: FC<any> = () => {
  const { t } = useTranslation()

  const onFinish = ({ identityId = '' }) => {
    if (!orgReg.test(identityId)) {
      return message.error(`${t('tip.plzInputID')}`)
    }
    loginApi.applyOrgIdentity({ orgName: identityId }).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.idSuccess')}`)
        location.href = '/overview'
      } else {
        // message.error(`${t('tip.idFailed')}`)
        message.error(res.msg)
      }
    })
  }


  return (
    <div className="did-box">
      <div className="title">{t('common.plzApplyDid')}</div>
      <div className="form-box">
        <Form name="basic" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            label={t('overview.setYourOrgName')}
            name="identityId"
            rules={[{ required: true, message: 'Please input your identityId!' }]}
          >
            <Input placeholder={t('overview.setOrgNameTips')} />
          </Form.Item>
          <Form.Item>
            <div className="btn center">
              <Button type="primary" className="submit-btn" htmlType="submit">
                {t('common.submit')}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
