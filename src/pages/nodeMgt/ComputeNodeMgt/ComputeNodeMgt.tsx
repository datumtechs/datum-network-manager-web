import React, { FC, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import ComputeTable from './components/ComputeTable'
import '../scss/index.scss'

export const ComputeNodeMgt: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const sonRef = useRef()
  const [searchText, searchTextSet] = useState('')
  const onAdd = () => {
    history.push({
      pathname: '/nodeMgt/computeNodeMgt/addComputeNode',
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
      <div className="table-box">
        <SearchBar text={t('node.addNewComputingNode')} onAdd={onAdd} onSearch={onSearch} />
        <ComputeTable searchText={searchText} sonRef={sonRef} />
      </div>
    </div>
  )
}
