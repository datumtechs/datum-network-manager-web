import { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import upIcon from '@assets/images/4.up.svg'
import downIcon from '@assets/images/4.down.svg'
import { overviewApi } from '@api'

const AmountCard: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { dataSwitch } = props.state

  const [ratio, ratioSet] = useState({
    ringRatio: 0,
    sameRatio: 0,
  })

  useEffect(() => {
    overviewApi.queryWholeNetDateRatio().then(res => {
      ratioSet(res.data)
    })
  }, [])
  return (
    <div className="overview-data-amount2 item">
      <div className="data-name">
        {dataSwitch === 'data' ? t('overview.dataAmountInRosetta') : t('overview.powerAmountInRosetta')}
      </div>
      <div className="overview-data-amount2-content">
        <p className="value">8888.89</p>
        <p className="unit">TB</p>
      </div>
      <div className="ratio-box">
        <div className="upRatio">
          <div className="ratio-line">
            <img src={upIcon} alt="" />
            <p className="success_color">{ratio?.sameRatio}%</p>
          </div>
          <p className="name">{t('overview.mom')}</p>
        </div>
        <div className="downRatio">
          <div className="ratio-line">
            <img src={downIcon} alt="" />
            <p className="failed_color">{ratio?.ringRatio}%</p>
          </div>
          <p className="name">{t('overview.wow')}</p>
        </div>
      </div>
    </div>
  )
}

const DataAmountCard = connect((state: any) => ({ state }))(AmountCard)
export default DataAmountCard
