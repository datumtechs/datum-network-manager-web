import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Bread from '../../../layout/components/Bread'
import '../scss/config.scss'
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
  console.log(row)

  console.log('location.state', type)
  const leaveFn = () => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    if (type === 'Edit') {
      form.setFieldsValue({
        powerNodeName: row.powerNodeName,
        nodeID: row.nodeID,
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
    console.log(values)
    console.log(type)
    if (type === 'Add') {
      computeNodeApi.addPowerNode(values).then(res => {
        console.log(11111)
      })
    } else if (type === 'edit') {
      computeNodeApi.updatePowerNode(values).then(res => {
        console.log(11111)
      })
    }
  }
  const onFinishFailed = () => {}
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
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
          <Form.Item colon label={t('computeNodeMgt.nodeName')} name="powerNodeName" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
          </Form.Item>
          <Form.Item colon label={t('computeNodeMgt.nodeID')} name="nodeID" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
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
          <Form.Item label={t('common.remark')} name="remarks" className="form-item">
            <Input className="form-box-input" placeholder={t('common.noModify')} />
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
