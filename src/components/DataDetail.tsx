import { FC, useState } from 'react'
import { Input, Space, Button, Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { resourceApi } from '../api/index'
import MyFiledsTable from './MyFiledsTable'
import { fileSizeChange, thousandMark } from '../utils/utils'

export const DataDetail: FC<any> = (props: any) => {
  const { TextArea } = Input
  const { location } = props
  const { type, id, from } = location.state
  const [total, setTotal] = useState<number>()
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
  const [upLoading, upLoadingSet] = useState(false)
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

  const goBackFn = () => { }
  const viewTask = () => {
    history.push({
      pathname: '/myData/dataMgt/dataDetail/dataDetailTask',
    })
  }
  const saveAndReturn = () => { }

  return (<div className="layout-box">
    <div className="add-data-box">
      <div className="top-title-box">
        <p className="top-title-">{t('center.dataName')}:&nbsp;&nbsp;</p>
        <p>{ }222222222222222222222222222222222</p>
      </div>
      <div className="top-title-box">
        <p>{t('center.metaDataID')}:&nbsp;&nbsp;</p>
        <p>{ }222222222222222222222222222222222</p>
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
                  <p className="datail-box-content">1111111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.industryOfData')}>
                  <p className="datail-box-content">111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item labelCol={{ span: 5 }}
              wrapperCol={{ span: 14 }} label={t('center.dataDesc')}>
              <TextArea value={baseInfo.remarks} rows={4} />
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
