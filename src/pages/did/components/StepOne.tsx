import { FC, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Form, Input
} from 'antd'
import { Rule } from "rc-field-form/lib/interface";
export const StepOne: FC<any> = () => {

  const { t, i18n } = useTranslation(),
    [rules, setRules] = useState([{
      min: 4, message: `${t('DidApplication.SetYourOrgNameRulesItem3')}`
    }, {
      max: 20, message: `${t('DidApplication.SetYourOrgNameRulesItem4')}`
    }]),
    self = this

  // useEffect(() => {
  //   setRules(rules)
  // }, [i18n.language])


  return <>
    <p className="title center set-your-org-name-title">
      {t('DidApplication.SetYourOrgName')}
    </p>
    <Form.Item
      label={" "}
      colon={false}
      name="identityId"
      rules={((): Rule[] => rules)()}
    >
      <Input minLength={4} maxLength={20} placeholder={t('DidApplication.SetYourOrgNamePlaceholder')} />
    </Form.Item>
    <Form.Item
      label={" "}
      colon={false}
    >
      <div className="orgName-rules">
        <p>{t('DidApplication.SetYourOrgNameRules')}</p>
        <p>1.{t('DidApplication.SetYourOrgNameRulesItem1')}</p>
        <p>2.{t('DidApplication.SetYourOrgNameRulesItem2')}</p>
        <p>3.{t('DidApplication.SetYourOrgNameRulesItem3')}</p>
        <p>4.{t('DidApplication.SetYourOrgNameRulesItem4')}</p>
      </div>
    </Form.Item>
    <div className="btn center">
      <Button type="primary" className="submit-btn" htmlType="submit">
        {t('DidApplication.SetYourOrgNameButton')}
      </Button>
    </div>
  </>
}