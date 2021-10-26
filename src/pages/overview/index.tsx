import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line import/no-named-as-default
import { overviewApi } from '../../api/index'
import Card from './components/cards/Card'
import PublishDataChart from './components/cards/PublishDataChart'
import DataTrendChart from './components/cards/DataTrendChart'
// import DataAmountCard from './components/cards/DataAmountCard'
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
      // console.log(res);
      if (res.status === 0 && res.data) {
        totalResourceSet(res.data)
      }
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
            <Card type="cpu" bgColor="#657ACD" precent={totalResource.usedCore} value={totalResource?.usedCore} unit={t('overview.core')} />
            <Card type="memory" bgColor="#4F9CFF" precent={totalResource.usedMemory} value={changeSizeObj(totalResource?.usedMemory) ? changeSizeObj(totalResource?.usedMemory).size : 0} unit={changeSizeObj(totalResource.usedMemory).unit} />
            <Card type="bandwidth" bgColor="#FF7688" precent={totalResource.usedBandwidth} value={changeSizeObj(totalResource?.usedBandwidth) ? changeSizeObj(totalResource?.usedBandwidth).size : 0} unit={changeSizeObj(totalResource.usedBandwidth) ? `${changeSizeObj(totalResource.usedBandwidth).unit}P/S` : 0} />
          </div>
          <div className="overview-publish-data item">
            <PublishDataChart />
          </div>
          <div className="overview-data-box">
            <DataTrendChart />
            {/* <DataAmountCard /> */}
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
