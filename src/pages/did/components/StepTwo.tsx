import { FC, useState } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Form, Input, message,
  Steps, Row, Col, Upload, Image
} from 'antd'
import clean from '@assets/images/clean.icon.svg'
import { PlusOutlined, MinusCircleFilled } from '@ant-design/icons'



export const StepTwo: FC<any> = (props) => {
  const { t, i18n } = useTranslation(),
    [baseInfo, setBaseInfo] = useState({ name: 1, orgIdentify: 1 }),
    [file, setFile] = useState<any>(''),
    [fileBase, setFileBase] = useState<any>(''),
    [TextAreaValue, setTextAreaValue] = useState('')
  const { TextArea } = Input,
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
    },
    delFile = () => {
      setFile('')
      setFileBase('')
    }

  return <>
    <p className="title center set-your-org-name-title">{t('UserCenter.OrganizationApplicationSucceeded')}</p>
    <p className="identifier">
      <span className="lable" style={{ width: i18n.language === 'en' ? "170px" : "100px" }}>{t("common.orgName")}：</span>
      <span className="content">{baseInfo.name}</span>
    </p>
    <p className="identifier">
      <span className="lable" style={{ width: i18n.language === 'en' ? "170px" : "100px" }}>{t("common.orgIdentify")}：</span>
      <span className="content">{baseInfo.orgIdentify}</span>
    </p>
    <Row gutter={16} justify="space-between">
      <hr />
      <Col push={2} span={9}>
        <p className="identfier-info-lable">{t('DidApplication.SetYourHead')}：</p>
        <Dragger
          className="info-dragger"
          disabled={!!file}
          {...DraggerProps}
        >
          {!file ? <PlusOutlined /> : <Image src={fileBase} className="head-img" />}
          {!file ? <p>{t("DidApplication.SetYourHeadIips")}</p> : <p className="head-img-lable">{file?.name || ''}</p>}
        </Dragger>
        {!!file ? <MinusCircleFilled onClick={delFile} className="del" /> : ''}
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
      <Button type="primary" className="but">
        {t('common.submit')}
      </Button>
      <Button className="but" onClick={_ => props.setCurrent(2)}>
        {t('DidApplication.SetLater')}
      </Button>
    </div>
  </>
}