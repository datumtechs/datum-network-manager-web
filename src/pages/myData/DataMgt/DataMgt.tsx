import { FC, useState } from 'react'
import MyDataTable from './components/MyDataTable'

export const DataMgt: FC<any> = () => {
  const [searchText, setSearchText] = useState<string>('')


  return (
    <div className="layout-box">
      <MyDataTable searchText={searchText} />
    </div>
  )
}
