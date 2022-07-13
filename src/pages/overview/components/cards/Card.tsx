import { FC, useEffect, useState } from 'react'
import { Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import useWinWidth from '@/hooks/useWinWidth'
const Card: FC<any> = (props: any) => {
  const { precent, type, bgColor, unit, value } = props
  const winWidth = useWinWidth();
  const [width, setWidth] = useState(80)
  const { t } = useTranslation()
  useEffect(() => {
    const dom: any = document.querySelector('.wrapper-box')
    const value = +(dom.clientWidth * 0.06).toFixed(2)
    // console.log(dom.clientWidth);
    setWidth(value ? value >= 80 ? value : 80 : 80)
  }, [winWidth])

  return (
    <div className="overview-card item" style={{ background: bgColor }}>
      <div className="overview-card-left">
        <div className="title">{t(`overview.${type}`)}</div>
        <div className="content">
          <span className="value">{value}</span>
          <span className="unit">{unit}</span>
        </div>
      </div>
      <div className="overview-card-right">
        <div className="card-wrap" style={{ width: `${width - width * 0.085}px`, height: `${width - width * 0.085}px`, borderWidth: `${width * 0.15}px` }}>
          <Progress
            className="progress"
            type="circle"
            percent={Number(precent)}
            format={percent => {
              if (percent == 100) {
                return <div className="item-value">100<span className="company">%</span></div>
              }
              return <div className="item-value">{percent}<span className="company">%</span></div>
            }}
            width={width}
            strokeWidth={12}
            trailColor={'rgba(0,0,0,0)'}
            strokeColor={'#fff'}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
