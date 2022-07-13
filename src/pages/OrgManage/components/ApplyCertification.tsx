import { FC, useRef, useState } from 'react'
import { Form, Input, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'


const { Option } = Select
const ApplyCertification: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm()
  const [list, setList] = useState<any>([])


  return <div className="layout-box apply-certification">
    <div className="title">
      {t('orgManage.applyTrustedCertification')}
    </div>
    <Form
      name="basic"
      size="large"
      preserve={false}
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
        <Input placeholder={t('orgManage.approvalMaterialURL')} />

      </Form.Item>
      <Form.Item
        label={t('orgManage.postscriptApplication')}
        name="postscriptApplication"
      >
        <Input.TextArea maxLength={200} showCount></Input.TextArea>
      </Form.Item>
    </Form>
    <div>
      <Button type="primary">{t('common.submit')}</Button>
      <Button onClick={() => history.go(-1)}>{t('common.return')}</Button>
    </div>
  </div>
}


export default ApplyCertification