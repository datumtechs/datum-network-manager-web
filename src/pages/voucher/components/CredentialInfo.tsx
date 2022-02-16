import { FC, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, InputNumber } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import stepone from '@assets/images/voucher/step_one.svg'

/* eslint-disable @typescript-eslint/no-unused-expressions */

const CredentialInfo: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory(),
    form = useRef<any>()
  console.log(props.location.state);
  // debugger
  const submit = () => {
    // debugger
    form.current.validateFields().then(values => {
      console.log(values);

    })
    const { type } = props.location.state
    history.push({
      pathname: `/${type !== 'models' ? 'myData/dataMgt' : 'MyTemplate'}/PriceSet`,
      state: {
        credentialID: 1,
        dataStatus: type !== 'models' ? '2' : '1'
      },
    })
  }

  return <div className='credential-info-seting'>
    <Card className='details-top-box layout-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('voucher.VoucherName')}：XXXX名称（XX符号）</p>
          <p>{t('voucher.ContractAddress')}：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </div>
      </div>
      <div className='speed-progress'>
        <img src={stepone} alt="" />
      </div>
      <Form
        ref={form}
        colon={false}
        size={"large"}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        <p className='title'>{t('voucher.CredentialName')}</p>
        <Form.Item
          label={t('voucher.Name')}
          name="voucherName"
          labelAlign="left"
          rules={[{ required: true, message: `${t('voucher.RequiredName')}` }]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label={t('voucher.Symbol')}
          name="Symbol"
          rules={[{ required: true, message: `${t('voucher.RequiredSymbol')}` }]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <p className='title'>{t('voucher.CirculationTotal')}:</p>
        <Form.Item
          labelAlign="left"
          label={t('voucher.Circulation')}
          name="Circulation"
          rules={[{ required: true, message: `${t('voucher.RequiredCirculation')}` }]}
        >
          <InputNumber decimalSeparator="0" min={1} max={999999999} />
        </Form.Item>
        <p className='title'>{t('voucher.DescriptionTitle')}</p>
        <Form.Item
          labelAlign="left"
          label={t('voucher.DescriptionValue')}
          name="DescriptionValue"
        >
          <Input.TextArea maxLength={200} rows={4} showCount />
        </Form.Item>
      </Form>


      <div className='exchange-button'>
        <Button className='but' onClick={() => history.go(-1)}>{t('common.return')}</Button>
        <Button type="primary" className="but" onClick={submit}>{t('voucher.PublishCredential')}</Button>
      </div>
    </Card>
  </div>
}

export default CredentialInfo