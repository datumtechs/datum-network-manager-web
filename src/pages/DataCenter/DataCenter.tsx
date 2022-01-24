import { FC, useState } from 'react'
import MetaTable from './components/MetaTable'
import DataChart from './components/DataChart'

export const DataCenter: FC<any> = () => {
  const [searchText, searchTextSet] = useState('')

  return (
    <div className="layout-gray-box">
      <DataChart />
      <MetaTable searchText={searchText} />
    </div>
  )
}
