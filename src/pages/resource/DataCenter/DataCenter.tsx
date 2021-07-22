import React, { FC, useState } from 'react'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import MetaTable from './components/MetaTable'

export const DataCenter: FC<any> = () => {
  const [searchText, searchTextSet] = useState('')
  const onSearch = text => {
    searchTextSet(text)
  }
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar onSearch={onSearch} />
        <MetaTable searchText={searchText}/>
      </div>
    </div>
  )
}
