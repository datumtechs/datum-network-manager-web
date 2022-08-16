import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { overviewApi } from '@api/index'
import { changeSizeObj, BandwidthSizeObj } from '@utils/utils'
import Card from './components/cards/Card'
import PublishDataChart from './components/cards/PublishDataChart'
import DataTrendChart from './components/cards/DataTrendChart'
import TaskChart from './components/cards/TaskChart'
import RecordCard from './components/cards/RecordCard'
import './scss/index.scss'
import useWinWidth from '@hooks/useWinWidth'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

export const Overview = connect((state: any) => ({ state }))((props: any) => {
  const { t } = useTranslation()
  const { width } = useWinWidth()
  const history = useHistory()
  const [totalResource, totalResourceSet] = useState({
    totalBandwidth: 0,
    totalCore: 0,
    totalMemory: 0,
    usedBandwidth: 0,
    usedCore: 0,
    usedMemory: 0,
    usedCore_rate: 0,
    usedMemory_rate: 0,
    usedBandwidth_rate: 0
  })
  const bgColor = {
    memory: '#FF8080',
    cpu: '#62A4E4',
    bandwidth: '#FFA958'
  }
  const queryTotalResourced = (): void => {
    overviewApi.queryUsedTotalResource().then(res => {
      if (res.status === 0 && res.data) {
        const item = {
          ...res.data,
          usedCore_rate: 0,
          usedMemory_rate: 0,
          usedBandwidth_rate: 0
        }
        item.usedCore_rate = ((item.usedCore / item.totalCore) * 100).toFixed(2)
        item.usedMemory_rate = ((item.usedMemory / item.totalMemory) * 100).toFixed(2)
        item.usedBandwidth_rate = ((item.usedBandwidth / item.totalBandwidth) * 100).toFixed(2)
        totalResourceSet(item)
      }
    })
  }

  useEffect(() => {
    queryTotalResourced()
  }, [])

  return (
    <div className="main-center-overview" key={width}>
      <div className="overview-content-box">
        <div className="overview-left">
          <Card type="cpu"
            bgColor={'#657ACD'}
            precent={totalResource.usedCore_rate}
            value={totalResource?.totalCore || 0}
            unit={totalResource.totalCore ? t('overview.core') : ''} />
          <Card type="memory"
            bgColor={'#4F9CFF'}
            precent={totalResource.usedMemory_rate}
            value={changeSizeObj(totalResource?.totalMemory) ? changeSizeObj(totalResource?.totalMemory).size : 0}
            unit={totalResource.totalMemory ? changeSizeObj(totalResource?.totalMemory) ? changeSizeObj(totalResource.totalMemory).unit : changeSizeObj(totalResource?.totalMemory).unit : ''} />
        </div>
        <Card type="bandwidth"
          bgColor={'#FF7688'}
          precent={totalResource.usedBandwidth_rate}
          value={BandwidthSizeObj(totalResource?.totalBandwidth) ? BandwidthSizeObj(totalResource?.totalBandwidth).size : 0}
          unit={totalResource.totalBandwidth ? BandwidthSizeObj(totalResource.totalBandwidth) ? `${BandwidthSizeObj(totalResource.totalBandwidth).unit}ps` : '' : ''} />
      </div>
      <div className="overview-box">
        <div className="overview-left">
          <div className="overview-publish-data item">
            <PublishDataChart bgColor={bgColor} />
          </div>
          <div className="overview-data-box">
            <DataTrendChart bgColor={bgColor} />
            {/* <DataAmountCard /> */}
          </div>
        </div>
        <div></div>
        <div className="overview-right">
          <TaskChart />
          <RecordCard />
        </div>
      </div>
    </div>
  )
})