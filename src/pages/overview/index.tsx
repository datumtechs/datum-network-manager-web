import React, { FC } from 'react'
import SeedNode from './components/SeedNode'
import ComputeNode from './components/ComputeNode'
import DataNode from './components/DataNode'
import OverviewTable from './components/OverviewTable'


export const overview: FC<any> = () => {
  const showName = () => { }
  return (
    <div onClick={showName} className="main-wrapper">
      <div className="left-side">
        <SeedNode />
        <DataNode />
        <ComputeNode precent={75} />
      </div>
      <div className="right-side">
        <OverviewTable />
      </div>
    </div>
  )
}
