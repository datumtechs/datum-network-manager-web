import React, { FC, useState, createRef, useEffect } from 'react'
import { Descriptions, Space, Form, Input, Radio, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Bread from '../../../../layout/components/Bread'
import { MyRadioBtn } from './MyRadioBtn'
import MyFiledsTable from './MyFiledsTable'
import { resourceApi } from '../../../../api/index'

export const MyDataAddtion: FC<any> = porps => {
  const { t } = useTranslation()
  const [formDisable, setFormDiasble] = useState(false)
  const [uploadFile, setUploadFile] = useState<any>({})
  const [showTypeError, setShowTypeError] = useState<boolean>(false)
  const [showIncludeError, setShowIncludeError] = useState<boolean>(false)
  const [radioValue, setRadioValue] = useState('')
  const [total, setTotal] = useState<number>()
  const [originalData, setOriginalData] = useState([])
  const [tableData, setTableData] = useState<[]>()
  const [curPage, setCurPage] = useState<number>(1)
  const history = useHistory()
  const inputRef = createRef<any>()

  const pagenation = {
    pagesize: 10,
  }

  const selectFileFn = () => { }
  const goBackFn = () => {
    history.go(-1)
  }
  const submitFn = () => {
    console.log('submit')
  }
  const getShowSource = (data) => {
    return data.slice((curPage - 1) * pagenation.pagesize, curPage * pagenation.pagesize)
  }
  useEffect(() => {
    if (inputRef?.current?.input?.files?.length > 0 && uploadFile.name.split('.')[1] !== 'csv') {
      setShowTypeError(true)
    } else {
      setShowTypeError(false)
    }
  }, [uploadFile])
  const setPage = (page: number) => {
    setCurPage(page);
  }
  const uploadFn = () => {
    // 判断文件是否为空 判断是否选择了包含字段
    if (!radioValue) {
      setShowIncludeError(true)
      return
    }
    if (inputRef?.current?.input?.files?.length === 0) {
      message.error('Please select a file first')
    } else if (showTypeError) {
      setShowTypeError(true)
    }

    const form = new FormData()
    form.append('file', uploadFile)
    form.append('hasTitle', radioValue)
    resourceApi.uploadCsv(form).then(res => {
      setOriginalData([])
      setTotal(15)
      setTableData(getShowSource([]))
    })
  }

  const uploadFileOnChange = e => {
    const file = e.target.files[0]
    setUploadFile(file)
  }

  const changeFileIncludeStatusFn = (e: any) => {
    setShowIncludeError(false)
    setRadioValue(e.target.value)
  }
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="add-info-box">
        <div className="title-box">{t('myData.plzUploadFile')}</div>
        <div className="label-box">
          <Radio.Group onChange={changeFileIncludeStatusFn} value={radioValue}>
            <Radio value='true' disabled={formDisable}>
              {t('myData.including')}
            </Radio>
            <Radio value='false' disabled={formDisable}>
              {t('myData.noIncluding')}
            </Radio>
          </Radio.Group>
          {showIncludeError ? <p className="note-box">{t('myData.plzAnnounceIncludesFields')}</p> : ''}
        </div>
        <div className="label-box limit-box">
          <MyRadioBtn
            ref={inputRef}
            file={uploadFile}
            onSearch={selectFileFn}
            uploadFn={uploadFn}
            onChange={uploadFileOnChange}
          />
          {showTypeError ? <p className="note-box">{t('myData.onlyCsv')}</p> : ''}
        </div>
      </div>
      <div className="add-info-box">
        <div className="title-box">{t('myData.plzConfigureMetaData')}</div>
        <div className="sub-info-box">
          <div className="title-box">{t('center.basicInfo')}</div>
          <div>
            <Form
              name="basic"
              labelAlign="left"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label={t('myData.sourceName')}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Form.Item name="sourceName">
                  <Input className="limit-box" />
                </Form.Item>
                <div className="tips">{t('myData.nameTips')}</div>
              </Form.Item>

              <Form.Item
                label={t('center.dataDesc')}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.TextArea className="limit-box" />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="sub-info-box">
          <div className="title-box">{t('center.fieldInfo')}</div>
          <div>
            <MyFiledsTable originalData={originalData} tableData={tableData} total={total} setPage={setPage} curPage={curPage} mode='add' />
          </div>
        </div>
      </div>
      <div className="add-info-box">
        <Space size={40} className="btn-group">
          <Button size="large" className="btn" onClick={goBackFn}>
            {t('common.return')}
          </Button>
          <Button size="large" className="btn" type="primary" onClick={submitFn}>
            {t('common.submit')}
          </Button>
        </Space>
      </div>
    </div>
  )
}
