import React, { FC } from 'react'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import DataTable from './components/DataTable'
import '../scss/dataNode.scss'

export const DataNodeMgt: FC<any> = () => {
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar />
        <DataTable />
      </div>
    </div>
  )
}
