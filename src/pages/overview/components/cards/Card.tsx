import { FC } from 'react'
import { Progress } from 'antd'
import { useTranslation } from 'react-i18next'

const Card: FC<any> = (props: any) => {
  const { precent, type, bgColor } = props
  const { t } = useTranslation()
  return (
    <div className="overview-card item" style={{ backgroundColor: bgColor }}>
      <div className="overview-card-left">
        <div className="title">{t(`overview.${type}`)}</div>
        <div className="content">
          <span className="value">812.88</span>
          <span className="unit">MBp/s</span>
        </div>
      </div>
      <div className="overview-card-right">
        <Progress
          className="progress"
          type="circle"
          percent={Number(precent)}
          width={70}
          strokeWidth={10}
          trailColor="rgba(255,255,255,0.2)"
          strokeColor="#FFF"
        />
      </div>
    </div>
  )
}

export default Card
