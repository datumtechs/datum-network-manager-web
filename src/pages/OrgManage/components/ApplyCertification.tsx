import { FC, useRef, useState, useEffect } from 'react'
import { Form, Input, Select, Button, Upload, Image, message } from 'antd'
import { useTranslation } from 'react-i18next'
// import Upload from './UpLoad'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { orgManage } from '@api/index'


const { Option } = Select
const ApplyCertification: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm()
  // const [list, setList] = useState<any>([])
  // const [isModalVisible, setModalVisible] = useState<any>(false)
  const [imageUrl, setImageUrl] = useState<any>('')
  const [loading, setLoading] = useState<any>(false)
  const [AuthorityList, setAuthorityList] = useState<any>([])

  const query = () => {
    orgManage.getAuthorityList({ keyword: '' }).then(res => {
      const { status, data } = res
      if (status == 0) {
        console.log(data)
        setAuthorityList(data)
      }
    })
  }

  useEffect(() => {
    query()
  }, [])




  const submit = () => {
    form.validateFields().then(confirm)
  }

  const confirm = (values) => {
    console.log(values);
    orgManage.postApply({
      approveOrg: values.approveOrg,
      desc: values.desc,
      remark: values.remark,
      material: values.approvalMaterialURL,
    }).then(res => {
      const { data, status } = res
      if (status == 0) {
        console.log(status);

      }
    })
  }


  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    const formData = new FormData()
    formData.append('file', info.file)
    orgManage.uploadmMaterial(formData).then(res => {
      const { data, status } = res
      if (status == 0) {
        getBase64(info.file, url => {
          setImageUrl(url);
        });
        form.setFieldsValue({ approvalMaterialURL: data })
      } else {
        setImageUrl('');
      }
      setLoading(false);
    })
  };

  const beforeUpload = (file: any) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error(`${t('credential.sizeLimit')}10M`);
    }
    return false;
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
        name="approveOrg"
        rules={[{ required: true, message: `${t('center.pleaseSelect')}${t('orgManage.selectApprovalNode')}` }]}
      >
        <Select placeholder={`${t('center.pleaseSelect')}${t('orgManage.selectApprovalNode')}`}>
          {
            AuthorityList.map((item: any) => (<Option value={item.identityId} key={item.identityId}>{item?.dynamicFields?.identityName}</Option>))
          }
        </Select>

      </Form.Item>
      <Form.Item
        label={t('orgManage.postscriptApplication')}
        name="remark"
        rules={[
          {
            required: true,
            validator: (rule, value, callback): any => {
              if (!value) return callback(`${t('credential.pleaseEnter')}${t('orgManage.postscriptApplication')}`)
              return callback()
            },
          },
        ]}
      >
        <Input.TextArea
          onChange={e => form.setFieldsValue({ remark: e.target?.value.replace(/\s*/g, "") } || '')}
          maxLength={200} showCount></Input.TextArea>
      </Form.Item>

      <Form.Item
        label={t('orgManage.InformationPicture')}
        name="InformationPicture"
      >
        <Upload
          accept="image/*"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', maxHeight: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item
        label={t('orgManage.approvalMaterialURL')}
        name="approvalMaterialURL"
      >
        <Input disabled={true} placeholder={t('orgManage.approvalMaterialURL')} />
      </Form.Item>
      <Form.Item
        label={t('orgManage.postscriptToApplicationMaterials')}
        name="desc"
      >
        <Input.TextArea
          onChange={e => form.setFieldsValue({ desc: e.target?.value.replace(/\s*/g, "") } || '')}
          maxLength={200} showCount></Input.TextArea>
      </Form.Item>
      <Form.Item
        style={{ marginTop: '40px' }}
        label={` `}
      >
        <Button className="com-btn" onClick={submit} style={{ marginRight: '20px' }} type="primary">{t('common.submit')}</Button>
        <Button className="com-btn" onClick={() => history.go(-1)}>{t('common.return')}</Button>
      </Form.Item>
    </Form>
    {/* {isModalVisible ? : ''} */}
  </div>
}


export default ApplyCertification