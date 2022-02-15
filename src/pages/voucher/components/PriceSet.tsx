import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Input } from 'antd'
import "../scss/styles.scss"
import { useHistory } from 'react-router-dom'
import stepTwo from '@assets/images/voucher/step_two.svg'
import exchange from '@assets/images/voucher/exchange.svg'
import warning from '@assets/images/voucher/warning.svg'


const PriceSeting: FC<any> = (props: any) => {
  const { t } = useTranslation(),
    history = useHistory()
  console.log(props.location.state);

  const submit = () => {

  }

  return <div className='price-seting'>
    <Card className='details-top-box layout-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('voucher.VoucherName')}：XXXX名称（XX符号）</p>
          <p>{t('voucher.ContractAddress')}：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </div>
      </div>
      <div className='speed-progress'>
        <img src={stepTwo} alt="" />
      </div>
      <p className='price-exchange-title'>{t('voucher.PleaseSetPriced')}：</p>
      <div className='price-exchange'>
        <div className='price-lat'>
          <p className='price-type-title'>Lat</p>
          <div className='price-type-input'>
            <span>{t('voucher.Add')}</span>
            <Input />
          </div>
        </div>
        <div className='price-icon'>
          <img src={exchange} alt="" />
        </div>
        <div className='price-mtstk'>
          <p className='price-type-title'>MTSTK-618</p>
          <p className='price-secondary-title'>{t('voucher.Circulation')}：XXX</p>
          <div className='price-type-input'>
            <span>{t('voucher.Add')}</span>
            <Input />
          </div>
        </div>
      </div>
      <div className='price-exchange-tips'>
        <img src={warning} alt="" />
        <div>
          <p>{t('voucher.InitialPrice')}：1 MTSTK-618 = XXX LAT ； 1 LAT = XXX MTSTK-618. </p>
          <p>{t('voucher.InitialPriceTips')}.</p>
        </div>
      </div>
      <div className='exchange-button'>
        <Button className='but' onClick={() => history.go(-1)}>{t('common.return')}</Button>
        <Button type="primary" className="but" onClick={submit}>{t('voucher.Confirm')}</Button>
      </div>
    </Card>
  </div>
}

export default PriceSeting