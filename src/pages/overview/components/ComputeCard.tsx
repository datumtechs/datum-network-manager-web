import React, { FC } from 'react'
import { Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'

const SeedNode: FC<any> = (props: any) => {
  const { t } = useTranslation()
  return (
    <div className="seed-box">
      <div className="num">{props.seedNode}6</div>
      <div className="title">{t('overview.computeNode')}</div>
      <div className="compute-box">
        <div className="title-section">
          <p>{t('overview.sharedResource')}:</p>
        </div>
        <div className="ring-box">
          <Progress type="circle" percent={props.precent} width={50} strokeWidth={8} strokeColor="#3c3588" />
        </div>
      </div>
    </div>
  )
}
export default SeedNode
