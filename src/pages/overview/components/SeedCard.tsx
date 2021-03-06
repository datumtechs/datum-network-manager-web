import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'
import iconImg from '../../../assets/images/overview/2.seed.svg'

const SeedNode: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { serviceStatus } = props

  return (
    <div className="seed-box">
      <div className="icon">
        <img src={iconImg} alt="" />
      </div>
      <div className="seed-box-title">{t('overview.schedueService')}</div>
      {serviceStatus &&
        (serviceStatus === 'enabled' ? (
          <div className="status">
            {/* <span className="status-title">{t('overview.schedueService')}:</span> */}
            <span className="status-text">{t('overview.open')}</span>
            <span className="open-status-icon status-icon value"></span>
          </div>
        ) : (
          <div className="status">
            {/* <span className="status-title">{t('overview.schedueService')}:</span> */}
            <span className="status-text">{t('overview.close')}</span>
            <span className="close-status-icon status-icon value"></span>
          </div>
        ))}
    </div>
  )
}
export default SeedNode
