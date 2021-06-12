import React, { FC } from 'react'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import MetaTable from './components/MetaTable'

export const DataCenter: FC<any> = () => {
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar />
        <MetaTable />
      </div>
    </div>
  )
}
