import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, message } from 'antd'
import MyTag from '../../../components/MyTag'
import '../scss/index.scss'
import { nodeApi } from '../../../api'

export const AddSeedNode: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm();
  const [showNameStatus, showNameStatusSet] = useState<boolean>(false)
  const [nameStatus, nameStatusSet] = useState<boolean>(false)

  const onFinish = (values) => {
    // console.log(values);

    if (values) {
      nodeApi.addSeedNode({
        seedNodeId: values.nodeSeedNodeId,
        // nodeId: values.NodePublicKey,
        // internalPort: values.internalPort,
        // internalIp: values.internalIP,
      }).then(res => {
        console.log(res);
        if (res.status === 0) {
          message.success(t('dataNodeMgt.addNodeSuccess'))
          history.go(-1)
        } else {
          message.error(res.msg)
        }
      })
    }

  }
  const whenInputChange = (e) => {
    const name = e.target.value
    if (name) {
      nodeApi.checkSeedNodeName({ seedNodeId: name }).then(res => {
        showNameStatusSet(true)
        if (res.status === 0) {
          return nameStatusSet(true)
        }
        return nameStatusSet(false)
      })
    } else {
      showNameStatusSet(false)
    }
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
        form={form}
      >
        <Form.Item
          label={t('node.nodeSeedNodeId')}
          name="nodeSeedNodeId"
          rules={[{ required: true, message: `${t('tip.plzInput')}${t('node.nodeSeedNodeId')}` }]}
          className="form-item"
        >
          <div className="form-group">
            <Input.TextArea
              // onBlur={whenInputName}
              onChange={whenInputChange}
              placeholder={t('node.forSelfidentity')}
              className="form-box-input"
            />
            {
              showNameStatus ? nameStatus ? <MyTag content={t('myData.availableName')} bgColor="#B7EB8F" color="#45B854" /> :
                <MyTag content={t('myData.unavailableName')} bgColor="#FFA39E" color="#F45564" /> : ''
            }
          </div>
        </Form.Item>
        {/* <Form.Item
          label={t('node.NodePublicKey')}
          name="NodePublicKey"
          rules={[{ required: true, message: `${t('tip.plzInput')}${t('node.NodePublicKey')}` }]}
          className="form-item"
        >
          <Input className="form-box-input" />
        </Form.Item> */}
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item className="form-item">
          <Button className="btn re-btn" onClick={() => history.go(-1)} style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}>
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
