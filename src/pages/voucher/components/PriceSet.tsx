import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Tabs, Radio, Divider } from 'antd'
import "../scss/styles.scss"


const PriceSeting: FC<any> = (props: any) => {
  const { t } = useTranslation()
  console.log(props.location.state);



  return <div>
    <Card className='details-top-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('voucher.VoucherName')}：XXXX名称（XX符号）</p>
          <p>{t('voucher.ContractAddress')}：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </div>
        {/* <Button>{t('voucher.ViewBlockExplorer')}</Button> */}
      </div>
    </Card>
  </div>
}

export default PriceSeting