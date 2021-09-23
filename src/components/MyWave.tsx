import React, { useEffect } from 'react'
import waves from '../lib/waves'
import './scss/myWave.scss'

const MyWave: React.FC<any> = (props: any) => {

  useEffect(() => {
    waves.waves()
  }, [])
  return (
    <div className="waves"></div>
  )
}

export default MyWave
