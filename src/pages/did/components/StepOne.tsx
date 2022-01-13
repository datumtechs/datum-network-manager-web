import { FC, useState, useRef } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Form, Input, message
} from 'antd'
import { Rule } from "rc-field-form/lib/interface";
import { loginApi } from '@api/index'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: any) => ({
  setIsReg: (data) => {
    dispatch({
      type: 'SET_ISREG',
      data
    })
  }
})










const StepOne: FC<any> = (props) => {

  const { t } = useTranslation(),
    [valiStatus, setValidateStatus] = useState<any>("warning")
  const inputRef = useRef<any>(null)

  const onFinish = () => {
    const name = inputRef?.current?.input.value
    if (!name || name.length > 20 || name.length < 4) {
      setValidateStatus("error")
      return
    }

    loginApi.applyOrgIdentity({ orgName: name.replace(/\s*/g, "") }).then(res => {
      if (res.status === 0) {
        props?.baseInfo?.fetchData()
        message.success(`${t('tip.idSuccess')}`)
        props.setIsReg(true)
        props.setCurrent(1)
      } else {
        message.error(res.msg)
      }
    })
  }


  return <>
    <p className="title center set-your-org-name-title">
      {t('DidApplication.SetYourOrgName')}
    </p>
    <Form.Item
      label={" "}
      colon={false}
      name="identityId"
      // validateStatus={valiStatus}
      hasFeedback={valiStatus == "error"}
      help={valiStatus == "error" ? t('DidApplication.NameNoRuleTips') : ""}
      validateStatus={valiStatus}
    >
      <Input minLength={4} ref={inputRef} maxLength={20} placeholder={t('DidApplication.SetYourOrgNamePlaceholder')} />
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
      <Button type="primary" className="submit-btn" onClick={onFinish}>
        {t('DidApplication.SetYourOrgNameButton')}
      </Button>
    </div>
  </>
}

export default connect((state: any) => ({ state }), mapDispatchToProps)(StepOne)
