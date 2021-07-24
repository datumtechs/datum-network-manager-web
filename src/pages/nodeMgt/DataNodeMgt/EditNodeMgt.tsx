import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Bread from '../../../layout/components/Bread'
import '../scss/config.scss'
import { DataNode } from '../../../entity'
import { dataNodeApi } from '../../../api/index'
import MyModal from '../../../components/MyModal'

export const EditNodeMgt: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { location } = props
  const { type, row, id } = location.state
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const history = useHistory()

  useEffect(() => {
    if (type === 'Edit') {
      form.setFieldsValue({
        internalIp: row.internalIp,
        internalPort: row.internalPort,
        externalIp: row.externalIp,
        externalPort: row.externalPort,
        nodeName: row.nodeName,
      })
    }
  }, [])

  const handleOk = () => {
    setIsModalVisible(false)
    history.push('/nodeMgt/dataNodeMgt')
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values: DataNode) => {
    console.log('values', values)
    if (type === 'Edit') {
      dataNodeApi
        .updateDataNode({
          externalIp: values.externalIp,
          externalPort: values.externalPort,
          internalIp: values.internalIp,
          internalPort: values.internalPort,
          nodeId: row.nodeId,
        })
        .then(res => {
          if (res.status === 0) {
            history.push('/nodeMgt/dataNodeMgt')
            message.success(`${t('tip.updateNodeSuccess')}`)
          } else {
            message.error(res.msg)
          }
        })
    }
    if (type === 'Add') {
      dataNodeApi
        .addDataNode({
          externalIp: values.externalIp,
          externalPort: values.externalPort,
          internalIp: values.internalIp,
          internalPort: values.internalPort,
          nodeName: values.nodeName,
        })
        .then(res => {
          if (res.status === 0) {
            history.push('/nodeMgt/dataNodeMgt')
            message.success(`${t('tip.addNodeSuccess')}`)
          } else {
            message.error(`${t('tip.addNodeFailed')}`)
          }
        })
    }
  }
  const leaveFn = () => {
    setIsModalVisible(true)
  }
  const onFinishFailed = () => {}
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="form-box">
        {/* TODO 1、form的校验名称校验接口 2、状态改变disable */}
        <Form
          size="large"
          name="basic"
          form={form}
          labelAlign="left"
          labelCol={{ style: { width: i18n.language === 'en' ? 200 : 160, whiteSpace: 'pre-wrap' } }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item colon label={t('dataNodeMgt.nodeName')} name="nodeName" className="form-item">
            <Input disabled={type === 'Edit'} className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalIP')} name="internalIp" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalIp')} name="externalIp" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalPort')} name="internalPort" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalPort')} name="externalPort" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          {/* <Form.Item label={t('common.status')} name="username" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item> */}
          <Form.Item style={{ marginLeft: i18n.language === 'en' ? 200 : 160 }} className="form-item">
            <Button className="btn re-btn" onClick={leaveFn}>
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
