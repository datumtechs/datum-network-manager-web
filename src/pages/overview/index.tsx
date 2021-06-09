import React, { FC } from 'react'
import SeedCard from './components/SeedCard'
import ComputeCard from './components/ComputeCard'
import DataCard from './components/DataCard'
import OverviewTable from './components/OverviewTable'

export const Overview: FC<any> = () => {
  const showName = () => {}
  return (
    <div onClick={showName} className="main-wrapper">
      <div className="left-side">
        <SeedCard />
        <DataCard />
        <ComputeCard precent={75} />
      </div>
      <div className="right-side">
        <OverviewTable />
      </div>
    </div>
  )
}
