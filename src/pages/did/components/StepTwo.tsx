import { FC, useState } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Input, message,
  Row, Col
} from 'antd'
import { loginApi } from '@api/index'
import clean from '@assets/images/clean.icon.svg'



export const StepTwo: FC<any> = (props) => {
  const { t, i18n } = useTranslation(),
    [imgUrl, setImgUrl] = useState<any>(props.baseInfo.imageUrl || 'https://pica.zhimg.com/v2-f2af5e9e6f2d26b4c31e070c6a38c380_1440w.jpg'),
    [TextAreaValue, setTextAreaValue] = useState(props.baseInfo.profile)
  const { TextArea } = Input


  const submit = () => {
    // props.setCurrent(2)
    // props.InfoCompleteness(2, 0)
    // return
    loginApi.updateLocalOrg({ imageUrl: imgUrl && imgUrl.replace(/\s*/g, ""), profile: TextAreaValue && TextAreaValue.replace(/(^\s*)|(\s*$)/g, ""), name: props?.baseInfo?.name }).then(res => {
      if (res.status == 0) {
        props.setCurrent(2)
        props.InfoCompleteness(2, 0)
      }
    })
  }


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
        <TextArea autoSize={false} className="identfier-info-input"
          value={imgUrl}
          onChange={_ => setImgUrl(_.target.value)}
          placeholder={t('UserCenter.ProfileHeadPlaceholder')} >
        </TextArea>
        {imgUrl ? <img src={clean} onClick={() => setImgUrl('')} className="clean" /> : ''}
      </Col>
      <Col pull={2} span={9}>
        <p className="identfier-info-lable">{t('DidApplication.SetYourIntroduction')}：</p>
        <TextArea autoSize={false} className="identfier-info-input"
          value={TextAreaValue}
          onChange={_ => setTextAreaValue(_.target.value)}
          placeholder={t('UserCenter.ProfileIntroductionPlaceholder')} >
        </TextArea>
        {TextAreaValue ? <img src={clean} onClick={() => setTextAreaValue('')} className="clean" /> : ''}
      </Col>
    </Row>
    <div className="center">
      <Button type="primary" className="but" onClick={submit}>
        {t('common.submit')}
      </Button>
      <Button className="but" onClick={_ => props.setCurrent(2)}>
        {t('DidApplication.SetLater')}
      </Button>
    </div>
  </>
}