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
    metaDataId: '',
    filePath: '',
    size: '',
    rows: '',
    columns: '',
    remarks: '',
  })

  const [tableData, SetTableData] = useState<[]>()

  const { t } = useTranslation()

  const initData = () => {
    resourceApi.queryMetaDataDetail(id).then(res => {
      console.log(res)
      setBaseInfo({
        fileName: res.data.fileName,
        fileId: res.data.fileId,
        status: res.data.status,
        metaDataId: res.data.metaDataId,
        filePath: res.data.filePath,
        size: res.data.size,
        rows: res.data.rows,
        columns: res.data.columns,
        remarks: res.data.remarks,
      })
      SetTableData(res.data.localMetaDataColumnList)
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
              {baseInfo.fileName}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.metaStatus')}>
              {baseInfo.status}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('myData.sourceFileID')}>
              {baseInfo.fileId}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.metaDataID')}>
              {baseInfo.metaDataId}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('myData.sourceFilePath')}>
              {baseInfo.filePath}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.dataSize')}>
              {baseInfo.size}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.rowNum')}>
              {baseInfo.rows}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.colNum')}>
              {baseInfo.columns}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('center.dataDesc')}>
              <TextArea value={baseInfo.remarks} disabled rows={4} />
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Descriptions column={1} title={`${t('center.basicInfo')}`}>
            <Descriptions.Item span={4} labelStyle={{ padding: '0 20px' }} label={t('myData.sourceName')}>
              {baseInfo.fileName}
            </Descriptions.Item>
            <Descriptions.Item span={4} labelStyle={{ padding: '0 20px' }} label={t('myData.sourceFileID')}>
              {baseInfo.fileId}
            </Descriptions.Item>
            <Descriptions.Item span={4} labelStyle={{ padding: '0 20px' }} label={t('center.dataDesc')}>
              <TextArea value={baseInfo.remarks} rows={4} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
      <div className="info-box">
        <Descriptions column={2} title={`${t('center.fieldInfo')}`}></Descriptions>
        {type === 'view' ? <DetailTable tableData={tableData} /> : <MyFiledsTable tableData={tableData} mode="edit" />}
      </div>
    </div>
  )
}
