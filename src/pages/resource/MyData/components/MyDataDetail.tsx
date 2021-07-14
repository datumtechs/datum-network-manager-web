import React, { FC, useEffect, useState } from 'react'
import { Descriptions, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../../../layout/components/Bread'
import DetailTable from './DetailTable'
import MyFiledsTable from './MyFiledsTable'
import { resourceApi } from '../../../../api/index'
import '../scss/editTable.scss'

export const MyDataDetail: FC<any> = porps => {
  const { TextArea } = Input
  const { location } = porps
  const { type, id } = location.state

  const [baseInfo, setBaseInfo] = useState({
    fileName: '',
    fileId: '',
    status: '',
    metaDataID: '',
    filePath: '',
    size: '',
    rows: '',
    columns: '',
    description: '',
  })

  const [tableData, SetTableData] = useState<[]>()

  const { t } = useTranslation()

  const initData = () => {
    resourceApi.queryMetaDataDetail(id).then(res => {
      console.log(res)
    })
  }

  useEffect(() => {
    initData()
  }, [])
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="add-info-box limitLine">
        {type === 'view' ? (
          <Descriptions column={2} title={`${t('center.basicInfo')}`}>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('myData.sourceName')}>
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.metaStatus')}>
              111mb
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('myData.sourceFileID')}>
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.metaDataID')}>
              111mb
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('myData.sourceFilePath')}>
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.dataSize')}>
              111mb
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.rowNum')}>
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.colNum')}>
              111mb
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.dataDesc')}>
              <TextArea value="11111111111111" disabled rows={4} />
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Descriptions column={1} title={`${t('center.basicInfo')}`}>
            <Descriptions.Item span={4} labelStyle={{ padding: '0 20px' }} label={t('myData.sourceName')}>
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item span={4} labelStyle={{ padding: '0 20px' }} label={t('myData.sourceFileID')}>
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item span={4} labelStyle={{ padding: '0 20px' }} label={t('center.dataDesc')}>
              <TextArea value="11111111111111" rows={4} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
      <div className="info-box">
        <Descriptions column={2} title={`${t('center.fieldInfo')}`}></Descriptions>
        {type === 'view' ? <DetailTable /> : <MyFiledsTable mode="edit" />}
      </div>
    </div>
  )
}
