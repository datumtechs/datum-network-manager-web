import { FC, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Input, Space, Button } from 'antd'
import AuthInfoTable from './AuthInfoTable'
import MyModal from '../../../components/MyModal'
import MyTag from '../../../components/MyTag'

export const AuthInfo: FC<any> = (props: any) => {
  const { location } = props
  const { dataName, owner, isAuthed } = location.state
  const { t, i18n } = useTranslation()
  const { TextArea } = Input
  const [tableData, tableDataSet] = useState<[]>()
  const [totalNum, totalNumSet] = useState<number>(0)
  const [curPage, curPageSet] = useState<number>(1)
  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const [type, typeSet] = useState<string>('')

  const setPage = (page: number) => { }
  const goBackFn = () => { }
  const agreeFn = () => {
    typeSet('agree')
    isModalVisibleSet(true)
  }
  const declineFn = () => {
    typeSet('decline')
    isModalVisibleSet(true)
  }

  const handleOk = () => { }
  const handleCancel = () => {
    isModalVisibleSet(false)
  }

  return <div className="layout-box">
    <div className="add-data-box">
      <div className="top-title-box">
        <p className="top-title-">{t('myData.dataName')}:&nbsp;&nbsp;</p>
        < p > { }222222222222222222222222222222222</p>
      </div>
      <div className="top-title-box">
        <p>{t('center.metaDataID')}:&nbsp;&nbsp;</p>
        <p>{ }222222222222222222222222222222222</p>
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
                  <p className="datail-box-content">1111</p>
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
                  <p className="datail-box-content">1111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('myData.authValue')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.authStartTime')}>
                  <p className="datail-box-content">1111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* <Form.Item label={t('myData.lastUpdateTime')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item> */}
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
                  <p className="datail-box-content">1111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('center.dataSize')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('center.rowNum')}>
                  <p className="datail-box-content">1111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('center.colNum')}>
                  <p className="datail-box-content">1111111</p>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={t('myData.industryOfData')}>
                  <p className="datail-box-content">1111</p>
                </Form.Item>
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
            <Form.Item labelCol={{ span: 5 }}
              wrapperCol={{ span: 14 }} label={t('center.dataDesc')}>
              <TextArea rows={4} />
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
              Please ensure that you are agreeing ${owner}'s application for the use of ${dataName}？` : `请确认是否要同意将数据${dataName}授权给${owner}?`
            }</>
          : <>
            {
              i18n.language === 'en' ?
                `Please ensure that you are declining ${owner}'s application for the use of ${dataName}？`
                : `请确认是否要拒绝将数据${dataName}授权给${owner}?`
            }</>
        }</p>
      </MyModal>
    </div>

  </div >
}
