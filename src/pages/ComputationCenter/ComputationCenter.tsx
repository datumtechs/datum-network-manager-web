import { FC, useState } from 'react'
import ConputeTable from './components/ConputeTable'
import CardLayout from './components/CardLayout'

export const ComputationCenter: FC<any> = () => {
  const [searchText, searchTextSet] = useState('')

  return (
    <div className="layout-gray-box">
      <CardLayout />
      <ConputeTable searchText={searchText} />
    </div>
  )
}
