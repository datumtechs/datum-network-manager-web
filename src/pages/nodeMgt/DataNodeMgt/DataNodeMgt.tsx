import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SearchBar from '@/layout/components/SearchBar'
import DataTable from './components/DataTable'
import '../scss/index.scss'

export const DataNodeMgt: FC<any> = props => {
  const { t } = useTranslation()
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
      <div className="data-table-box">
        <SearchBar text={t('node.addNewDataNode')} onAdd={onAdd} onSearch={onSearch} />
        <DataTable searchText={searchText} />
      </div>
    </div>
  )
}
