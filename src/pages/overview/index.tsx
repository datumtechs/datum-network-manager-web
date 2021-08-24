import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import './scss/index.scss'

export const Overview: FC<any> = () => {
  const { t } = useTranslation()
  return (
    <div className="overview-box">
      <div className="overview-title">{t('overview.totalOccupied')}</div>
      <div className="overview-content-box">
        <div className="overview-cpu item"></div>
        <div className="overview-memory item"></div>
        <div className="overview-bandwidth item"></div>
      </div>
      <div className="overview-tasks item"></div>
      <div className="overview-publish-data item"></div>
      <div className="overview-data-box">
        <div className="overview-data-amount1 item"></div>
        <div className="overview-data-amount2 item"></div>
        <div className="overview-authorization item"></div>
      </div>
    </div>
  )
}
