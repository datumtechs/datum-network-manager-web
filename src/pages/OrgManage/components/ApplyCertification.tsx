import { FC, useRef, useState } from 'react'
import { Form, Input, Select, Button, Modal, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import Upload from './UpLoad'


const { Option } = Select
const ApplyCertification: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm()
  const [list, setList] = useState<any>([])
  const [isModalVisible, setModalVisible] = useState<any>(false)

  const handleOk = () => {

  }

  return <div className="layout-box p-20 apply-certification">
    <div className="title">
      {t('orgManage.applyTrustedCertification')}
    </div>
    <Form
      name="basic"
      size="large"
      colon={false}
      wrapperCol={{ span: 10 }}
      labelCol={{ style: { width: i18n.language === 'en' ? 180 : 160, whiteSpace: 'pre-wrap' } }}
      labelAlign="left"
      form={form}
    >
      <Form.Item
        label={t('orgManage.selectApprovalNode')}
        name="selectApprovalNode"
        rules={[{ required: true, message: `${t('center.pleaseSelect')}${t('orgManage.selectApprovalNode')}` }]}
      >
        <Select placeholder={`${t('center.pleaseSelect')}${t('orgManage.selectApprovalNode')}`}>
          {
            list.map((item: any) => (<Option value={item.id} key={item.id}>XXX</Option>))
          }
        </Select>

      </Form.Item>
      <Form.Item
        label={t('orgManage.approvalMaterialURL')}
        name="approvalMaterialURL"
      >
        <div className="position">
          <Input placeholder={t('orgManage.approvalMaterialURL')} />
          <Button className="com-btn" style={{ marginRight: '20px' }} type="primary" onClick={() => setModalVisible(true)}>{t('orgManage.uploadData')}</Button>
        </div>
      </Form.Item>
      <Form.Item
        label={t('orgManage.postscriptApplication')}
        name="postscriptApplication"
      >
        <Input.TextArea maxLength={200} showCount></Input.TextArea>
      </Form.Item>
      <Form.Item
        style={{ marginTop: '40px' }}
        label={` `}
      >
        <Button className="com-btn" style={{ marginRight: '20px' }} type="primary">{t('common.submit')}</Button>
        <Button className="com-btn" onClick={() => history.go(-1)}>{t('common.return')}</Button>
      </Form.Item>
    </Form>
    {isModalVisible ? <Upload close={() => setModalVisible(false)} /> : ''}
  </div>
}


export default ApplyCertification