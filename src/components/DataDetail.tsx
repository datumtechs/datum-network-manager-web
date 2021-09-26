import { FC, useState, useEffect } from 'react'
import { Input, Space, Button, Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import MyFiledsTable from './MyFiledsTable'
import { resourceApi } from '../api/index'
import { changeSizeFn } from '../utils/utils'




export const EditText: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TextArea, } = Input
  const { editText, baseInfo } = props

  const handleTextSwitch = () => {
    props.handleTextSwitch(!editText)
  }

  const handleEditText = (e) => {
    props.handleEditText(e.target.value)
  }

  return <>{editText ?
    <div style={{ "display": "flex" }}>
      <TextArea value={baseInfo.remarks} onChange={handleEditText} rows={4} />
      <div className="pl40 pointer no-warp edit-btn" onClick={handleTextSwitch}>{t('common.cancel')}</div>
    </div>
    : <div style={{ "display": "flex" }}>
      <div className="text-area">{baseInfo.remarks}</div>
      <div className="pl40 pointer no-warp edit-btn" onClick={handleTextSwitch}>{t('common.edit')}</div>
    </div>
  }</>
}

export const EditSelect: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TextArea, } = Input
  const { editSelect, baseInfo } = props

  const editSelectSet = () => {
    props.handleEditSelect(!editSelect)
  }

  return <>{editSelect ?
    <div style={{ "display": "flex" }}>
      <div className="pl40 pointer no-warp edit-btn" onClick={editSelectSet}>{t('common.cancel')}</div>
    </div>
    : <div style={{ "display": "flex" }}>
      <div className="text-area datail-box-content">1,1,1
      </div>
      <div className="pl40 pointer no-warp edit-btn" onClick={editSelectSet}>{t('common.edit')}</div>
    </div>
  }</>
}

export const DataDetail: FC<any> = (props: any) => {
  const { location } = props
  const { type, id } = location.state
  const [total, setTotal] = useState<number>()
  const [editText, editTextSet] = useState<boolean>(false)
  const [editSelect, editSelectSet] = useState<boolean>(false)


  const [baseInfo, setBaseInfo] = useState({
    fileId: '',  // 文件ID
    fileName: '', //  文件名称
    filePath: '',// 文件存储路径
    fileType: '',// 文件后缀类型
    id: '', // meataData序号
    columns: '', // 数据列数
    attendTaskCount: '', // 参与任务数量
    recUpdateTime: '',// 元数据最近更新时间
    orgName: '',
    resourceName: '',
    status: '',
    metaDataId: '', // 元数据id hash
    size: '',
    rows: '',
    remarks: '',
  })

  const [originalData, setOriginalData] = useState([])
  const [tableData, setTableData] = useState([])
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

  const getShowSource = data => {
    return data.slice((curPage - 1) * pagenation.pagesize, curPage * pagenation.pagesize)
  }

  const getStatus = (status: string) => {
    if (status === '1') {
      return t('center.pulish')
    }
    return t('center.unPublish')
  }

  const handleEditText = (value) => {
    setBaseInfo({
      ...baseInfo,
      remarks: value
    })
  }

  const handleTextSwitch = (flag: boolean) => {
    editTextSet(flag)
  }

  const handleEditSelect = (flag: boolean) => {
    editSelectSet(flag)
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

  const onSelectChange = () => {
    // setInput
  }

  useEffect(() => {
    // 根据id查询
    resourceApi.queryMetaDataDetail(id).then(res => {
      console.log(res);
      const { data } = res
      if (res.status === 0) {
        console.log(data);
        setBaseInfo(data)
        setOriginalData(data.localMetaDataColumnList)
        setTableData(getShowSource(data.localMetaDataColumnList))
      }
    })

  }, [])

  return (<div className="layout-box">
    <div className="add-data-box">
      <div className="top-title-box">
        <p className="top-title-">{t('center.dataName')}:&nbsp;&nbsp;</p>
        <p>{baseInfo.resourceName}</p>
      </div>
      <div className="top-title-box">
        <p>{t('center.metaDataID')}:&nbsp;&nbsp;</p>
        <p>{baseInfo.id}</p>
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
                  <p className="datail-box-content">{getStatus(baseInfo.status)}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.lastUpdateTime')}>
                  <p className="datail-box-content">{dayjs(baseInfo.recUpdateTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.sourceName')}>
                  <p className="datail-box-content">{baseInfo.fileName}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.sourceFileID')}>
                  <p className="datail-box-content">{baseInfo.fileId}</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.sourceFilePath')}>
                  <p className="datail-box-content">{baseInfo.filePath}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.dataSize')}>
                  <p className="datail-box-content">{changeSizeFn(Number(baseInfo.size))}</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('center.rowNum')}>
                  <p className="datail-box-content">{baseInfo.rows}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('center.colNum')}>
                  <p className="datail-box-content">{baseInfo.columns}</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.taskNum')}>
                  <p className="datail-box-content">{baseInfo.attendTaskCount}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.industryOfData')}>
                  {
                    type === 'view' ? <div className="text-area datail-box-content">1,2,3
                    </div> : <EditSelect baseInfo={baseInfo} editSelect={editSelect} onChange={onSelectChange} handleEditSelect={handleEditSelect} />
                  }

                </Form.Item>
              </Col>
            </Row>
            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 14 }} label={t('center.dataDesc')}>
              {
                type === 'view' ? <div className="text-area"> </div>
                  : <EditText baseInfo={baseInfo} editText={editText} onChange={onTextChange} handleTextSwitch={handleTextSwitch} handleEditText={handleEditText} />
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
