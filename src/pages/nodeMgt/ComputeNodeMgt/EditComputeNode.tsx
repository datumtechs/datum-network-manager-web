import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import MyTag from '../../../components/MyTag'
import '../scss/index.scss'
import { computeNodeApi } from '../../../api/index'
import MyModal from '../../../components/MyModal'

export const EditComputeNode: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { location } = props
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const history = useHistory()
  const [form] = Form.useForm()
  // const tailLayout = {
  //   wrapperCol: { offset: 4, span: 8 },
  // }
  const { type, row } = location.state
  const leaveFn = () => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    if (type === 'Edit') {
      form.setFieldsValue({
        powerNodeName: row.powerNodeName,
        powerNodeId: row.powerNodeId,
        internalIp: row.internalIp,
        internalPort: row.internalPort,
        externalIp: row.externalIp,
        externalPort: row.externalPort,
        nodeName: row.nodeName,
        remarks: row.remarks,
      })
    }
  }, [])

  const handleOk = () => {
    setIsModalVisible(false)
    history.push('/nodeMgt/computeNodeMgt')
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onFinish = values => {
    if (type === 'Add') {
      computeNodeApi
        .addPowerNode({
          externalIp: values.externalIp,
          externalPort: values.externalPort,
          internalIp: values.internalIp,
          internalPort: values.internalPort,
          powerNodeName: values.powerNodeName,
          remarks: values.remarks,
        })
        .then(res => {
          if (res.status === 0) {
            history.push('/nodeMgt/computeNodeMgt')
            message.success(`${t('tip.addNodeSuccess')}`)
          } else {
            message.error(`${t('tip.addNodeFailed')}`)
          }
        })
    } else if (type === 'Edit') {
      computeNodeApi
        .updatePowerNode({
          externalIp: values.externalIp,
          externalPort: values.externalPort,
          internalIp: values.internalIp,
          internalPort: values.internalPort,
          powerNodeId: row.powerNodeId,
          remarks: values.remarks,
        })
        .then(res => {
          if (res.status === 0) {
            history.push('/nodeMgt/computeNodeMgt')
            message.success(`${t('tip.updateNodeSuccess')}`)
          } else {
            message.error(`${t('tip.updateNodeFailed')}`)
          }
        })
    }
  }
  const onFinishFailed = () => {}
  return (
    <div className="layout-box">
      <div className="tip-box">{t('node.addComputeNodeTips')}</div>
      <div className="form-box">
        <Form
          size="large"
          name="basic"
          form={form}
          labelAlign="left"
          labelCol={{ style: { width: i18n.language === 'en' ? 200 : 120, whiteSpace: 'pre-wrap' } }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item colon label={t('computeNodeMgt.nodeName')} className="form-item">
            <div className="form-group">
              <Form.Item name="powerNodeName">
                <Input className="form-box-input" placeholder={t('node.forSelfidentity')} />
              </Form.Item>
              <MyTag content={t('myData.availableName')} bgColor="#B7EB8F" color="#45B854" />
              <MyTag content={t('myData.unavailableName')} bgColor="#FFA39E" color="#F45564" />
            </div>
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalIP')} name="internalIp" className="form-item">
            <Input className="form-box-input" placeholder={t('node.internalIpPlaceholder')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalIp')} name="externalIp" className="form-item">
            <Input className="form-box-input" placeholder={t('node.externalIpPlaceholder')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalPort')} name="internalPort" className="form-item">
            <Input className="form-box-input" placeholder={t('node.internalPortPlaceholder')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalPort')} name="externalPort" className="form-item">
            <Input className="form-box-input" placeholder={t('node.externalPortPlaceholder')} />
          </Form.Item>
          <Form.Item style={{ marginLeft: i18n.language === 'en' ? 200 : 120 }} className="form-item">
            <Button className="btn re-btn" onClick={() => leaveFn()}>
              {t('common.return')}
            </Button>
            <Button
              type="primary"
              className="btn sub-btn"
              // style={{ marginLeft: i18n.language === 'en' ? 200 : 120 }}
              htmlType="submit"
            >
              {t('common.submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{`${t('tip.leaveCofirm')}`}</p>
      </MyModal>
    </div>
  )
}
