import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ComputeCard from './ComputeCard'
import '../scss/ConputeTable.scss'


const CardLayout: FC<any> = (props: any) => {

  const { t } = useTranslation()
  const cardList = [
    {
      id: 1,
      bgColor: '#657ACD',
      type: 'memory',
      label: t('overview.rosettaMemory'),
      value: 1111,
      precent: 30
    }, {
      id: 2,
      bgColor: '#4F9CFF',
      type: 'cpu',
      label: t('overview.rosettaCpu'),
      value: 1111,
      precent: 50
    }, {
      id: 3,
      bgColor: '#FF7688',
      type: 'bandwidth',
      label: t('overview.rosettaBandwidth'),
      value: 1111,
      precent: 70
    }
  ]
  return <div className="center-compute-card-box">{
    cardList.map(card =>
      <ComputeCard key={card.id} label={card.label} bgColor={card.bgColor} value={card.value} precent={card.precent} />
    )
  }</div>
}

export default CardLayout

