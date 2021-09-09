import { FC, useState, useEffect } from 'react'
import { Input, Space, Button, Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import MyFiledsTable from './MyFiledsTable'



export const EditText: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TextArea, } = Input
  const { editable, baseInfo } = props

  const handleEditable = () => {
    props.handleEditable(!editable)
  }

  return <>{editable ?
    <div style={{ "display": "flex" }}>
      <TextArea value={baseInfo.remarks} rows={4} />
      <div className="pl40 pointer no-warp edit-btn" onClick={handleEditable}>{t('common.cancel')}</div>
    </div>
    : <div style={{ "display": "flex" }}>
      <div className="text-area">TextAreaTextAreaTextAreaTextAreaTextArea,TextAreaTextAreaTextAreaTextAreaTextArea,TextAreaTextAreaTextAreaTextAreaTextArea
      </div>
      <div className="pl40 pointer no-warp edit-btn" onClick={handleEditable}>{t('common.edit')}</div>
    </div>
  }</>
}

// EditInput

export const EditInput: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TextArea, } = Input
  const { editInput, baseInfo } = props

  const handleEditInput = () => {
    props.handleEditInput(!editInput)
  }

  return <>{editInput ?
    <div style={{ "display": "flex" }}>
      <Input value={baseInfo.remarks} />
      <div className="pl40 pointer no-warp edit-btn" onClick={handleEditInput}>{t('common.cancel')}</div>
    </div>
    : <div style={{ "display": "flex" }}>
      <div className="text-area datail-box-content">1,1,1
      </div>
      <div className="pl40 pointer no-warp edit-btn" onClick={handleEditInput}>{t('common.edit')}</div>
    </div>
  }</>
}

export const DataDetail: FC<any> = (props: any) => {
  const { location } = props
  const { type, id } = location.state
  const [total, setTotal] = useState<number>()


  const [editable, editableSet] = useState<boolean>(false)
  const [editInput, editInputSet] = useState<boolean>(false)


  const [baseInfo, setBaseInfo] = useState({
    id: '',
    orgName: '',
    fileName: '',
    resourceName: '',
    fileId: '',
    status: '',
    metaDataId: '',
    filePath: '',
    size: '',
    rows: '',
    columns: '',
    remarks: '',
  })

  const [remarks, setRemarks] = useState('')
  const [originalData, setOriginalData] = useState([])
  const [tableData, setTableData] = useState<[]>()
  const [curPage, setCurPage] = useState<number>(1)
  const [upLoading, upLoadingSet] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const history = useHistory()
  const pagenation = {
    pagesize: 10,
  }
  const setPage = (page: number) => {
    setCurPage(page)
  }
  const getStatus = (status: string) => {
    if (status === '1') {
      return t('center.pulish')
    }
    return t('center.unPublish')
  }

  const handleEditable = (flag: boolean) => {
    editableSet(flag)
  }

  const handleEditInput = (flag: boolean) => {
    editInputSet(flag)
  }

  const goBackFn = () => { }
  const viewTask = () => {
    history.push({
      pathname: '/myData/dataMgt/dataDetail/dataDetailTask',
    })
  }
  const saveAndReturn = () => { }

  const onTextChange = () => {
    // setText
  }

  const onInputChange = () => {
    // setInput
  }

  return (<div className="layout-box">
    <div className="add-data-box">
      <div className="top-title-box">
        <p className="top-title-">{t('center.dataName')}:&nbsp;&nbsp;</p>
        <p>222222222222222222222222222222222</p>
      </div>
      <div className="top-title-box">
        <p>{t('center.metaDataID')}:&nbsp;&nbsp;</p>
        <p>222222222222222222222222222222222</p>
      </div>
      <div className="sub-info-box">
        <div className="sub-title-box">{t('center.basicInfo')}</div>
        <div className="limit-box pl12">
          <Form name="detail" labelAlign="left" form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}>
            <Row>
              <Col span={12}>
                <Form.Item label={t('center.metaStatus')}>
                  <p className="datail-box-content">1111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.lastUpdateTime')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.sourceName')}>
                  <p className="datail-box-content">1111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.sourceFileID')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.sourceFilePath')}>
                  <p className="datail-box-content">11111111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.dataSize')}>
                  <p className="datail-box-content">1111111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('center.rowNum')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('center.colNum')}>
                  <p className="datail-box-content">111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.taskNum')}>
                  <p className="datail-box-content">1111111111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.industryOfData')}>
                  {
                    type === 'view' ? <div className="text-area datail-box-content">1,2,3
                    </div> : <EditInput baseInfo={baseInfo} editInput={editInput} onChange={onInputChange} handleEditInput={handleEditInput} />
                  }
                </Form.Item>
              </Col>
            </Row>
            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 14 }} label={t('center.dataDesc')}>
              {
                type === 'view' ? <div className="text-area">TextAreaTextAreaTextAreaTextAreaTextArea,TextAreaTextAreaTextAreaTextAreaTextArea,TextAreaTextAreaTextAreaTextAreaTextArea
                </div> : <EditText baseInfo={baseInfo} editable={editable} onChange={onTextChange} handleEditable={handleEditable} />
              }
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="sub-info-box">
        <div className="sub-title-box">{t('center.fieldInfo')}</div>
        <MyFiledsTable
          originalData={originalData}
          tableData={tableData}
          total={total}
          type={type}
          setPage={setPage}
          loading={upLoading}
          curPage={curPage}
          row-key={re => re.columnIdx}
          mode="add"
        />
      </div>
      <div className="sub-info-box">
        <Space size={40} className="btn-group">
          <Button size="large" className="btn" onClick={goBackFn}>
            {t('common.return')}
          </Button>
          <Button size="large" className="btn green-btn" onClick={viewTask}>
            {t('myData.viewTask')}
          </Button>
          <Button size="large" className="btn" type="primary" onClick={saveAndReturn}>
            {t('common.submit')}
          </Button>
        </Space>
      </div>
    </div>
  </div >
  )
}
