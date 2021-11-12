import { FC, useEffect, useState } from 'react'
import { Progress } from 'antd'
import useWinWidth from '@hooks/useWinWidth'



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
  const { label, bgColor, value, percent, unit } = props
  return <div className="center-compute-card" style={{ 'backgroundColor': bgColor }}>
    <div className="center-compute-card-left">
      <div className="center-compute-card-title">
        {label}
      </div>
      <div className="center-compute-card-content">
        <span className="value">{value}</span>
        <span className="unit" style={{ paddingLeft: '5px' }}>{unit}</span>
      </div>
    </div>
    <Progress className="center-compute-card-progress" percent={Number(percent)} type="circle"
      status="normal"
      width={progressSize}
      strokeWidth={10}
      trailColor="rgba(255,255,255,0.2)"
      strokeColor="#FFF" />
  </div >
}

export default ComputeCard












