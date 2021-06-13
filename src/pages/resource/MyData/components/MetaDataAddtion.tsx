import React, { FC, useState, createRef, useEffect } from 'react'
import { Descriptions, Input, Radio, Button, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../../../layout/components/Bread'
import { MyRadioBtn } from './MyRadioBtn'
import FieldTable from './FieldTable'

export const MetaDataAddtion: FC<any> = (porps) => {
  const { t } = useTranslation()
  const { TextArea } = Input;
  const [formDisable, setFormDiasble] = useState(false)
  const [uploadFile, setUploadFile] = useState<any>({})
  const [showTypeError, setShowTypeError] = useState<boolean>(false)

  const inputRef = createRef<any>()

  const selectFileFn = () => {
  }

  useEffect(() => {
    console.log(uploadFile);
    if (uploadFile.type !== ('text/csv')) {
      setShowTypeError(true)
    } else {
      setShowTypeError(false)
    }
  }, [uploadFile])


  const uploadFileOnChange = (e) => {
    const file = e.target.files[0]
    setUploadFile(file)
  }

  const [radioValue, setRadioValue] = useState(0)
  const changeFileIncludeStatusFn = (e: any) => {
    setRadioValue(e.target.value)
  }
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="add-info-box">
        <div className="title-box">
          {t('myData.plzUploadFile')}
        </div>
        <div className="label-box">
          <Radio.Group onChange={changeFileIncludeStatusFn} value={radioValue}>
            <Radio value={0} disabled={formDisable}>
              {t('myData.including')}
            </Radio>
            <Radio value={1} disabled={formDisable}>
              {t('myData.noIncluding')}
            </Radio>
          </Radio.Group>
        </div>
        <div className="label-box limit-box">
          <MyRadioBtn ref={inputRef} file={uploadFile} onSearch={selectFileFn} onChange={uploadFileOnChange} />
        </div>
      </div>
      <div className="info-box limitLine">
        <Descriptions column={2} title={`${t('center.basicInfo')}`} >
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('center.dataName')}>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('center.dataSize')}>111mb</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('center.metaDataID')}>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('center.rowNum')}>111mb</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('center.dataProvider')}>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('center.colNum')}>111mb</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('center.dataDesc')}>
            <TextArea rows={4} />
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="info-box">
        <Descriptions column={2} title={`${t('center.fieldInfo')}`} >
        </Descriptions>
        <FieldTable />
      </div>
    </div>
  )
}
