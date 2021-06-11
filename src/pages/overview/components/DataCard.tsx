import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'

const DataNode: FC<any> = (props: any) => {
  const { t } = useTranslation()

  return (
    <div className="seed-box">
      <div className="num">{props.dataNode}7</div>
      <div className="title">{t('overview.dataNode')}</div>
      <div className="text-box">
        <div className="text">
          <span>{t('overview.uploadedData')}:</span>
          <span>{props.uploadedData}33</span>
        </div>
        <div className="text">
          <span>{t('overview.authorizedData')}:</span>
          <span>{props.authorizedData}33</span>
        </div>
      </div>
    </div>
  )
}
export default DataNode
