import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line import/no-named-as-default
import { overviewApi } from '../../api/index'
import Card from './components/cards/Card'
import PublishDataChart from './components/cards/PublishDataChart'
import DataTrendChart from './components/cards/DataTrendChart'
import DataAmountCard from './components/cards/DataAmountCard'
import TaskChart from './components/cards/TaskChart'
import RecordCard from './components/cards/RecordCard'
import './scss/index.scss'
import { changeSizeObj } from '../../utils/utils'


export const Overview: FC<any> = () => {
  const { t } = useTranslation()
  const [totalResource, totalResourceSet] = useState({
    totalBandwidth: 0,
    totalCore: 0,
    totalMemory: 0,
    usedBandwidth: 0,
    usedCore: 0,
    usedMemory: 0,
  })
  const queryTotalResourced = (): void => {
    overviewApi.queryUsedTotalResource().then(res => {
      totalResourceSet(res.data)
    })
  }

  useEffect(() => {
    queryTotalResourced()
  }, [])

  return (
    <>
      <div className="overview-title">{t('overview.totalOccupied')}</div>
      <div className="overview-box">
        <div className="overview-left">
          <div className="overview-content-box">
            <Card type="cpu" bgColor="#657ACD" precent={19} value={totalResource?.usedCore} unit={t('overview.core')} />
            <Card type="memory" bgColor="#4F9CFF" precent={49} value={changeSizeObj(totalResource?.usedMemory).size} unit={changeSizeObj(totalResource.usedMemory).unit} />
            <Card type="bandwidth" bgColor="#FF7688" precent={39} value={changeSizeObj(totalResource?.usedBandwidth).size} unit={`${changeSizeObj(totalResource.usedBandwidth).unit}P/S`} />
          </div>
          <div className="overview-publish-data item">
            <PublishDataChart />
          </div>
          <div className="overview-data-box">
            <DataTrendChart />
            <DataAmountCard />
          </div>
        </div>
        <div className="overview-right">
          <TaskChart />
          <RecordCard />
        </div>
      </div>
    </>
  )
}
