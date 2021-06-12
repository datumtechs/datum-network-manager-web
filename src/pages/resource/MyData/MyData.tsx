import React, { FC } from 'react'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import MyDataTable from './components/CenterTable'

export const MyData: FC<any> = () => {
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar single />
        <MyDataTable />
      </div>
    </div>
  )
}
