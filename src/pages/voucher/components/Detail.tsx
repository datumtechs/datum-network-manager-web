import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Tabs, Radio, Divider } from 'antd'
import "../scss/styles.scss"
const { TabPane } = Tabs;
import Echsrs from './LineEchars';


const Details: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const [trendSelect, setTrendSelect] = useState('1')
  const [echarsData, setEcharsData] = useState()
  const priceCallback = () => { }
  const credentialCallback = () => { }

  const tabs = (key, callback, height) => {
    return <Tabs onChange={callback} key={key} destroyInactiveTabPane={true}>
      <TabPane tab={15 + t('voucher.DD')} key="1">
        <Echsrs data={echarsData} height={height} />
      </TabPane>
      <TabPane tab={30 + t('voucher.DD')} key="2">
        <Echsrs data={echarsData} height={height} />
      </TabPane>
      <TabPane tab={6 + t('voucher.MM')} key="3">
        <Echsrs data={echarsData} height={height} />
      </TabPane>
      <TabPane tab={1 + t('voucher.YY')} key="4">
        <Echsrs data={echarsData} height={height} />
      </TabPane>
      <TabPane tab={t('voucher.ALL')} key="5">
        <Echsrs data={echarsData} height={height} />
      </TabPane>
    </Tabs>
  }

  return <div>
    <Card className='details-top-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>{t('voucher.VoucherName')}：XXXX名称（XX符号）</p>
          <p>{t('voucher.ContractAddress')}：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </div>
        <Button>{t('voucher.ViewBlockExplorer')}</Button>
      </div>
      <div className='proce-box'>
        <div className='proce-left'>
          <h4>{t('voucher.CurrentPrice')}</h4>
          <div className='price-card'>
            <p>
              1<sub>MTSTK-618</sub>
              <span>=</span>
              999<sub>LAT</sub>
            </p>
            <p>
              1<sub>MTSTK-618</sub>
              <span>=</span>
              999<sub>LAT</sub>
            </p>
          </div>
        </div>
        <div className='proce-right'>
          <Radio.Group
            className='price-radio-btn'
            value={trendSelect} onChange={e => setTrendSelect(e.target.value)} buttonStyle="solid">
            <Radio.Button value="1">{t('voucher.PriceTrend')}</Radio.Button>
            <Radio.Button value="2">{t('voucher.VolumeTrend')}</Radio.Button>
          </Radio.Group>
          {tabs('price', priceCallback, '145px')}
        </div>
      </div>
    </Card>
    <Card className='details-bottom-box'>
      <h4>{t('voucher.CredentialPool')}</h4>
      {tabs('credential', credentialCallback, '210px')}
      <div className='credential-total'>
        <div className='credential-data'>
          <div className='data-total'>
            <h5>{t('voucher.Total')}</h5>
            <p>
              1<sub>MTSTK-618</sub>
            </p>
            <p>
              1<sub>LAT </sub>
            </p>
          </div>
          <Divider style={{ height: '95%' }} type="vertical" />
          <div className='data-total'>
            <h5>{t('voucher.MyShare')}：23%</h5>
            <p>
              1<sub>MTSTK-618</sub>
            </p>
            <p>
              1<sub>LAT </sub>
            </p>
          </div>
        </div>
        <Button className='add-remove'>{t('voucher.AddAndRemoveShare')}</Button>
      </div>
      <div className='brack-wrap'>
        <Button>{t('common.return')}</Button>
      </div>
    </Card>
  </div>
}

export default Details