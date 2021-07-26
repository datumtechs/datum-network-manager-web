/* eslint-disable no-nested-ternary */
import React, { FC, useState, createRef, useEffect } from 'react'
import { Descriptions, Space, Form, Input, Radio, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Bread from '../../../../layout/components/Bread'
import { MyRadioBtn } from './MyRadioBtn'
import MyFiledsTable from './MyFiledsTable'
import { resourceApi } from '../../../../api/index'
import MyModal from '../../../../components/MyModal'

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
  const [upLoading, upLoadingSet] = useState(false)
  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const [resultFileData, resultFileDataSet] = useState<any>({})
  const [form] = Form.useForm()
  const [isFileNameRight, isFileNameRightSet] = useState<boolean>(false)
  const [showFilenameAvailable, showFilenameAvailableSet] = useState<boolean>(false)

  const pagenation = {
    pagesize: 10,
  }

  const checkResourceName = filename => {
    resourceApi.checkResourceName({ resourceName: filename, metaDataId: resultFileData.metaDataId }).then(res => {
      if (res.status === 0) {
        showFilenameAvailableSet(true)
        isFileNameRightSet(res.data.status === 'Y')
      }
    })
  }
  console.log(isFileNameRight, 'isFileNameRight')

  const selectFileFn = () => {}
  const goBackFn = () => {
    isModalVisibleSet(true)
  }
  const handleCancel = () => {
    isModalVisibleSet(false)
  }
  const handleOk = () => {
    history.go(-1)
  }
  const submitFn = () => {
    console.log('未做判空')
    if (!radioValue) {
      setShowIncludeError(true)
      upLoadingSet(false)
      return message.error(`${t('tip.plzComplete')}`)
    }
    if (inputRef?.current?.input?.files?.length === 0) {
      upLoadingSet(false)
      return message.error(`${t('myData.plzSelectone')}`)
    }
    if (showTypeError) {
      setShowTypeError(true)
      upLoadingSet(false)
      return
    }

    form
      .validateFields()
      .then(re => {
        const queryObj = {
          localMetaDataColumnList: originalData,
          id: resultFileData.id,
          remarks: form.getFieldValue('remarks'),
          resourceName: form.getFieldValue('sourceName'),
        }
        resourceApi.addMetaData(queryObj).then(res => {
          if (res.status === 0) {
            message.success(`${t('tip.addMetaDataSuccess')}`)
            history.push('/resource/myData')
          } else {
            message.error(res.msg)
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  // TODO type
  const getShowSource = data => {
    return data.slice((curPage - 1) * pagenation.pagesize, curPage * pagenation.pagesize)
  }
  useEffect(() => {
    if (inputRef?.current?.input?.files?.length > 0 && uploadFile.name.split('.')[1] !== 'csv') {
      setShowTypeError(true)
    } else {
      setShowTypeError(false)
    }
  }, [uploadFile])

  useEffect(() => {
    if (Object.keys(resultFileData).length > 0) {
      form.setFieldsValue({
        sourceName: resultFileData.resourceName,
        remarks: resultFileData.remarks,
      })
    }
  }, [resultFileData])

  const setPage = (page: number) => {
    setCurPage(page)
  }
  const uploadFn = () => {
    upLoadingSet(true)
    // 判断文件是否为空 判断是否选择了包含字段
    if (!radioValue) {
      setShowIncludeError(true)
      upLoadingSet(false)
      return message.error(`${t('tip.plzComplete')}`)
    }

    if (inputRef?.current?.input?.files?.length === 0) {
      upLoadingSet(false)
      return message.error(`${t('myData.plzSelectone')}`)
    }
    if (showTypeError) {
      setShowTypeError(true)
      upLoadingSet(false)
      return
    }

    const formData = new FormData()
    formData.append('file', uploadFile)
    formData.append('hasTitle', radioValue)
    resourceApi.uploadCsv(formData).then(res => {
      upLoadingSet(false)
      if (res.status === 0) {
        setOriginalData(res.data.localMetaDataColumnList)
        setTotal(res.data.rows)
        setTableData(getShowSource(res.data.localMetaDataColumnList))
        resultFileDataSet(res.data)
        message.success(`${t('myData.uploadSuccess')}`)
      } else {
        message.error(`${t('myData.uploadFailed')}`)
      }
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
            <Radio value="true" disabled={formDisable}>
              {t('myData.including')}
            </Radio>
            <Radio value="false" disabled={formDisable}>
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
              form={form}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item label={t('myData.sourceName')}>
                <Space size={20}>
                  <Form.Item
                    name="sourceName"
                    noStyle
                    rules={[{ required: true, message: `${t('tip.plzInputName')}` }]}
                  >
                    <Input onBlur={e => checkResourceName(e.target.value)} className="limit-box" />
                  </Form.Item>
                  {showFilenameAvailable &&
                    (isFileNameRight ? (
                      <span className="success_color">{`${t('tip.availableFilename')}`}</span>
                    ) : (
                      <span className="failed_color"> {`${t('tip.unavailableFilename')}`}</span>
                    ))}
                </Space>
                <div className="tips">{t('myData.nameTips')}</div>
              </Form.Item>

              <Form.Item
                label={t('center.dataDesc')}
                name="remarks"
                rules={[{ required: true, message: `${t('tip.plzInputDesc')}` }]}
              >
                <Input.TextArea className="limit-box" />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="sub-info-box">
          <div className="title-box">{t('center.fieldInfo')}</div>
          <div>
            <MyFiledsTable
              originalData={originalData}
              tableData={tableData}
              total={total}
              setPage={setPage}
              loading={upLoading}
              curPage={curPage}
              row-key={re => re.columnIdx}
              mode="add"
            />
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
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{`${t('tip.leaveCofirm')}`}</p>
      </MyModal>
    </div>
  )
}
