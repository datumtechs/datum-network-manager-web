/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, useState, createRef, useEffect, useRef } from 'react'
import { Tooltip, Space, Form, Input, Radio, Button, message, Select, Checkbox } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QuestionCircleOutlined } from '@ant-design/icons'
import MyFiledsTable from '@com/MyFiledsTable'
import MyModal from '@com/MyModal'
import MyTag from '@com/MyTag'
import { resourceApi } from '@api/index'
import { INDUSTRYLIST } from '@constant/constant'
import MyDragger from '../DataMgt/components/MyDragger'

export const MyDataAddtion: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { state } = props.location
  const { Option } = Select
  // const [formDisable, setFormDiasble] = useState(false)
  // const [showIncludeError, setShowIncludeError] = useState<boolean>(false)

  const [industry, industrySet] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<any>({})
  const [showTypeError, setShowTypeError] = useState<boolean>(false)
  const [radioValue, setRadioValue] = useState('true')
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

  const [addType, addTypeSet] = useState<string>('add')

  const [uploadProgress, uploadProgressSet] = useState<number>(0)

  useEffect(() => {
    if (state?.type) {
      addTypeSet(state.type)
    }
  }, [state])


  const pagenation = {
    pagesize: 10,
  }

  const checkResourceName = name => {
    showFilenameAvailableSet(false)
    if (!name) return;
    resourceApi.checkResourceName({ resourceName: name, metaDataId: resultFileData.metaDataId }).then(res => {
      if (res.status === 0) {
        showFilenameAvailableSet(true)
        isFileNameRightSet(true)
      } else {
        showFilenameAvailableSet(false)
        isFileNameRightSet(false)
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
        const flag = originalData.some((v: any) => v.visible)
        if (!flag) {
          message.warning(`${t('myData.FieldVisibilityTips')}`)
          return
        }
        let index = -1
        originalData.some((v: any, i) => {
          if (!v.columnName) {
            index = i
            return true
          }
        })
        if (index > -1) {
          index += 1
          message.warning(`${i18n.language === 'zh' ? `第${index}行` : `${index} column `}${t('myData.sourceFileFields')}`)
          return
        }


        const queryObj = {
          addType: addType === 'add' ? 1 : 2,
          localMetaDataColumnList: originalData,
          fileId: resultFileData.fileId,
          industry,
          remarks: form.getFieldValue('remarks'),
          resourceName: form.getFieldValue('sourceName'),
        }
        resourceApi.addLocalMetaData(queryObj).then(res => {
          if (res.status === 0) {
            message.success(`${t('tip.addMetaDataSuccess')}`)
            history.push('/myData')
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  const getShowSource = data => {
    if (!data) return
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
    if (resultFileData && Object.keys(resultFileData).length > 0) {
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
    if (evt.lengthComputable) {
      const percent = Math.round(evt.loaded * 100 / evt.total);
      uploadProgressSet(percent)
    }
  }

  const filterData = list => {
    if (!list || list && !list.length) {
      return []
    }
    return list.map(v => {
      v.visible = true
      v.columnType = v.columnType || 'STRING'
      return { ...v }
    })
  }


  const uploadFn = () => {
    upLoadingSet(true)
    if (!uploadFile.size) {
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
      setCurPage(1)
      if (res.status === 0) {
        const list = filterData(res.data?.localMetaDataColumnList)
        setOriginalData(list)
        setTotal(list.length)
        setTableData(getShowSource(list))
        resultFileDataSet(res.data)
        message.success(`${t('myData.uploadSuccess')}`)
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

  // const changeFileIncludeStatusFn = (e: any) => {
  //   // setShowIncludeError(false)
  //   setRadioValue(e.target.value)
  // }

  const handleSelectChange = (value: any) => {
    industrySet(value)
  }

  return (
    <div className="layout-box">
      <div className="add-data-box">
        <div className="title-box bold-ident">{t('myData.plzUploadFile')}</div>
        {/* <div className="label-box">
          <Radio.Group onChange={changeFileIncludeStatusFn} value={radioValue}>
            <Radio value="true" disabled={formDisable}>
              {t('myData.including')}
            </Radio>
            <Radio value="false" disabled={formDisable}>
              {t('myData.noIncluding')}
            </Radio>
          </Radio.Group>
          {showIncludeError ? <p className="note-box">{t('myData.plzAnnounceIncludesFields')}</p> : ''}
        </div> */}
        <div className="label-box limit-box">
          <MyDragger
            ref={draggerRef}
            file={uploadFile}
            uploadProgress={uploadProgress}
            onSearch={selectFileFn}
            maxSize={10}
            uploadFn={uploadFn}
            uploadByDrag={uploadByDrag}
            onChange={uploadFileOnChange}
          />
          {showTypeError ? <p className="note-box">{t('myData.onlyCsv')}</p> : ''}
        </div>
      </div>
      <div className="add-data-box">
        <div className="title-box mb20 bold-ident">{t('myData.plzConfigureMetaData')}</div>
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
            >
              <Form.Item label={t('myData.dataName')}>
                <Form.Item
                  name="sourceName"
                  noStyle
                  rules={[{ min: 8, message: `${t('myData.dataNameTooltipThree')}` },
                  { required: true, message: `${t('tip.plzInputName')}` }]}
                >
                  <Input size="large" minLength={8} maxLength={64} className="width457" onBlur={e => checkResourceName(e.target.value)} />
                </Form.Item>

                <Space size={20} className="pl20">
                  <Tooltip placement="topLeft" title={<div>
                    {t('myData.dataNameTooltip')} <br />
                    {t('myData.dataNameTooltipOne')}<br />
                    {t('myData.dataNameTooltipTwo')}<br />
                    3. {t('myData.dataNameTooltipThree')};<br />
                    {t('myData.dataNameTooltipFour')}<br />
                    {t('myData.dataNameTooltipFive')}<br />
                  </div>}>
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
              <Form.Item label={t('myData.industryOfData')}>
                <Form.Item name="industry" noStyle rules={[{ required: true, message: `${t('tip.plzSelectIndustry')}` }]}>
                  <Select size="large" onChange={handleSelectChange} className="limit-box width457">
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
              <Form.Item
                label={t('center.dataDesc')}
              >
                <Form.Item name="remarks" noStyle rules={[{ required: true, message: `${t('tip.plzInputDesc')}` }]}>
                  <Input.TextArea maxLength={100} className="width457 limit-box" />
                </Form.Item>
              </Form.Item>
              <Form.Item
                label={t('center.usageScene')}
              >
                <div style={{ display: 'flex', alignItems: "center" }}>
                  <Form.Item name="usageScene" initialValue="ciphertext" noStyle
                    rules={[{ required: true, message: `${t('center.pleaseSelect')}${t('center.usageScene')}` }]}>
                    <Checkbox.Group>
                      <Checkbox value="plaintext">{t('center.Plaintext')}</Checkbox>
                      <Checkbox value="ciphertext">{t('center.ciphertext')}</Checkbox>

                    </Checkbox.Group>
                  </Form.Item>
                  <Tooltip placement="topLeft" title={
                    <div>
                      {t('center.ciphertextAndPlaintextTipsOne')} <br />
                      {t('center.ciphertextAndPlaintextTipsTwo')} <br />
                      {t('center.ciphertextAndPlaintextTipsThree')} <br />
                    </div>
                  }>
                    <QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588', lineHeight: '20px' }} />
                  </Tooltip>
                </div>
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
      <style>
        {`
          .bold-ident{
            font-weight: 600;
            font-size: 15px !important;
        }
      ` }
      </style>
    </div>
  )
}
