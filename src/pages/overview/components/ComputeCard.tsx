import React, { FC } from 'react'
import { Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'

const SeedNode: FC<any> = (props: any) => {
  const { t } = useTranslation()
  return (
    <div className="seed-box">
      <div className="num">
        <span className="number">{props.seedNode}6</span>
        <span className="title">{t('overview.computeNode')}</span>
      </div>
      <div className="compute-box">
        <div className="title-section">
          <span>{t('overview.taskInProgress')}:</span>
          <span className="value mainColor">12</span>
        </div>
        {/* <div className="ring-box">
          <Progress type="circle" percent={props.precent} width={50} strokeWidth={8} strokeColor="#3c3588" />
        </div> */}
      </div>
    </div>
  )
}
export default SeedNode
