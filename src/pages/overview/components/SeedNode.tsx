import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import './scss/seed.scss'

const SeedNode: FC<any> = (props: any) => {
  const { t } = useTranslation()

  return (
    <div className="seed-box">
      <div className="num">{props.seedNode}6</div>
      <div className="title">{t('overview.seedNode')}</div>
      {props.schedueStatus ? (
        <div className="status">
          <span className="status-title">{t('overview.schedueService')}:</span>
          <span className="status-text">{t('overview.open')}</span>
          <span className="open-status-icon status-icon"></span>
        </div>
      ) : (
        <div className="status">
          <span className="status-title">{t('overview.schedueService')}:</span>
          <span className="status-text">{t('overview.close')}</span>
          <span className="close-status-icon status-icon"></span>
        </div>
      )}
    </div>
  )
}
export default SeedNode
