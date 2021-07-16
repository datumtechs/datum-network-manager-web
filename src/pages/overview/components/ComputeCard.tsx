import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import '../scss/seed.scss'

const SeedNode: FC<any> = (props: any) => {
  const { powerDataObj } = props
  const { t } = useTranslation()
  const history = useHistory()
  const linkToCompute = () => {
    history.push('/nodeMgt/computeNodeMgt')
  }
  return (
    <div className="seed-box pointer" onClick={linkToCompute}>
      <div className="num">
        <span className="number">{powerDataObj.runningTaskCount}</span>
        <span className="title">{t('overview.computeNode')}</span>
      </div>
      <div className="compute-box">
        <div className="title-section">
          <span>{t('overview.taskInProgress')}:</span>
          <span className="value mainColor">{powerDataObj.powerNodeCount}</span>
        </div>
        {/* <div className="ring-box">
          <Progress type="circle" percent={props.precent} width={50} strokeWidth={8} strokeColor="#3c3588" />
        </div> */}
      </div>
    </div>
  )
}
export default SeedNode
