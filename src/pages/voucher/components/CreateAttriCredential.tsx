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
import ERC721Template from '@/utils/erc721/ERC721Template.json'
import moment from 'moment';
import { filterWeb3Code } from '@/utils/utils'

const CreateAttriCredential: FC<any> = (props: any) => {

  const { t, i18n } = useTranslation();
  const history = useHistory();
  const form = useRef<any>();
  const { walletConfig } = props.state;
  const { location } = props;
  const { dataAddress, name, dataTokenId, usage } = location.state || {};
  const [loading, setLoading] = useState(false);
  const submiting = useRef(false)
  const [imageUrl, setImageUrl] = useState('')


  const release = async (params) => {
    const { wallet } = props.state.wallet || {}
    try {
      const { web3 } = wallet
      setLoading(true)
      submiting.current = true
      const flag = await wallet.eth.isConnected()// 判断是否连接当前网络
      if (!flag) return setLoading(false)
      const address = await wallet.connectWallet(walletConfig)
      if (!address) return (setLoading(false), message.error(t('common.pleaseSwitchNetworks')))
      // 构建合约
      const myContract = new web3.eth.Contract(
        ERC721Template,
        dataAddress,
      );
      const date = new Date(`${moment(params.pleaseExpiryDate).format('YYYY-MM-DD')} 23:59:59`).getTime()
      await myContract.methods.createToken(
        String(date),
        params.pleaseUsageScenario == 2 ? true : false,
        params.infoPath
      ).send({
        from: address[0],
      }).on('transactionHash', (hash) => {
        history.push({
          pathname: '/voucher/AttributeCredential/credentialInventory',
          state: {
            dataAddress: dataAddress,
            name: name,
            dataTokenId: dataTokenId,
            status: 'newCreateToken'
          },
        })
      }).on('error', (hash) => {
        setLoading(false)
      })


    } catch (e: any) {
      setLoading(false)
      message.error(t(`exception.${filterWeb3Code(e.code)}`))
      submiting.current = false
    }
  }

  const submit = async () => {
    form.current.validateFields(['IPFSPath',
      "name", "pleaseUsageScenario", "pleaseExpiryDate", "certificateDescription"]).then(upload2)
  }

  const upload2 = (values) => {
    voucher.inventoryUpLoad2({
      description: values.certificateDescription,
      image: values.IPFSPath,
      name: `Datum-${values.name}`
    }).then(res => {
      const { data, status } = res
      if (status == 0) {
        release({ ...values, infoPath: data })
      }
    })
  }


  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
      message.error(t('credential.pictureIncorrect'));
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error(`${t('credential.sizeLimit')}10M`);
      return false
    }
    return false
  };



  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      callback(reader.result as string)
    });
    reader.readAsDataURL(img);
  };


  const UpLoadImg = (info: any) => {
    const formData = new FormData()
    formData.append('file', info.file)
    voucher.inventoryUpLoadImg(formData).then(res => {
      const { data, status } = res
      if (status == 0) {
        getBase64(info.file, url => {
          setImageUrl(url);
        });
        form.current.setFieldsValue({ IPFSPath: data })
      } else {
        setImageUrl('');
      }
      setLoading(false);
    })
  }

  const disabledDate = (current: any) => current && current < moment().endOf('day');

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined className="plus-icon" />}
      <div className="plus-tips">{t('credential.uploadTips')}</div>
    </div>
  );

  return <div className='credential-info-seting'>
    <Card className='details-top-box layout-box p-20'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('credential.credentialContractName')}：{name}</p>
          <p>{t('voucher.ContractAddress')}：{dataAddress}</p>
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
            name="uploadImg"
            className="upload-image"
            labelAlign="left"
          >
            <div className={imageUrl ? 'upload-wrap-no-bg' : 'upload-wrap'}>
              <Upload
                accept="image/*"
                maxCount={1}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={UpLoadImg}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : uploadButton}
              </Upload>
              <span className="upload-filetype">{t('credential.fileType')}: JPG、PNG、GIF、SVG ; {t('credential.sizeLimit')}10M</span>
            </div>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label={`${t('credential.IPFSPath')}:`}
            name="IPFSPath"
            initialValue={'ipfs://QmSDRxvvYbzpUvqh1gC4djXh9fhB5SPd99tyC5gXfXSR1i'}
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
            <Input
              onChange={e => form.current.setFieldsValue({ name: e.target?.value.replace(/\s*/g, "") } || '')}
              prefix={<span style={{ color: '#1D2832' }}>Datum-</span>} className="no-border" placeholder={t('credential.caseAndNumberPlaceholder')} maxLength={64} />
          </Form.Item>
          <Form.Item
            label={`${t('credential.certificateDescription')}:`}
            name="certificateDescription"
            labelAlign="left">
            <Input.TextArea
              onChange={e => form.current.setFieldsValue({ certificateDescription: e.target?.value.replace(/\s*/g, "") } || '')}
              className="no-border" placeholder={t('credential.certificateDescription')} maxLength={200} />
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
            <DatePicker
              mode="date" disabledDate={disabledDate} style={{ width: '100%' }} format={'YYYY-MM-DD'} />
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
            initialValue={+usage == 1 ? 1 : +usage == 2 ? 2 : undefined}
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
              {[1, 3].includes(+usage) ? <Radio value={1}>{t('center.Plaintext')}</Radio> : ''}
              {[2, 3].includes(+usage) ? <Radio value={2}>{t('center.ciphertext')}</Radio> : ''}
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