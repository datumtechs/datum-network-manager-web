/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, useState, createRef, useEffect } from 'react'
import { Descriptions, Space, Form, Input, Radio, Button, message, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MyRadioBtn } from './MyRadioBtn'
import MyFiledsTable from './MyFiledsTable'
import { resourceApi } from '../../../../api/index'
import MyModal from '../../../../components/MyModal'
import MyTag from '../../../../components/MyTag'
import { INDUSTRYLIST } from '../../../../config/constant'

export const NewDataAddtion: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { Option } = Select
  const { location } = props
  const { type, id, filename } = location.state
  const [formDisable, setFormDiasble] = useState(false)
  const [uploadFile, setUploadFile] = useState<any>({})
  const [showTypeError, setShowTypeError] = useState<boolean>(false)
  const [showIncludeError, setShowIncludeError] = useState<boolean>(false)
  const [newDataName, newDataNameSet] = useState<string>('')
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

  const checkResourceName = name => {
    resourceApi.checkResourceName({ resourceName: name, metaDataId: resultFileData.metaDataId }).then(res => {
      if (res.status === 0) {
        showFilenameAvailableSet(true)
        isFileNameRightSet(res.data.status === 'Y')
      }
    })
  }

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
      .catch(error => {})
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
    curPage && setTableData(getShowSource(originalData))
  }, [curPage])

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
        setOriginalData(res.data?.localMetaDataColumnList)
        setTotal(res.data?.localMetaDataColumnList?.length)
        setTableData(getShowSource(res.data?.localMetaDataColumnList))
        resultFileDataSet(res.data)
        message.success(`${t('myData.uploadSuccess')}`)
      } else {
        // message.error(`${t('myData.uploadFailed')}`)
        message.error(res.msg)
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

  const onOnInputChange = () => {}

  return (
    <div className="layout-box">
      <div className="add-data-box">
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
          <div className="sub-info-box">
            <Form.Item label={t('myData.originalDataName')} className="sub-ori-name">
              <p>{filename}2222222222222222222222222222222222222222222</p>
            </Form.Item>
            <Form.Item label={t('myData.newDataName')}>
              <div className="form-group">
                <Form.Item noStyle>
                  <Input onBlur={e => checkResourceName(e.target.value)} value={newDataName} className="limit-box" />
                </Form.Item>
                {showFilenameAvailable &&
                  (isFileNameRight ? (
                    <MyTag content={`${t('tip.availableFilename')}`} bgColor="#B7EB8F" color="#45B854" />
                  ) : (
                    <MyTag content={`${t('tip.unavailableFilename')}`} bgColor="#FFA39E" color="#F45564" />
                  ))}
              </div>
            </Form.Item>
          </div>
          <div className="sub-info-box">
            <div className="title-box">{t('center.basicInfo')}</div>
            <Form.Item label={t('myData.sourceName')} name="sourceName">
              {/* <Input onBlur={e => checkResourceName(e.target.value)} className="limit-box" /> */}
              <p></p>
              {/* <div className="tips">{t('myData.nameTips')}</div> */}
            </Form.Item>
            <Form.Item label={t('myData.sourceFileID')} name="sourceName">
              <p></p>
            </Form.Item>
            <Form.Item label={t('myData.sourceFilePath')} name="sourceName">
              <p></p>
            </Form.Item>
            <Form.Item label={t('myData.industryOfData')}>
              <Form.Item name="sourceName" noStyle>
                <Select className="limit-box">
                  {INDUSTRYLIST.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {t(`myData.${item.text}`)}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Form.Item>
            <Form.Item label={t('center.dataDesc')} name="remarks">
              <Form.Item noStyle rules={[{ required: true, message: `${t('tip.plzInputDesc')}` }]}>
                <Input.TextArea className="limit-box" />
              </Form.Item>
            </Form.Item>
          </div>
          <div className="sub-info-box">
            <div className="title-box">{t('center.fieldInfo')}</div>
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
        </Form>
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
