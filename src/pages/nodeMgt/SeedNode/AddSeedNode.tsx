import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, message, Modal } from 'antd'
import MyTag from '@com/MyTag'
import '../scss/index.scss'
import { nodeApi } from '@/api'

export const AddSeedNode: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm();
  const [showNameStatus, showNameStatusSet] = useState<boolean>(false)
  const [nameStatus, nameStatusSet] = useState<boolean>(false)

  const onFinish = (values) => {
    if (!form.getFieldValue('nodeSeedNodeId')) {
      message.error(`${t('tip.plzInput')}${t('node.nodeSeedNodeId')}`)
      return
    }
    nodeApi.addSeedNode({
      seedNodeId: form.getFieldValue('nodeSeedNodeId')
    }).then(res => {
      if (res.status === 0) {
        message.success(t('dataNodeMgt.addNodeSuccess'))
        cancel()
      }
    })
  }

  const whenInputChange = (e) => {
    const name = e.target.value
    if (name) {
      nodeApi.checkSeedNodeName({ seedNodeId: name.replace(/\s*/g, "") }).then(res => {
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

  const cancel = () => {
    showNameStatusSet(false)
    props.cancel()
  }


  return (
    <Modal
      visible={props.show}
      zIndex={2}
      onOk={onFinish}
      destroyOnClose={true}
      centered={true}
      onCancel={cancel}
      okText={t('node.submitAddtion')}
      cancelText={t('common.return')}
      title={t('node.addSeedNode')}>
      <div className="tip-box" style={{ width: '100%' }}>{t('node.noRepeatSeedName')}</div>
      <Form
        name="basic"
        size="large"
        preserve={false}
        labelAlign="left"
        labelCol={{ style: { width: i18n.language === 'en' ? 180 : 120, whiteSpace: 'pre-wrap' } }}
        form={form}
      >
        <Form.Item
          label={t('node.nodeSeedNodeId')}
          name="nodeSeedNodeId"
          rules={[{ required: true, message: `${t('tip.plzInput')}${t('node.nodeSeedNodeId')}` }]}
          className="form-item"
        >
          <Input.TextArea
            autoSize={true}
            onChange={whenInputChange}
            placeholder={t('node.forSelfidentity')}
            className="form-box-input"
          />

        </Form.Item>
        <Form.Item colon={false} className="form-item">
          {
            showNameStatus ? nameStatus ? <MyTag content={t('myData.availableName')} bgColor="#B7EB8F" color="#45B854" /> :
              <MyTag content={t('myData.unavailableName')} bgColor="#FFA39E" color="#F45564" /> : ''
          }
        </Form.Item>
      </Form>
    </Modal >
  )
}
