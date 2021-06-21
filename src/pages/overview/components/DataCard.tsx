import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'

const DataNode: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const history = useHistory()
  const linkToData = () => {
    history.push('/nodeMgt/dataNodeMgt')
  }
  return (
    <div className="seed-box pointer" onClick={linkToData}>
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
          <span>{t('overview.unPublishData')}:</span>
          <span className="value mainColor">{props.authorizedData}33</span>
        </div>
      </div>
    </div>
  )
}
export default DataNode
