import { FC, useRef, useState } from 'react'
import { Form, Input, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'


const { Option } = Select
const NominationCommittee: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm()
  const [list, setList] = useState<any>([])


  return <div className="layout-box p-20 nomination-committee">
    <div className="title">
      {t('orgManage.nominationtoCommittee')}
      {t('orgManage.nominationtoWithdrawalFromCommittee')}
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
        label={t('orgManage.selectOrganization')}
        name="selectOrganization"
        rules={[{ required: true, message: `${t('center.pleaseSelect')}` }]}
      >
        <Select placeholder={t('center.pleaseSelect')}>
          {
            list.map((item: any) => (<Option value={item.id} key={item.id}>XXX</Option>))
          }
        </Select>

      </Form.Item>
      <Form.Item
        label={t('orgManage.selectApprovalData')}
        name="selectApprovalData"
      >
        <div className="position">
          <Select placeholder={t('center.pleaseSelect')}>
            {
              list.map((item: any) => (<Option value={item.id} key={item.id}>XXX</Option>))
            }
          </Select>
          <Button className="com-btn" style={{ marginRight: '20px' }} type="primary">{t('orgManage.uploadData')}</Button>
        </div>
      </Form.Item>
      <Form.Item
        label={t('orgManage.postscriptNomination')}
        name="postscriptNomination"
      >
        <Input.TextArea maxLength={200} showCount></Input.TextArea>
      </Form.Item>
      <Form.Item
        label={` `}
      >
        <Button className="com-btn" style={{ marginRight: '20px' }} type="primary">{t('common.submit')}</Button>
        <Button className="com-btn" onClick={() => history.go(-1)}>{t('common.return')}</Button>
      </Form.Item>
    </Form>
  </div>
}


export default NominationCommittee