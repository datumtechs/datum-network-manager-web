import React, { FC } from 'react'
import { Descriptions, Input, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../../layout/components/Bread'
import FieldTable from './components/FieldTable'
import './scss/index.scss'

export const MetaDataDetail: FC<any> = () => {
  const { t } = useTranslation()
  const { TextArea } = Input;
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
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
