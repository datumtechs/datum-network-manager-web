import { FC, useRef, useState } from 'react'
import { Form, Input, Select, message, Modal, Image, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'



const ApplyCertification: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const [formFile] = Form.useForm()
  const [imageUrl, setImageUrl] = useState<any>('')
  const [loading, setLoading] = useState<any>(false)

  const handleOk = () => {

  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined className="plus-icon" />}
      <div className="plus-tips">{t('credential.uploadTips')}</div>
    </div>
  );

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


  return <Modal
    title={t('orgManage.uploadApprovalData')}
    visible={true}
    centered
    onOk={handleOk}
    onCancel={() => props.close()}>
    <Form
      colon={false}
      labelCol={{ style: { width: i18n.language === 'en' ? 180 : 120, whiteSpace: 'pre-wrap' } }}
      labelAlign="left"
      form={formFile}
    >
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
    </Form>
  </Modal>
}


export default ApplyCertification