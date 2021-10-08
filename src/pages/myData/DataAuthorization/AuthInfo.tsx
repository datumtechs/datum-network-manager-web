import { FC, useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Row, Col, Form, Input, Space, Button, message } from 'antd'
import dayjs from 'dayjs'
import { authApi } from '../../../api/index'
import AuthInfoTable from './AuthInfoTable'
import MyModal from '../../../components/MyModal'
import MyTag from '../../../components/MyTag'
import { changeSizeFn } from '../../../utils/utils'
import { INDUSTRYMAP } from '../../../constant/constant'

export const AuthInfo: FC<any> = (props: any) => {
  const { location } = props
  const { authId, isAuthed } = location.state
  const { t, i18n } = useTranslation()
  const { TextArea } = Input
  const [tableData, tableDataSet] = useState<[]>()
  const [totalNum, totalNumSet] = useState<number>(0)
  const [curPage, curPageSet] = useState<number>(1)
  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const [type, typeSet] = useState<string>('')
  const history = useHistory()
  const [baseInfo, baseInfoSet] = useState<any>({
    dataColumns: '',
    dataRows: '',
    fileSize: '',
    industry: '',
    publishTime: '',
    remarks: ''
  })
  const [authInfo, authInfoSet] = useState<any>({
    applyUser: '',
    authAt: '',
    authId: '',
    authType: '',
    authValueAmount: '',
    authValueEndAt: '',
    authValueStartAt: '',
    createAt: '',
    fileName: '',
    metaDataId: '',
    recCreateTime: '',
    recUpdateTime: '',
    resourceName: '',
    status: '',
    userType: '',
  })

  const setPage = (page: number) => { }
  const goBackFn = () => {
    history.go(-1)
  }
  const agreeFn = () => {
    typeSet('agree')
    isModalVisibleSet(true)
  }
  const declineFn = () => {
    typeSet('decline')
    isModalVisibleSet(true)
  }

  const handleOk = () => {
    authApi.actionAuthData({
      action: type === 'agree' ? 1 : 2,
      authId: authInfo.authId
    }).then(res => {
      if (res.status === 0) {
        isModalVisibleSet(false)
        message.success(t('tip.operationSucces'))
        history.push('/myData/dataAuthorization')
      } else {
        message.error(t('tip.operationFailed'))
      }
    })
  }
  const handleCancel = () => {
    isModalVisibleSet(false)
  }

  const queryAuthDetail = () => {
    authApi.authDataDetail({ authId }).then(res => {
      if (res.status === 0) {
        authInfoSet(res.data.authInfo)
        baseInfoSet(res.data.basicDataInfo)
        tableDataSet(res.data.localMetaDataColumnList)
      }
    })
  }

  useEffect(() => {
    queryAuthDetail()
  }, [])

  return <div className="layout-box">
    <div className="add-data-box">
      <div className="top-title-box">
        <p className="top-title-">{t('myData.dataName')}:&nbsp;&nbsp;</p>
        < p > {authInfo.resourceName}</p>
      </div>
      <div className="top-title-box">
        <p>{t('center.metaDataID')}:&nbsp;&nbsp;</p>
        <p>{authInfo.metaDataId}</p>
      </div>
      <div className="sub-info-box">
        <div className="sub-title-box">{t('myData.authInfo')}</div>
        <div className="limit-box pl12">
          <Form name="detail" labelAlign="left"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.authAccount')}>
                  <p className="datail-box-content">{authInfo.applyUser}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* <Form.Item label={t('myData.lastUpdateTime')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item> */}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.authType')}>
                  <>
                    <p>{authInfo.authType === 1 ? t('myData.period') : ''}</p>
                    <p>{authInfo.authType === 2 ? t('myData.count') : ''}</p>
                  </>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.authValue')}>
                  {
                    authInfo.authType === 2 ? <p className="datail-box-content">{authInfo.authValueAmount}&nbsp;{t('common.times')}</p>
                      : <p><span>{dayjs(authInfo.authValueStartAt).format('YYYY-MM-DD HH:mm:ss')}</span>{t('task.to')} <span>{dayjs(authInfo.authValueEndAt).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.authStartTime')}>
                  <p className="datail-box-content">{dayjs(authInfo.createAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                {isAuthed ?
                  <Form.Item label={t('myData.authResultAndTime')}>
                    <p className="datail-box-content">
                      <Space size={10}>
                        <MyTag content={t('common.agreed')} bgColor="#EBFDDA" color="#45B854" border="#B7EB8F" />
                        <span>{dayjs(authInfo.authAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                      </Space>
                    </p>
                  </Form.Item>
                  : ''}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="sub-info-box">
        <div className="sub-title-box">{t('center.basicInfo')}</div>
        <div className="limit-box pl12">
          <Form name="detail" labelAlign="left"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.metaDataPublishTime')}>
                  <p className="datail-box-content">{dayjs(baseInfo.publishTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('center.dataSize')}>
                  <p className="datail-box-content">{changeSizeFn(baseInfo.fileSize)}</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('center.rowNum')}>
                  <p className="datail-box-content">{baseInfo.dataRows}</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('center.colNum')}>
                  <p className="datail-box-content">{baseInfo.dataColumns}</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.industryOfData')}>
                  <p className="datail-box-content">{t(`myData.${INDUSTRYMAP.get(baseInfo.industry)}`)}</p>
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                {isAuthed ?
                  <Form.Item label={t('myData.authResultAndTime')}>
                    <p className="datail-box-content">
                      <Space size={10}>
                        <span>{ }2021-02-22 12: 34: 56</span>
                        <MyTag content={t('common.agreed')} bgColor="#EBFDDA" color="#45B854" border="#B7EB8F" />
                      </Space>
                    </p>
                  </Form.Item>
                  : <Form.Item label={t('myData.authResultAndTime')}>
                    <p className="datail-box-content">
                      <Space size={10}>
                        <span>{ }2021-02-22 12: 34: 56</span>
                        <MyTag content={t('common.declined')} bgColor="#F9DDDB" color="#F45564" border="#FFA39E" />
                      </Space>
                    </p>
                  </Form.Item>}
              </Col> */}
            </Row>
            <Form.Item labelCol={{ span: 5 }}
              wrapperCol={{ span: 14 }} label={t('center.dataDesc')}>
              <p> {baseInfo.remarks}</p>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="sub-info-box">
        <div className="sub-title-box">{t('center.fieldInfo')}</div>
        <AuthInfoTable
          tableData={tableData}
          total={totalNum}
          setPage={setPage}
          curPage={curPage} />
      </div>
      <div className="sub-info-box">
        <Space size={40} className="btn-group">
          <Button size="large" className="btn" onClick={goBackFn}>
            {t('common.return')}
          </Button>

          {isAuthed ? '' : <><Button size="large" type="primary" className="btn" onClick={agreeFn}>
            {t('common.agree')}
          </Button>
            <Button size="large" className="btn red-btn" onClick={declineFn}>
              {t('common.decline')}
            </Button></>}
        </Space>
      </div>
      <MyModal width={600} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{type === 'agree' ?
          <>
            {
              i18n.language === 'en' ? `
              Please ensure that you are agreeing ${authInfo.applyUser}'s application for the use of ${authInfo.resourceName}？` : `请确认是否要同意将数据${authInfo.resourceName}授权给${authInfo.applyUser}?`
            }</>
          : <>
            {
              i18n.language === 'en' ?
                `Please ensure that you are declining ${authInfo.applyUser}'s application for the use of ${authInfo.resourceName}？`
                : `请确认是否要拒绝将数据${authInfo.resourceName}授权给${authInfo.applyUser}?`
            }</>
        }</p>
      </MyModal>
    </div>

  </div >
}
