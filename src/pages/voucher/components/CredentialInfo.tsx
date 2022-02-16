import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Input } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import stepone from '@assets/images/voucher/step_one.svg'


const CredentialInfo: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory()
  console.log(props.location.state);
  // debugger
  const submit = () => {

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

      <div className='exchange-button'>
        <Button className='but' onClick={() => history.go(-1)}>{t('common.return')}</Button>
        <Button type="primary" className="but" onClick={submit}>{t('voucher.Confirm')}</Button>
      </div>
    </Card>
  </div>
}

export default CredentialInfo