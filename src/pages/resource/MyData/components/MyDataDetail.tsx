/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC, useEffect, useState, memo } from 'react'
import { Descriptions, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import Bread from '../../../../layout/components/Bread'
import DetailTable from './DetailTable'
import MyFiledsTable from './MyFiledsTable'
import { resourceApi } from '../../../../api/index'
import '../scss/editTable.scss'

const MyData: FC<any> = porps => {
  const { TextArea } = Input
  const { location } = porps
  const { type, id } = location.state

  const [total, setTotal] = useState<number>()
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
  const [originalData, setOriginalData] = useState([])

  const [tableData, setTableData] = useState<[]>()

  const { t } = useTranslation()

  const pagenation = {
    pagesize: 10
  }

  const [curPage, setCurPage] = useState<number>(1)
  const getShowSource = (data) => {
    return data.slice((curPage - 1) * pagenation.pagesize, curPage * pagenation.pagesize)
  }

  useEffect(() => {
    curPage && setTableData(getShowSource(originalData))
  }, [curPage])



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
      setOriginalData(res.data.localMetaDataColumnList)
      setTableData(getShowSource(res.data.localMetaDataColumnList))
      setTotal(res.data.localMetaDataColumnList.length)
    })
  }



  const setPage = (page: number) => {
    setCurPage(page);
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
        {type === 'view' ? <DetailTable tableData={tableData} total={total} setPage={setPage} curPage={curPage} />
          : <MyFiledsTable originalData={originalData} tableData={tableData} total={total} setPage={setPage} curPage={curPage} mode="edit" />}
      </div>
    </div>
  )
}
export const MyDataDetail = memo(MyData)