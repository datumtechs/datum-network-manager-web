import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import DataTable from './components/DataTable'
import '../scss/config.scss'

export const DataNodeMgt: FC<any> = props => {
  const { t } = useTranslation()
  const history = useHistory()
  const onAdd = () => {
    console.log('add Btn')
    history.push({
      pathname: '/nodeMgt/dataNodeMgt/addDataNode',
      state: {
        type: 'Add',
        id: '11111111',
      },
    })
  }
  const onSearch = aaaa => {
    console.log('i get the search lets go', aaaa)
  }
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar text={t('node.addNewDataNode')} onAdd={onAdd} onSearch={onSearch} />
        <DataTable />
      </div>
    </div>
  )
}
