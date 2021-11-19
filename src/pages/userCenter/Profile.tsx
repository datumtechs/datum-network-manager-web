import { FC, useContext, useEffect, useState } from 'react'
import { Form, Button, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseInfoContext } from '@/layout/index'
import { LoadingOutlined } from '@ant-design/icons'
import './index.scss'

const Profile: FC<any> = (props: any) => {
  const [form] = Form.useForm(),
    { t, i18n } = useTranslation(),
    baseInfo = useContext(BaseInfoContext),
    [Introduction, setIntroduction] = useState(''),
    [name, setName] = useState(''),
    [head, setHead] = useState(''),
    [disabled, setDisabled] = useState(true),
    [loading, setLoading] = useState(false)

  useEffect(() => {
    form.setFieldsValue({
      name: baseInfo?.name,
      head: baseInfo?.head,
      Introduction: baseInfo?.Introduction,
    })
  }, [baseInfo])

  const submit = () => {
    form
      .validateFields()
      .then(values => {
        setLoading(true)
        console.log(values);
        setDisabled(false)
        setLoading(false)
      }).catch(err => {
        console.log(err);

      })
  }



  return (<div className="layout-box">
    <div className="form-box userForm">
      <Form
        size="large"
        name="userForm"
        form={form}
        labelAlign="left"
        layout={'horizontal'}
        wrapperCol={{ span: 14 }}
        labelCol={{ span: i18n.language === 'en' ? 5 : 3 }}
      >
        <Form.Item colon label={t('UserCenter.ProfileOrganizationIdentifier')} name="identity"
          className="form-item">
          <p className="title" style={{ paddingLeft: '11px' }}>{baseInfo?.identityId}</p>
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationName')} name="name"
          className="form-item">
          <Input disabled={disabled} value={name} onChange={e => setName(e.target.value)}
            placeholder={t('UserCenter.ProfileNamePlaceholder')}
          />
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationHead')} name="head"
          className="form-item">
          <Input disabled={disabled} value={head} onChange={e => setHead(e.target.value)}
            placeholder={t('UserCenter.ProfileHeadPlaceholder')} />
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationIntroduction')} name="Introduction"
          className="form-item">
          <Input disabled={disabled} value={Introduction} onChange={e => setIntroduction(e.target.value)}
            placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} />
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
                style={{ marginLeft: '30px' }}
                icon={<LoadingOutlined />} loading={loading}
                onClick={() => submit()}>
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