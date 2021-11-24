import { FC } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Form, Input
} from 'antd'
export const StepOne: FC<any> = () => {
  const { t, i18n } = useTranslation()
  return <>
    <p className="title center set-your-org-name-title">
      {t('DidApplication.SetYourOrgName')}
    </p>
    <Form.Item
      label={" "}
      colon={false}
      name="identityId"
    >
      <Input minLength={4} maxLength={20} placeholder={t('DidApplication.SetYourOrgNamePlaceholder')} />
    </Form.Item>
    <Form.Item
      label={" "}
      colon={false}
    >
      <div className="orgName-rules">
        <p>{t('DidApplication.SetYourOrgNameRules')}</p>
        <p>{t('DidApplication.SetYourOrgNameRulesItem1')}</p>
        <p>{t('DidApplication.SetYourOrgNameRulesItem2')}</p>
        <p>{t('DidApplication.SetYourOrgNameRulesItem3')}</p>
        <p>{t('DidApplication.SetYourOrgNameRulesItem4')}</p>
      </div>
    </Form.Item>
    <div className="btn center">
      <Button type="primary" className="submit-btn" htmlType="submit">
        {t('DidApplication.SetYourOrgNameButton')}
      </Button>
    </div>
  </>
}