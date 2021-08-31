import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button } from 'antd'
import MyTag from '../../../components/MyTag'
import '../scss/index.scss'

export const AddSeedNode: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const [showNameStatus, showNameStatusSet] = useState(false)
  const onFinish = () => {}
  const whenInputName = () => {
    // api 查询名字是否可用
    console.log('名字不可用')
    // if(){ // TODO 如果为空提示 不可为空 return 否则查询api是否正确
    // }
  }
  const whenInputChange = () => {
    console.log('名字改变')
  }
  return (
    <div className="layout-box">
      <div className="tip-box">{t('node.noRepeatSeedName')}</div>
      <Form
        name="basic"
        size="large"
        initialValues={{ remember: true }}
        labelAlign="left"
        labelCol={{ style: { width: i18n.language === 'en' ? 180 : 120, whiteSpace: 'pre-wrap' } }}
        onFinish={onFinish}
      >
        <Form.Item
          label={t('node.nodeSeedName')}
          name="nodeSeedName"
          rules={[{ required: true, message: `${t('tip.plzInput')}${t('node.nodeSeedName')}` }]}
          className="form-item"
        >
          <div className="form-group">
            <Input
              onBlur={whenInputName}
              onChange={whenInputChange}
              placeholder={t('node.forSelfidentity')}
              className="form-box-input"
            />
            <MyTag content={t('myData.availableName')} bgColor="#B7EB8F" color="#45B854" />
            <MyTag content={t('myData.unavailableName')} bgColor="#FFA39E" color="#F45564" />
          </div>
        </Form.Item>
        <Form.Item
          label={t('node.NodePublicKey')}
          name="NodePublicKey"
          rules={[{ required: true, message: `${t('tip.plzInput')}${t('node.NodePublicKey')}` }]}
          className="form-item"
        >
          <Input className="form-box-input" />
        </Form.Item>
        <Form.Item
          label={t('dataNodeMgt.internalIP')}
          name="internalIP"
          rules={[{ required: true, message: `${t('tip.plzInput')}${t('dataNodeMgt.internalIP')}` }]}
          className="form-item"
        >
          <Input className="form-box-input" />
        </Form.Item>
        <Form.Item
          label={t('dataNodeMgt.internalPort')}
          name="internalPort"
          rules={[{ required: true, message: `${t('tip.plzInput')}${t('dataNodeMgt.internalPort')}` }]}
          className="form-item"
        >
          <Input className="form-box-input" />
        </Form.Item>
        <Form.Item className="form-item">
          <Button className="btn re-btn" htmlType="submit" style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}>
            {t('common.return')}
          </Button>
          <Button type="primary" className="btn submit-btn" htmlType="submit">
            {t('node.submitAddtion')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
