import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import MyTag from '../../../components/MyTag'
import '../scss/index.scss'
import { DataNode } from '../../../entity'
import { dataNodeApi } from '../../../api/index'
import MyModal from '../../../components/MyModal'

export const EditNodeMgt: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { location } = props
  const [form] = Form.useForm()
  const [showNameStatus, showNameStatusSet] = useState<boolean>(false)
  const [nameStatus, nameStatusSet] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const history = useHistory()

  // 不存在编辑状态 只有新增
  // useEffect(() => {
  //   if (type === 'Edit') {
  //     form.setFieldsValue({
  //       internalIp: row.internalIp,
  //       internalPort: row.internalPort,
  //       externalIp: row.externalIp,
  //       externalPort: row.externalPort,
  //       nodeName: row.nodeName,
  //     })
  //   }
  // }, [])

  const handleOk = () => {
    setIsModalVisible(false)
    history.push('/nodeMgt/dataNodeMgt')
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const whenInputChange = (e) => {
    const name = e.target.value
    if (name) {
      dataNodeApi.checkDataNodeName({ nodeName: name }).then(res => {
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
  const onFinish = (values: DataNode) => {
    // if (type === 'Edit') {
    //   dataNodeApi
    //     .updateDataNode({
    //       externalIp: values.externalIp,
    //       externalPort: values.externalPort,
    //       internalIp: values.internalIp,
    //       internalPort: values.internalPort,
    //       nodeId: row.nodeId,
    //     })
    //     .then(res => {
    //       if (res.status === 0) {
    //         history.push('/nodeMgt/dataNodeMgt')
    //         message.success(`${t('tip.updateNodeSuccess')}`)
    //       } else {
    //         message.error(res.msg)
    //       }
    //     })
    // }
    dataNodeApi
      .addDataNode({
        externalIp: values.externalIp,
        externalPort: Number(values.externalPort),
        internalIp: values.internalIp,
        internalPort: Number(values.internalPort),
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
  const leaveFn = () => {
    setIsModalVisible(true)
  }
  const onFinishFailed = () => { }
  return (
    <div className="layout-box">
      <div className="tip-box">{t('node.addDataNodeTips')}</div>
      <div className="form-box">
        <Form
          size="large"
          name="basic"
          form={form}
          labelAlign="left"
          labelCol={{ style: { width: 160, whiteSpace: 'pre-wrap' } }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item colon label={t('dataNodeMgt.nodeName')} className="form-item">
            <div className="form-group">
              <Form.Item name="nodeName" rules={[{ required: true, message: `${t('tip.plzInput')}${t('dataNodeMgt.nodeName')}` }]}>
                <Input onChange={whenInputChange}
                  className="form-box-input" placeholder={t('node.forSelfidentity')} />
              </Form.Item>
              {
                showNameStatus ? nameStatus ? <MyTag content={t('myData.availableName')} bgColor="#B7EB8F" color="#45B854" /> :
                  <MyTag content={t('myData.unavailableName')} bgColor="#FFA39E" color="#F45564" /> : ''
              }
            </div>
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalIP')} name="internalIp" rules={[{ required: true, message: `${t('tip.plzInput')}${t('dataNodeMgt.internalIP')}` }]} className="form-item">
            <Input className="form-box-input" placeholder={t('node.internalIpPlaceholder')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalIp')} name="externalIp" rules={[{ required: true, message: `${t('tip.plzInput')}${t('dataNodeMgt.externalIp')}` }]} className="form-item">
            <Input className="form-box-input" placeholder={t('node.externalIpPlaceholder')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.internalPort')} name="internalPort" rules={[{ required: true, message: `${t('tip.plzInput')}${t('dataNodeMgt.internalPort')}` }]} className="form-item">
            <Input className="form-box-input" placeholder={t('node.internalPortPlaceholder')} />
          </Form.Item>
          <Form.Item colon label={t('dataNodeMgt.externalPort')} name="externalPort" rules={[{ required: true, message: `${t('tip.plzInput')}${t('dataNodeMgt.externalPort')}` }]} className="form-item">
            <Input className="form-box-input" placeholder={t('node.externalPortPlaceholder')} />
          </Form.Item>
          {/* <Form.Item label={t('common.status')} name="username" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item> */}
          <Form.Item style={{ marginLeft: 160 }} className="form-item">
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
