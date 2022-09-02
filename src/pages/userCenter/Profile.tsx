import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Form, Button, Input, message, Image, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseInfoContext } from '@/layout/index'
import { imgURls as imgURl } from '@utils/utils'
import './index.scss'
import { imgURls, baseImgURls } from '@utils/utils'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Rule } from 'antd/lib/form'
import { loginApi, voucher } from '@api/index'
const { TextArea } = Input


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
  // const [imgUrl, setImgUrl] = useState<any>('')
  const [base64ImageUrl, setBase64ImageUrl] = useState<any>('')
  const formRef = useRef<any>(null)

  const submit = () => {
    formRef.current.validateFields()
      .then(values => {
        let name = values.ProfileName?.replace(/\s*/g, "")
        if (!name) return false
        setLoading(true)
        loginApi.updateLocalOrg({
          imageUrl: values.imageUrlText?.replace(/\s*/g, ""),
          profile: values.profileText?.replace(/(^\s*)|(\s*$)/g, ""),
          name: name
        }).then(res => {
          if (res.status == 0) {
            message.success(t('task.success'))
          }
          cancelLoading()
        })
      }).catch(err => {
        console.log(err);
      })
  }

  const cancelLoading = () => {
    setDisabled(true)
    setLoading(false)
    baseInfo?.fetchData(true)
  }

  useEffect(() => {
    if (disabled) {
      formRef.current!.setFieldsValue({
        ProfileName: baseInfo?.name,
        imageUrlText: baseInfo?.imageUrl,
        profileText: baseInfo?.profile,
      })
      // setImgUrl(baseInfo?.imageUrl)
    }
  }, [baseInfo])

  const edit = () => {
    if (baseInfo.status == 1) {
      message.info(t('UserCenter.DatumInfoEdit'))
      return
    }
    setDisabled(false)
  }


  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
      message.error(t('credential.pictureIncorrect'));
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error(`${t('credential.sizeLimit')}10M`);
      return false
    }
    return false
  };

  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      callback(reader.result as string)
    });
    reader.readAsDataURL(img);
  };

  const UpLoadImg = (info: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', info.file)
    voucher.inventoryUpLoadImg(formData).then(res => {
      const { data, status } = res
      if (status == 0) {
        getBase64(info.file, url => {
          setBase64ImageUrl(url);
        });
        formRef.current!.setFieldsValue({ imageUrlText: `${baseImgURls}ipfs/${data && data.replace('ipfs://', '') || ''}` })
      }
      setLoading(false)
    })
  }


  const uploadButton = (
    <div>
      {<PlusOutlined className="plus-icon" />}
      <div className="plus-tips">{t('UserCenter.ProfileHeadPlaceholder')}</div>
    </div>
  );

  return (<div className="layout-box p-20">
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
          className="form-item">
          {
            disabled || baseInfo.status == 1 ?
              <Image src={base64ImageUrl || baseInfo?.imageUrl || imgURl}
                height={100}
                width={300}
                onError={() => {
                  formRef.current!.setFieldsValue({
                    imageUrlText: imgURl,
                  })
                }}
                preview={{
                  src: base64ImageUrl || baseInfo?.imageUrl || imgURl
                }} fallback={baseInfo?.imageUrl || imgURl} />
              :
              <Upload
                accept="image/*"
                maxCount={1}
                listType="picture-card"
                style={{ borderColor: 'red', background: `linear-gradient(to top, rgba(255, 255, 255, .3), rgba(255, 255, 255, .3)), url(${baseInfo?.imageUrl || imgURl}) no-repeat;` }}
                className={base64ImageUrl ? 'avatar-uploader' : 'avatar-uploader avatar-bg'}
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={UpLoadImg}
              >
                {base64ImageUrl ? <img src={base64ImageUrl} alt="avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : uploadButton}
              </Upload>
          }
        </Form.Item>

        <Form.Item
          colon
          label={t('UserCenter.ProfileOrganizationIntroduction')}
          name="profileText"
          className="form-item">

          {disabled || baseInfo.status == 1 ?
            <p className='title' style={{
              paddingLeft: '11px', width: '100%',
              wordBreak: 'break-all'
            }}>{baseInfo?.profile}</p>
            :
            <TextArea autoSize={false} className="identfier-info-input"
              maxLength={200}
              showCount
              key={"ProfileOrganizationIntroduction"}
              placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} >
            </TextArea>
          }
        </Form.Item>


        <Form.Item colon={false} className="form-item" label={" "} style={{ paddingLeft: '11px' }}>
          {disabled ?
            <Button className="global-btn" onClick={() => edit()}>
              {t('UserCenter.ProfileButtonEdit')}
            </Button> : <>
              <Button className="global-btn" onClick={() => (setDisabled(true), baseInfo?.fetchData(true))}>
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