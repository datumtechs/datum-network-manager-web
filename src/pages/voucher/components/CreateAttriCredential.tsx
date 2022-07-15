import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button, Card, Form, Input, Upload, message, Tooltip,
  DatePicker, Radio
} from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { voucher } from '@api'
import { QuestionCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ABIJson from '@/utils/DataTokenFactory.json'
import zh from 'antd/lib/locale/zh_CN'
import en from 'antd/lib/locale/en_GB'
import { Complement, filterWeb3Code, filterIntegerAmount } from '@/utils/utils'
import { requestCancel } from '@/utils/loading'

const CreateAttriCredential: FC<any> = (props: any) => {

  const { t, i18n } = useTranslation();
  const history = useHistory();
  const form = useRef<any>();
  const [dataTokenFactory, setDataTokenFactory] = useState('');
  const { walletConfig } = props.state;
  const { location } = props;
  const { dataTokenId, metaDataId, metaDataName, dataId } = location.state || {};
  const [loading, setLoading] = useState(false);
  const submiting = useRef(false)
  const [imageUrl, setImageUrl] = useState('')


  const initialState: any = useRef()

  const release = async (params) => {

  }

  const submit = async () => {
    form.current.validateFields().then(values => {
      release(values)
    })
  }


  useEffect(() => {

  }, [])


  const sendTransactionData = (params, nonce, hash) => {
    voucher.postTransaction({
      "desc": params.DescriptionValue,
      "hash": hash,
      "metaDataId": dataId,// metaDataId,
      "name": params.name,
      "symbol": params.symbol,
      "total": params.initialSupply + Complement,
      "init": params.initialSupply + Complement,
      nonce
    }).then(res => {
      const { data, status } = res
      if (status === 0) {
        localStorage.setItem('metaDataId', data)
        query(data)
      }
    })
  }

  const query = async (id) => {

  }
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

  return <div className='credential-info-seting'>
    <Card className='details-top-box layout-box p-20'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('credential.credentialContractName')}：{metaDataName}</p>
          <p>{t('voucher.ContractAddress')}：{metaDataId}</p>
        </div>
      </div>
      <div className="form-wrap">
        <Form
          ref={form}
          colon={false}
          size={"large"}
          wrapperCol={{ span: 14 }}
          className={i18n.language == 'zh' ? 'createzh-label-width' : 'create-en-label-width'}
        >
          <Form.Item
            label={`${t('credential.uploadPictures')}:`}
            name="name"
            className="upload-image"
            labelAlign="left"
            rules={[
              {
                required: true,
                validator: (rule, value, callback): any => {
                  if (!imageUrl) return callback(`${t('common.pleaseUpload')}${i18n.language == 'en' ? 'Pictures' : '图片'}`)
                },
              },
            ]}
          >
            <div className="upload-wrap">
              <Upload
                accept="image/*"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
              <span className="upload-filetype">{t('credential.fileType')}: JPG、PNG、GIF、SVG ; {t('credential.sizeLimit')}10M</span>
            </div>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label={`${t('credential.IPFSPath')}:`}
            name="IPFSPath"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label={`${t('voucher.VoucherName')}:`}
            name="name"
            labelAlign="left"
            rules={[
              {
                required: true,
                validator: (rule, value, callback): any => {
                  if (!value) return callback(`${t('credential.pleaseEnter')}${t('voucher.Name')}`)
                  if (value.length < 2) return callback(t('common.inputValueminlength'))
                  return /^[A-Za-z0-9]+$/.test(value) ? callback() : callback(t('voucher.OnlyLettersNumbersEntered'));
                },
              },
            ]}
          >
            <Input prefix={<span style={{ color: '#1D2832' }}>Datum-</span>} className="no-border" placeholder={t('credential.caseAndNumberPlaceholder')} maxLength={64} />
          </Form.Item>
          <Form.Item
            label={`${t('credential.certificateDescription')}:`}
            name="certificateDescription"
            labelAlign="left">
            <Input.TextArea className="no-border" placeholder={t('credential.certificateDescription')} maxLength={200} />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label={
              <>
                <span style={{ width: i18n.language == 'en' ? '240px' : '155px', marginRight: '10px' }}>{t('credential.pleaseExpiryDate')}:</span>
                <Tooltip placement="topLeft" title={t('credential.pleaseExpiryDateTips')}>
                  <QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588' }} />
                </Tooltip>
              </>
            }
            name="pleaseExpiryDate"
            rules={[
              {
                required: true,
                validator: (rule, value, callback): any => {
                  if (!value) return callback(`${t('center.pleaseSelect')}${t('credential.pleaseExpiryDate')}`)
                  return callback()
                }
              },
            ]}
          >
            <DatePicker mode="date" style={{ width: '100%' }} format={'YYYY-MM-DD'} />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label={
              <>
                <span style={{ width: i18n.language == 'en' ? '240px' : '155px', marginRight: '10px' }}>{t('credential.pleaseUsageScenario')}:</span>
                <Tooltip placement="topLeft" title={t('credential.pleaseUsageScenarioTips')}>
                  <QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588' }} />
                </Tooltip>
              </>
            }
            name="pleaseUsageScenario"
            rules={[
              {
                required: true,
                validator: (rule, value, callback): any => {
                  if (!value) return callback(`${t('center.pleaseSelect')}${t('credential.pleaseUsageScenario')}`)
                  return callback()
                }
              },
            ]}
          >
            <Radio.Group>
              <Radio value={1}>{t('center.Plaintext')}</Radio>
              <Radio value={2}>{t('center.ciphertext')}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label={` `}
          >
            <div className='exchange-button' style={{ marginTop: '30px' }}>
              <Button className='but' onClick={() => history.go(-1)}>{t('common.return')}</Button>
              <Button type="primary" className="but" loading={loading} onClick={submit}>{t('credential.createCredential')}</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Card>
  </div>
}

export default connect((state: any) => ({ state }))(CreateAttriCredential)