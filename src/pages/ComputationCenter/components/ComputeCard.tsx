import { FC, useEffect, useState } from 'react'
import { Progress } from 'antd'
import useWinWidth from '../../../hooks/useWinWidth'


const ComputeCard: FC<any> = (props: any) => {

  const size = useWinWidth()
  const [progressSize, progressSizeSet] = useState(70)

  useEffect(() => {
    if (size.width > 1600 || size.width === 1920) {
      progressSizeSet(90)
    } else {
      progressSizeSet(70)
    }
  }, [size.width])

  console.log(size.width);
  const { label, bgColor, value, precent } = props
  return <div className="center-compute-card" style={{ 'backgroundColor': bgColor }}>
    <div className="center-compute-card-left">
      <div className="center-compute-card-title">
        {label}
      </div>
      <div className="center-compute-card-content">
        <span className="value">{value}.11111</span>
        <span className="unit">unit</span>
      </div>
    </div>
    <Progress className="center-compute-card-progress" percent={Number(precent)} type="circle"
      width={progressSize}
      strokeWidth={10}
      trailColor="rgba(255,255,255,0.2)"
      strokeColor="#FFF" />
  </div>
}

export default ComputeCard












