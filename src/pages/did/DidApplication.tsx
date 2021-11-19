import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Form, Input, message, Steps } from 'antd'
import { loginApi } from '@api/index'
import { orgReg } from '@utils/reg'
import './scss/did.scss'

export const DidApplication: FC<any> = () => {
  const { t, i18n } = useTranslation(),
    { Step } = Steps,
    [current, setCurrent] = useState(0),
    [baseInfo, setBaseInfo] = useState({ name: 1 })
  const { TextArea } = Input;

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
    <div className="layout-box did-box">
      <Steps current={current}>
        {Array(3).fill('').map((_, i) => <Step key={i} onClick={_ => setCurrent(i)} />)}
      </Steps>
      <div className="form-box">
        <Form
          layout={'horizontal'}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: i18n.language === 'en' ? 5 : 4 }}
          onFinish={onFinish}>
          {current === 0 ?
            <Form.Item
              label={t('overview.setYourOrgName')}
              name="identityId"
              rules={[{ required: true, message: 'Please input your identityId!' }]}
            >
              <Input placeholder={t('overview.setOrgNameTips')} />
            </Form.Item>
            : ''
          }
          {current === 1 ? <>
            <p className="title center">{t('UserCenter.OrganizationApplicationSucceeded')}</p>
            <Form.Item
              label={t('UserCenter.ProfileOrganizationName')}
              name="identityId"
            >
              <p className="title">{baseInfo?.name || ''}</p>
            </Form.Item>
            <Form.Item
              label={t('UserCenter.ProfileOrganizationIdentifier')}
            >
              <p className="title">{baseInfo?.name || ''}</p>
            </Form.Item>
            <Form.Item
              label={t('UserCenter.ProfileOrganizationHead')}
            >
              <Input placeholder={t('UserCenter.ProfileHeadPlaceholder')} />
            </Form.Item>
            <Form.Item
              label={t('UserCenter.ProfileOrganizationIntroduction')}
            >
              <TextArea placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} />
            </Form.Item>
          </>
            : ''
          }
          <div className="btn center">
            <Button type="primary" className="submit-btn" htmlType="submit">
              {t('common.submit')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
