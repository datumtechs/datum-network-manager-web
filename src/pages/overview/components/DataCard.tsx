import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'

const DataNode: FC<any> = (props: any) => {
  const { t } = useTranslation()

  return (
    <div className="seed-box">
      <div className="num">
        <span className="number">{props.dataNode}7</span>
        <span className="title">{t('overview.dataNode')}</span>
      </div>
      <div className="text-box">
        <div className="text">
          <span>{t('overview.publishData')}:</span>
          <span className="value mainColor">{props.uploadedData}33</span>
        </div>
        <div className="text">
          <span>{t('overview.authorizedData')}:</span>
          <span className="value mainColor">{props.authorizedData}33</span>
        </div>
      </div>
    </div>
  )
}
export default DataNode
