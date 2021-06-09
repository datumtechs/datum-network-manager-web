import React, { FC } from 'react'
import Bread from '../../layout/components/Bread'
import SearchBar from '../../layout/components/SearchBar'
import MyTable from '../../layout/components/MyTable'

export const WholeCalculation: FC<any> = () => {
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar />
        <MyTable />
      </div>
    </div>
  )
}
