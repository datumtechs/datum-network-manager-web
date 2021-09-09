import { FC, useState } from 'react'
import MetaTable from './components/MetaTable'
import DataChart from './components/DataChart'

export const DataCenter: FC<any> = () => {
  const [searchText, searchTextSet] = useState('')
  const onSearch = text => {
    searchTextSet(text)
  }
  return (
    <div className="layout-gray-box">
      <DataChart />
      {/* <SearchBar onSearch={onSearch} /> */}
      <MetaTable searchText={searchText} />
    </div>
  )
}
