/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, useState, createRef, useEffect, useRef } from 'react'
import { Tooltip, Space, Form, Input, Radio, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QuestionCircleOutlined } from '@ant-design/icons'
import MyDragger from '../DataMgt/components/MyDragger'
import MyFiledsTable from '../../../components/MyFiledsTable'
import { resourceApi } from '../../../api/index'
import MyModal from '../../../components/MyModal'
import MyTag from '../../../components/MyTag'

export const MyDataAddtion: FC<any> = (props: any) => {
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
  const draggerRef = useRef<any>(null)
  const [upLoading, upLoadingSet] = useState(false)
  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const [resultFileData, resultFileDataSet] = useState<any>({})
  const [form] = Form.useForm()
  const [isFileNameRight, isFileNameRightSet] = useState<boolean>(false)
  const [showFilenameAvailable, showFilenameAvailableSet] = useState<boolean>(false)

  const [uploadProgress, uploadProgressSet] = useState<number>(0)


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

  const selectFileFn = () => { }
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
    if (draggerRef?.current?.input?.files?.length === 0) {
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
          id: resultFileData.metaDataPKId,
          industry: 1,
          remarks: form.getFieldValue('remarks'),
          resourceName: form.getFieldValue('sourceName'),
        }
        resourceApi.addMetaData(queryObj).then(res => {
          if (res.status === 0) {
            message.success(`${t('tip.addMetaDataSuccess')}`)
            history.push('/myData')
          } else {
            message.error(res.msg)
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  // TODO type
  const getShowSource = data => {
    return data.slice((curPage - 1) * pagenation.pagesize, curPage * pagenation.pagesize)
  }
  useEffect(() => {
    if (draggerRef?.current?.input?.files?.length > 0 && uploadFile.name.split('.')[1] !== 'csv') {
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

  const _uploadProgress = (evt) => {
    console.log(evt, "evt===========>");

    if (evt.lengthComputable) {
      const percent = Math.round(evt.loaded * 100 / evt.total);
      uploadProgressSet(percent)
      // document.getElementById('progress').innerHTML = percent.toFixed(2) + '%';//设置进度显示百分比
      // document.getElementById('progress').style.width = percent.toFixed(2) + '%';//设置完成的进度条宽度
    }
    else {
      // document.getElementById('progress').innerHTML = 'unable to compute';
    }
  }
  const uploadFn = () => {
    upLoadingSet(true)
    // 判断文件是否为空 判断是否选择了包含字段
    if (!radioValue) {
      setShowIncludeError(true)
      upLoadingSet(false)
      return message.error(`${t('tip.plzComplete')}`)
    }

    if (draggerRef?.current?.input?.files?.length === 0) {
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
    resourceApi.uploadCsv({ data: formData, fn: _uploadProgress }).then(res => {
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
    }).catch(e => {
      console.log(e);

    })
  }

  const uploadFileOnChange = e => {
    const file = e.target.files[0]
    setUploadFile(file)
  }

  const uploadByDrag = e => {
    const file = e.dataTransfer.files[0]
    setUploadFile(file)
  }

  const changeFileIncludeStatusFn = (e: any) => {
    setShowIncludeError(false)
    setRadioValue(e.target.value)
  }

  return (
    <div className="layout-box">
      <div className="add-data-box">
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
          <MyDragger
            ref={draggerRef}
            file={uploadFile}
            uploadProgress={uploadProgress}
            onSearch={selectFileFn}
            uploadFn={uploadFn}
            uploadByDrag={uploadByDrag}
            onChange={uploadFileOnChange}
          />
          {showTypeError ? <p className="note-box">{t('myData.onlyCsv')}</p> : ''}
        </div>
      </div>
      <div className="add-data-box">
        <div className="title-box mb20">{t('myData.plzConfigureMetaData')}</div>
        <div className="sub-info-box">
          <div className="sub-title-box">{t('center.basicInfo')}</div>
          <div className="pl12">
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
                <Form.Item
                  name="sourceName"
                  noStyle
                  rules={[{ required: true, message: `${t('tip.plzInputName')}` }]}
                >
                  <Input size="large" className="width457" onBlur={e => checkResourceName(e.target.value)} />
                </Form.Item>

                <Space size={20} className="pl20">
                  <Tooltip placement="topLeft" title={t('myData.dataNameTooltip')}>
                    <QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588' }} />
                  </Tooltip>
                  {showFilenameAvailable &&
                    (isFileNameRight ? (
                      <MyTag content={t('tip.availableFilename')} bgColor="#B7EB8F" color="#45B854" />
                    ) : (
                      <MyTag content={t('tip.unavailableFilename')} bgColor="#FFA39E" color="#F45564" />
                    ))}
                </Space>

              </Form.Item>
              <Form.Item
                label={t('center.dataDesc')}
              >
                <Form.Item name="remarks" noStyle rules={[{ required: true, message: `${t('tip.plzInputDesc')}` }]}>
                  <Input.TextArea className="width457 limit-box" />
                </Form.Item>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="sub-info-box">
          <div className="sub-title-box spaceBetween">
            {t('center.fieldInfo')}
            <Tooltip placement="topLeft" title={t('myData.fieldInfoTooltip')}>
              <QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588' }} />
            </Tooltip>
          </div>
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
      <div className="sub-info-box mb40">
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
