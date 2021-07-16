import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'

const DataNode: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { dataNodeObj } = props
  const history = useHistory()
  const linkToData = () => {
    history.push('/nodeMgt/dataNodeMgt')
  }

  return (
    <div className="seed-box pointer" onClick={linkToData}>
      <div className="num">
        <span className="number">{dataNodeObj.dataNodeCount}</span>
        <span className="title">{t('overview.dataNode')}</span>
      </div>
      <div className="text-box">
        <div className="text">
          <span>{t('overview.publishData')}:</span>
          <span className="value mainColor">{dataNodeObj.publishedDataCount}</span>
        </div>
        <div className="text">
          <span>{t('overview.unPublishData')}:</span>
          <span className="value mainColor">{dataNodeObj.unpublishedDataCount}</span>
        </div>
      </div>
    </div>
  )
}
export default DataNode
