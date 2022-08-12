import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Form, Button, Input, message, Modal, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
// eslint-disable-next-line import/order
import { BaseInfoContext } from '@/layout/index'
import './index.scss'
import { Rule } from 'antd/lib/form'
import { loginApi } from '@api/index'
import { filterAmount } from '@/utils/utils'

const UpdateAdmin: FC<any> = (props: any) => {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const baseInfo = useContext(BaseInfoContext);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<any>(props.state.wallet?.wallet);
  const [address, setAddress] = useState(props.state.address?.address || '');
  const [replaceAddress, setReplaceAddress] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState('0');
  const formRef = useRef<any>(null);
  const rules: Rule[] = ([{
    required: true, message: `${t('UserCenter.nodeAddressIncorrect')}`,
    validateTrigger: 'blur',
  }, {
    validateTrigger: 'blur',
    validator: (_, value) => {
      if (wallet.web3.utils.isAddress(value)) {
        return Promise.resolve()
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`${t('UserCenter.nodeAddressIncorrect')}`)// nodeAddressIncorrect

    }
  }])


  const validate = () => {
    formRef.current.validateFields()
      .then(values => {
        setReplaceAddress(values.address)
        setModalVisible(true)
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (disabled) {
      formRef.current!.setFieldsValue({
        ProfileName: baseInfo?.name,
        address,
      })
    }
    const { wallet: { web3 } } = props.state.wallet || {}
    if (baseInfo.observerProxyWalletAddress) web3.eth.getBalance(baseInfo.observerProxyWalletAddress).then(amount => {
      setBalance(filterAmount(String(amount)))
    }).catch(console.log)
  }, [baseInfo])

  const edit = () => {
    setDisabled(false)
  }
  const switchLogin = () => {
    props.sendAction(false)
    props.setLoginInfo({})
  }

  const submit = () => {
    setLoading(true)
    loginApi.updateAdmin({ newAddress: replaceAddress }).then(res => {
      if (res.status == 0) {
        message.success(t('task.success'))
        switchLogin()
      }
      setModalVisible(false)
      setLoading(false)
    })
      .catch(err => {
        setLoading(false)
      })
  }


  return (<div className="layout-box p-20">
    <div className="form-box userForm">
      <Form
        size="large"
        form={form}
        ref={formRef}
        labelAlign="left"
        layout={'horizontal'}
        wrapperCol={{ span: 10 }}
        labelCol={{ span: i18n.language === 'en' ? 5 : 3 }}
      >
        <Form.Item colon label={t('UserCenter.ProfileOrganizationIdentifier')}
          className="form-item">
          <p className="title" style={{ paddingLeft: '11px' }}>{baseInfo?.identityId}</p>
        </Form.Item>

        <Form.Item colon label={t('UserCenter.ProfileOrganizationName')}
          className="form-item"
          name="ProfileName"
        >
          <Input disabled={true}
            placeholder={t('UserCenter.ProfileNamePlaceholder')}
          />
        </Form.Item>

        <Form.Item colon label={t('UserCenter.builtWalletAddress')}
          className="form-item">
          <div className='wallet-address-box'>
            <p className="title" style={{ paddingLeft: '11px' }}>{baseInfo?.observerProxyWalletAddress}</p>
            <Tooltip placement="right" title={t('UserCenter.builtWalletTips')}>
              <QuestionCircleOutlined style={{ fontSize: '20px', 'color': '#3C3588' }} />
            </Tooltip>
          </div>
        </Form.Item>
        <Form.Item colon label={t('UserCenter.builtWalletBalance')}
          className="form-item">
          <p className="title" style={{ paddingLeft: '11px' }}>{balance}     LAT</p>
        </Form.Item>
        <Form.Item colon label={t('UserCenter.address')}
          className="form-item"
          name="address"
          rules={rules}
        >
          <Input
            disabled={disabled}
            maxLength={64}
            placeholder={t('UserCenter.address')}
          />
        </Form.Item>
        {/* : ' '} */}

        <Form.Item colon={false} className="form-item" label={" "} style={{ paddingLeft: '11px' }}>
          {disabled ?
            <Button className="global-btn" onClick={() => edit()}>
              {t('UserCenter.ProfileButtonEdit')}
            </Button> : <>
              <Button className="global-btn" onClick={() => (setDisabled(true), baseInfo?.fetchData(true))}>
                {t('UserCenter.ModalCancel')}
              </Button>
              <Button type="primary" className="global-btn"
                style={{ marginLeft: '30px' }} loading={loading}
                onClick={validate}>
                {t('common.submit')}
              </Button>
            </>
          }
        </Form.Item>
      </Form>
    </div>
    <Modal title={t('common.tips')}
      visible={isModalVisible}
      confirmLoading={loading}
      onOk={submit}
      onCancel={() => setModalVisible(false)}>
      <p>{t('UserCenter.replaceNodeAddress')}{replaceAddress}   ?</p>
    </Modal>
  </div>)
}



const mapDispatchToProps = (dispatch: any) => ({
  sendAction: () => {
    dispatch({
      type: 'LOGOUT',
    })
  },
  setLoginInfo: (data) => {
    dispatch({
      type: 'LOGININFO',
      data
    })
  }
})
export default connect((state: any) => ({ state }), mapDispatchToProps)(UpdateAdmin)