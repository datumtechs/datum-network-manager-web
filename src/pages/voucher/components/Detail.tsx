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


  const lineEchsrs = <div>123</div>
  const tabs = (key, callback) => {
    return <Tabs onChange={callback} key={key}>
      <TabPane destroyInactiveTabPane={true} tab="Past 15D" key="1">
        <Echsrs data={echarsData} />
      </TabPane>
      <TabPane tab="Past 30D" key="2">
        <Echsrs data={echarsData} />
      </TabPane>
      <TabPane tab="Past 6M" key="3">
        <Echsrs data={echarsData} />
      </TabPane>
      <TabPane tab="Past 1Y" key="4">
        <Echsrs data={echarsData} />
      </TabPane>
      <TabPane tab="Past All" key="5">
        <Echsrs data={echarsData} />
      </TabPane>
    </Tabs>
  }

  return <div>
    <Card className='details-top-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>Credential name：XXXX名称（XX符号）</p>
          <p>Contract address：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
        </div>
        <Button>View on the block explorer</Button>
      </div>
      <div className='proce-box'>
        <div className='proce-left'>
          <h4>Present price</h4>
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
            <Radio.Button value="1">Price trend</Radio.Button>
            <Radio.Button value="2">Volume trend</Radio.Button>
          </Radio.Group>
          {tabs('price', priceCallback)}
        </div>
      </div>
    </Card>
    <Card className='details-bottom-box'>
      <h4>Credential exchange pool</h4>
      {tabs('credential', credentialCallback)}
      <div className='credential-total'>
        <div className='credential-data'>
          <div className='data-total'>
            <h5>Total</h5>
            <p>
              1<sub>MTSTK-618</sub>
            </p>
            <p>
              1<sub>LAT </sub>
            </p>
          </div>
          <Divider style={{ height: '95%' }} type="vertical" />
          <div className='data-total'>
            <h5>My share：23%</h5>
            <p>
              1<sub>MTSTK-618</sub>
            </p>
            <p>
              1<sub>LAT </sub>
            </p>
          </div>
        </div>
        <Button className='add-remove'>Add/Remove Share</Button>
      </div>
      <div className='brack-wrap'>
        <Button>Return</Button>
      </div>
    </Card>
  </div>
}

export default Details