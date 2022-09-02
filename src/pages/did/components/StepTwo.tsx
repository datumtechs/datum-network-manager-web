import { FC, useState } from "react";
import { useTranslation } from 'react-i18next'
import { Button, Input, Row, Col, Upload, message } from 'antd'
import { loginApi, voucher } from '@api/index'
import clean from '@assets/images/clean.icon.svg'
import { imgURls, baseImgURls } from '@utils/utils'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'



export const StepTwo: FC<any> = (props) => {
  const { t, i18n } = useTranslation(),
    [imgUrl, setImgUrl] = useState<any>(props.baseInfo.imageUrl),
    [base64ImageUrl, setBase64ImageUrl] = useState<any>(''),
    [TextAreaValue, setTextAreaValue] = useState(props.baseInfo.profile)
  const { TextArea } = Input
  const [loading, setLoading] = useState(false)

  const submit = () => {
    loginApi.updateLocalOrg({ imageUrl: imgUrl || imgURls, profile: TextAreaValue && TextAreaValue.replace(/(^\s*)|(\s*$)/g, ""), name: props?.baseInfo?.name }).then(res => {
      if (res.status == 0) {
        props.setCurrent(4)
        props.InfoCompleteness(4, 0)
      }
    })
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
        setImgUrl(`${baseImgURls}ipfs/${data && data.replace('ipfs://', '') || ''}`)
      }
      setLoading(false)
    })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined className="plus-icon" />}
      <div className="plus-tips">{t('UserCenter.ProfileHeadPlaceholder')}</div>
    </div>
  );

  return <>
    <p className="title center set-your-org-name-title">{t('UserCenter.OrganizationApplicationSucceeded')}</p>
    <p className="identifier">
      <span className="lable" style={{ width: i18n.language === 'en' ? "170px" : "100px" }}>{t("common.orgName")}：</span>
      <span className="content">{props?.baseInfo?.name}</span>
    </p>
    <p className="identifier">
      <span className="lable" style={{ width: i18n.language === 'en' ? "170px" : "100px" }}>{t("common.orgIdentify")}：</span>
      <span className="content">{props?.baseInfo?.identityId}</span>
    </p>
    <Row gutter={16} justify="space-between">
      <hr />
      <Col push={2} span={9}>
        <p className="identfier-info-lable">{t('DidApplication.SetYourHead')}：</p>
        <Upload
          accept="image/*"
          maxCount={1}
          listType="picture-card"
          className={imgUrl ? 'avatar-uploader' : 'avatar-uploader avatar-bg'}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={UpLoadImg}
        >
          {imgUrl ? <img src={base64ImageUrl || imgUrl} alt="avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : uploadButton}
        </Upload>
      </Col>
      <Col pull={2} span={9}>
        <p className="identfier-info-lable">{t('DidApplication.SetYourIntroduction')}：</p>
        <TextArea autoSize={false} className="identfier-info-input"
          value={TextAreaValue}
          maxLength={200}
          showCount
          onChange={_ => setTextAreaValue(_.target?.value ? _.target?.value.replace(/\s*/g, "") : '')}
          placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} >
        </TextArea>
        {TextAreaValue ? <img src={clean} onClick={() => setTextAreaValue('')} className="clean" /> : ''}
      </Col>
    </Row>
    <div className="center">
      <Button type="primary" className="but" onClick={submit}>
        {t('common.submit')}
      </Button>
      <Button className="but" onClick={_ => props.setCurrent(4)}>
        {t('DidApplication.SetLater')}
      </Button>
    </div>
  </>
}