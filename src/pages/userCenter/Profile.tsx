import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Form, Button, Input, message, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseInfoContext } from '@/layout/index'
import './index.scss'
import { Rule } from 'antd/lib/form'
import { loginApi } from '@api/index'
const { TextArea } = Input
const imgURl = 'https://pica.zhimg.com/v2-f2af5e9e6f2d26b4c31e070c6a38c380_1440w.jpg'

const Profile: FC<any> = (props: any) => {
  const [form] = Form.useForm(),
    { t, i18n } = useTranslation(),
    baseInfo = useContext(BaseInfoContext),
    [disabled, setDisabled] = useState(true),
    [loading, setLoading] = useState(false),
    [rules] = useState([{
      required: true, min: 4, message: `${t('DidApplication.SetYourOrgNameRulesItem3')}`
    }, {
      max: 20, message: `${t('DidApplication.SetYourOrgNameRulesItem4')}`
    }])

  const formRef = useRef<any>(null)

  const submit = () => {
    // debugger
    formRef.current.validateFields()
      .then(values => {
        // debugger
        let name = values.ProfileName.replace(/\s*/g, "")
        console.log(values);
        if (!name) return false
        // debugger
        setLoading(true)
        loginApi.updateLocalOrg({
          imageUrl: values.imageUrlText.replace(/\s*/g, ""),
          profile: values.profileText.replace(/(^\s*)|(\s*$)/g, ""),
          name: name
        }).then(res => {
          if (res.status == 0) {
            message.success(t('task.success'))
          }
          baseInfo?.fetchData(true)
          cancelLoading()
        })
      }).catch(err => {
        console.log(err);
        // cancelLoading()
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
        imageUrlText: baseInfo?.imageUrl || imgURl,
        profileText: baseInfo?.profile,
      })
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
          <Input disabled={disabled || baseInfo.status == 1}
            placeholder={t('UserCenter.ProfileNamePlaceholder')}
          />
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationHead')}
          name="imageUrlText"
          rules={((): Rule[] => [
            {
              type: 'url',
              message: i18n.language == 'zh' ? i18n.getDataByLanguage('zh')?.translation?.common['legalVerificationUrl'] : i18n.getDataByLanguage('en')?.translation?.common['legalVerificationUrl']
            }
          ])()}
          className="form-item">
          {
            disabled ?
              <Image src={baseInfo?.imageUrl || imgURl}
                height={100}
                width={300}
                preview={{
                  src: baseInfo?.imageUrl || imgURl
                }} fallback={baseInfo?.imageUrl || imgURl} />
              :
              <TextArea autoSize={false} className="identfier-info-input"
                key={"ProfileOrganizationHead"}
                maxLength={200}
                showCount
                placeholder={t('UserCenter.ProfileHeadPlaceholder')} >
              </TextArea>
          }
        </Form.Item>

        <Form.Item
          colon
          label={t('UserCenter.ProfileOrganizationIntroduction')}
          name="profileText"
          className="form-item">

          {disabled ?
            <p className='title' style={{
              paddingLeft: '11px', width: '100%',
              wordBreak: 'break-all'
            }}>{baseInfo?.profile}</p>
            :
            <TextArea autoSize={false} className="identfier-info-input"
              disabled={disabled}
              maxLength={200}
              showCount
              key={"ProfileOrganizationIntroduction"}
              placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} >
            </TextArea>
          }
        </Form.Item>


        <Form.Item colon={false} className="form-item" label={" "} style={{ paddingLeft: '11px' }}>
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