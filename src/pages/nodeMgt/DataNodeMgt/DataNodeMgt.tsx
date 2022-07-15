import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SearchBar from '@/layout/components/SearchBar'
import DataTable from './components/DataTable'
import '../scss/index.scss'

export const DataNodeMgt: FC<any> = props => {
  const history = useHistory()
  const [searchText, searchTextSet] = useState('')
  const onAdd = () => {
    history.push({
      pathname: '/nodeMgt/dataNodeMgt/addDataNode',
      state: {
        type: 'Add',
      },
    })
  }
  const onSearch = text => {
    searchTextSet(text)
  }
  return (
    <div className="layout-box">
      <SearchBar onAdd={onAdd} onSearch={onSearch} />
      <DataTable searchText={searchText} />
    </div>
  )
}
