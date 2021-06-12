import React, { FC } from 'react'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import ConputeTable from './components/ConputeTable'

export const ComputationCenter: FC<any> = () => {
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar />
        <ConputeTable />
      </div>
    </div>
  )
}
