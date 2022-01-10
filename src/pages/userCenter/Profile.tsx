import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Form, Button, Input, message, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseInfoContext } from '@/layout/index'
import './index.scss'
import { Rule } from 'antd/lib/form'
import { loginApi } from '@api/index'

const { TextArea } = Input

const Profile: FC<any> = (props: any) => {
  const [form] = Form.useForm(),
    { t, i18n } = useTranslation(),
    baseInfo = useContext(BaseInfoContext),
    [disabled, setDisabled] = useState(true),
    [loading, setLoading] = useState(false),
    [imageUrlText, setTextAreaValue] = useState(''),
    [profileText, setTextImgValue] = useState(''),
    [rules, setRules] = useState([{
      min: 4, message: `${t('DidApplication.SetYourOrgNameRulesItem3')}`
    }, {
      max: 20, message: `${t('DidApplication.SetYourOrgNameRulesItem4')}`
    }])

  const formRef = useRef<any>(null)

  const submit = () => {
    formRef.current!
      .validateFields()
      .then(values => {
        setLoading(true)
        console.log(values);
        loginApi.updateLocalOrg({
          imageUrl: values.imageUrlText.replace(/\s*/g, ""),
          profile: values.profileText.replace(/\s*/g, ""),
          name: values.ProfileName.replace(/\s*/g, "")
        }).then(res => {
          if (res.status == 0) {
            message.success(t('task.success'))
            props?.baseInfo?.fetchData()
          } else {
            message.error(res.msg)
          }
          cancelLoading()
        })
      }).catch(err => {
        console.log(err);
        cancelLoading()
      })
  }

  const cancelLoading = () => {
    setDisabled(true)
    setLoading(false)
  }

  useEffect(() => {
    if (disabled) {
      formRef.current!.setFieldsValue({
        ProfileName: baseInfo?.name,
        imageUrlText: baseInfo?.imageUrl,
        profileText: baseInfo?.profile,
      })
      setTextAreaValue(baseInfo?.imageUrl)
      setTextImgValue(baseInfo?.profile)
    }

  }, [baseInfo])

  return (<div className="layout-box">
    <div className="form-box userForm">
      <Form
        size="large"
        form={form}
        ref={formRef}
        labelAlign="left"
        layout={'horizontal'}
        wrapperCol={{ span: 10 }}
        labelCol={{ span: i18n.language === 'en' ? 5 : 3 }}
      >
        <Form.Item colon label={t('UserCenter.ProfileOrganizationIdentifier')}
          className="form-item">
          <p className="title" style={{ paddingLeft: '11px' }}>{baseInfo?.identityId}</p>
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationName')} name="ProfileName"
          className="form-item"
          rules={((): Rule[] => rules)()}
        >
          <Input disabled={disabled}
            placeholder={t('UserCenter.ProfileNamePlaceholder')}
          />
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationHead')}
          name="imageUrlText"
          className="form-item">
          {/* <> */}
          <TextArea autoSize={false} className="identfier-info-input"
            disabled={disabled}
            key={"ProfileOrganizationHead"}
            onChange={_ => setTextImgValue(_.target.value)}
            placeholder={t('UserCenter.ProfileHeadPlaceholder')} >
          </TextArea>
          {/* {imageUrlText ? <img src={clean} onClick={() => setTextImgValue('')} className="clean" /> : ''} */}
          {/* </> */}
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationIntroduction')}
          name="profileText"
          className="form-item">
          {/* <> */}
          <TextArea autoSize={false} className="identfier-info-input"
            disabled={disabled}
            key={"ProfileOrganizationIntroduction"}
            onChange={_ => setTextAreaValue(_.target.value)}
            placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} >
          </TextArea>
          {/* {profileText ? <img src={clean} onClick={() => setTextAreaValue('')} className="clean" /> : ''} */}
          {/* </> */}
        </Form.Item>


        <Form.Item colon={false} className="form-item" label={" "}>
          {disabled ?
            <Button className="global-btn" onClick={() => setDisabled(false)}>
              {t('UserCenter.ProfileButtonEdit')}
            </Button> : <>
              <Button className="global-btn" onClick={() => setDisabled(true)}>
                {t('UserCenter.ModalCancel')}
              </Button>
              <Button type="primary" className="global-btn"
                style={{ marginLeft: '30px' }} loading={loading}
                onClick={submit}>
                {t('common.submit')}
              </Button>
            </>
          }
        </Form.Item>
      </Form>
    </div>
  </div>)
}
export default Profile