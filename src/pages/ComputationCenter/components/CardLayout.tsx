import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { overviewApi } from '@api'
import { changeSizeObj } from '@utils/utils'
import '../scss/ConputeTable.scss'
import ComputeCard from './ComputeCard'

const CardLayout: FC<any> = (props: any) => {

  const { t } = useTranslation()

  const [totalResource, totalResourceSet] = useState({
    totalBandwidth: 0,
    totalCore: 0,
    totalMemory: 0,
    usedBandwidth: 0,
    usedCore: 0,
    usedMemory: 0,
  })

  const queryUsedTotalResource = () => {
    overviewApi.queryUsedTotalResource().then(res => {
      if (res.status === 0 && res.data) {
        totalResourceSet(res.data)
      }
    })
  }

  useEffect(() => {
    queryUsedTotalResource()
  }, [])

  const cardList = [
    {
      id: 1,
      bgColor: '#657ACD',
      type: 'memory',
      label: t('overview.rosettaMemory'),
      value: changeSizeObj(totalResource.totalMemory).size,
      unit: changeSizeObj(totalResource.totalMemory).unit,
      percent: ((totalResource.usedMemory / totalResource.totalMemory) * 100).toFixed(2),
    }, {
      id: 2,
      bgColor: '#4F9CFF',
      type: 'cpu',
      label: t('overview.rosettaCpu'),
      value: totalResource.totalCore,
      unit: t('overview.core'),
      percent: ((totalResource.usedCore / totalResource.totalCore) * 100).toFixed(2),
    }, {
      id: 3,
      bgColor: '#FF7688',
      type: 'bandwidth',
      label: t('overview.rosettaBandwidth'),
      value: changeSizeObj(totalResource.totalBandwidth).size,
      unit: changeSizeObj(totalResource.totalBandwidth).unit,
      percent: ((totalResource.usedBandwidth / totalResource.totalBandwidth) * 100).toFixed(2),
    }
  ]
  return <div className="center-compute-card-box">{
    cardList.map(card =>
      <ComputeCard key={card.id} label={card.label} bgColor={card.bgColor} value={card.value} percent={card.percent} unit={card.unit} />
    )
  }</div>
}

export default CardLayout

