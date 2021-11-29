import { FC, useContext, useEffect, useState } from 'react'
import { Form, Button, Input, Upload, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseInfoContext } from '@/layout/index'
import { LoadingOutlined, PlusOutlined, MinusCircleFilled } from '@ant-design/icons'
import './index.scss'
import clean from '@assets/images/clean.icon.svg'

const Profile: FC<any> = (props: any) => {
  const [form] = Form.useForm(),
    { t, i18n } = useTranslation(),
    baseInfo = useContext(BaseInfoContext),
    [Introduction, setIntroduction] = useState(''),
    [name, setName] = useState(''),
    [disabled, setDisabled] = useState(true),
    [loading, setLoading] = useState(false),
    [file, setFile] = useState<any>(''),
    [fileBase, setFileBase] = useState<any>(''),
    [TextAreaValue, setTextAreaValue] = useState(''),
    { TextArea } = Input,
    { Dragger } = Upload,
    DraggerProps = {
      name: 'file',
      showUploadList: false,
      accept: 'image/*',
      beforeUpload: _ => false,
      onChange(info) {
        console.log(info.file);

        setFile(info.file)
        try {
          const reader = new FileReader();
          reader.readAsDataURL(info.file);
          reader.onload = function () {
            setFileBase(reader.result)
          };
        } catch (e) {
          console.log(e, "错误处理");
        }
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      }
    }

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
  },

    delFile = () => {
      setFile('')
      setFileBase('')
    }

  return (<div className="layout-box">
    <div className="form-box userForm">
      <Form
        size="large"
        name="userForm"
        form={form}
        labelAlign="left"
        layout={'horizontal'}
        wrapperCol={{ span: 10 }}
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
          <Dragger
            className="info-dragger"
            disabled={!!file}
            {...DraggerProps}
          >
            {!file ? <PlusOutlined /> : <Image src={fileBase} className="head-img" />}
            {!file ? <p>{t("DidApplication.SetYourHeadIips")}</p> : <p className="head-img-lable">{file?.name || ''}</p>}
          </Dragger>
          {!!file ? <MinusCircleFilled onClick={delFile} className="del" /> : ''}
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationIntroduction')} name="Introduction"
          className="form-item">
          {/* <Input disabled={disabled} value={Introduction} onChange={e => setIntroduction(e.target.value)}
            placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} /> */}
          <TextArea autoSize={false} className="identfier-info-input"
            value={TextAreaValue}
            onChange={_ => setTextAreaValue(_.target.value)}
            placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} >
          </TextArea>
          {TextAreaValue ? <img src={clean} onClick={() => setTextAreaValue('')} className="clean" /> : ''}
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