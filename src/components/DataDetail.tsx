import { FC, useState, useEffect } from 'react'
import { Input, Space, Button, Form, Row, Col, Select, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import MyFiledsTable from './MyFiledsTable'
import MyModal from './MyModal'
import { resourceApi } from '../api/index'
import { changeSizeFn } from '../utils/utils'
import { INDUSTRYLIST, INDUSTRYMAP } from '../constant/constant'




export const EditText: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { TextArea, } = Input

  const { editText, baseInfo, remarks } = props

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
      <div className="text-area">{remarks}</div>
      <div className="pl40 pointer no-warp edit-btn" onClick={handleTextSwitch}>{t('common.edit')}</div>
    </div>
  }</>
}

export const EditSelect: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { editSelect, baseInfo, industry } = props
  const { Option } = Select

  const editSelectSet = () => {
    props.handleEditSelect(!editSelect)
  }

  const handleSelectChange = (value: any) => {
    props.onSelectChange(value)
  }

  const mapIndustry = (indust: string) => {
    const isArray = Array.isArray(indust)
    const industryList = []
    if (isArray) {
      indust.split(',').forEach((item: string) => {
        industryList.push(t(`myData.${INDUSTRYMAP.get(Number(indust))}`))
      })
      return industryList.join(',')
    }
    return t(`myData.${INDUSTRYMAP.get(Number(indust))}`)
  }

  return <>{editSelect ?
    <div style={{ "display": "flex" }}>
      <Select value={baseInfo.industry} onChange={handleSelectChange}>
        {INDUSTRYLIST.map((item) =>
          (<Option value={item.id} key={item.id}>{t(`myData.${item.text}`)}</Option>)
        )}
      </Select>
      <div className="pl40 pointer no-warp edit-btn" onClick={editSelectSet}>{t('common.cancel')}</div>
    </div>
    : <div style={{ "display": "flex" }}>
      <div className="text-area datail-box-content">{mapIndustry(industry)}
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
    industry: '',
    localMetaDataColumnList: [],
    attendTaskCount: '', // 参与任务数量
    recCreateTime: '', // 参与任务数量
    recUpdateTime: '',// 元数据最近更新时间
    resourceName: '',
    status: '',
    metaDataId: '', // 元数据id hash
    size: '',
    rows: '',
    remarks: '',
  })

  const [originalData, setOriginalData] = useState([])
  const [industry, industrySet] = useState()
  const [remarks, remarksSet] = useState()
  const [tableData, setTableData] = useState([])
  const [curPage, setCurPage] = useState<number>(1)
  const [upLoading, upLoadingSet] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const history = useHistory()
  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const pagenation = {
    pagesize: 10,
  }
  const setPage = (page: number) => {
    setCurPage(page)
  }

  const getShowSource = data => {
    if (!data) return
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

  const goBackFn = () => {
    isModalVisibleSet(true)
  }

  const handleOk = () => {
    history.go(-1)
  }

  const handleCancel = () => {
    isModalVisibleSet(false)
  }

  const viewTask = () => {
    history.push({
      pathname: '/myData/dataMgt/dataDetail/dataDetailTask',
      state: {
        metadataName: baseInfo.resourceName,
        metadataId: baseInfo.id,
      }
    })
  }
  const saveAndReturn = () => {

    resourceApi.updateMetaData({
      id: baseInfo.id,
      industry: baseInfo.industry,
      localMetaDataColumnList: originalData,
      remarks: baseInfo.remarks,
    }).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.operationSucces')}`)
        history.push('/myData/dataMgt')
      } else {
        message.error(`${t('tip.operationFailed')}`)
      }
    })
  }

  const onSelectChange = (value) => {
    // setSelect
    setBaseInfo({
      ...baseInfo,
      industry: value
    })
  }

  useEffect(() => {
    // 根据id查询
    resourceApi.queryMetaDataDetail(id).then(res => {
      console.log(res);
      const { data } = res
      if (res.status === 0) {
        console.log(data);
        setBaseInfo(data)
        industrySet(data.industry)
        remarksSet(data.remarks)
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
            wrapperCol={{ span: 12 }}>
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
                  <div className="datail-box-content">{baseInfo.fileId}</div>
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
                    </div> : <EditSelect baseInfo={baseInfo} editSelect={editSelect} industry={industry} onSelectChange={onSelectChange} handleEditSelect={handleEditSelect} />
                  }

                </Form.Item>
              </Col>
            </Row>
            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 14 }} label={t('center.dataDesc')}>
              {
                type === 'view' ? <div className="text-area"> </div>
                  : <EditText baseInfo={baseInfo} editText={editText} remarks={remarks} handleTextSwitch={handleTextSwitch} handleEditText={handleEditText} />
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
    <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>{`${t('tip.leaveCofirm')}`}</p>
    </MyModal>
  </div >
  )
}
