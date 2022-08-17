import { FC, useRef, useState } from 'react'
import { Form, Input, Select, Button, Modal, Image, message } from 'antd'
import { useTranslation } from 'react-i18next'
import Upload from './UpLoad'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const ApplyCertification: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm()
  const [list, setList] = useState<any>([])
  const [isModalVisible, setModalVisible] = useState<any>(false)
  const [imageUrl, setImageUrl] = useState<any>('')
  const [loading, setLoading] = useState<any>(false)

  const handleOk = () => {

  }


  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileOb, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/svg';
    if (!isJpgOrPng) {
      message.error(t('credential.pictureIncorrect'));
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error(`${t('credential.sizeLimit')}10M`);
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined className="plus-icon" />}
      <div className="plus-tips">{t('credential.uploadTips')}</div>
    </div>
  );


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
        label={t('orgManage.postscriptApplication')}
        name="postscriptApplication"
      >
        <Input.TextArea maxLength={200} showCount></Input.TextArea>
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
      {/* <Upload close={() => setModalVisible(false)} /> */}
      <Form.Item
        label={t('orgManage.InformationPicture')}
        name="InformationPicture"
      >
        <Upload
          name="avatar"
          accept="image/*"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item
        label={t('orgManage.postscriptToApplicationMaterials')}
        name="postscriptToApplicationMaterials"
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
    {/* {isModalVisible ? : ''} */}
  </div>
}


export default ApplyCertification