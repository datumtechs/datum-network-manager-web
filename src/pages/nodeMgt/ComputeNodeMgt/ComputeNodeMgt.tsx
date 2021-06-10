import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import ComputeTable from './components/ComputeTable'
import '../scss/config.scss'

export const ComputeNodeMgt: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const onAdd = () => {
    console.log('add Btn')
    history.push({
      pathname: '/nodeMgt/computeNodeMgt/addComputeNode',
      state: {
        type: 'Add',
        id: '11111111',
      },
    })
  }
  const onSearch = () => {}
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar text={t('node.addNewComputingNode')} onAdd={onAdd} onSearch={onSearch} />
        <ComputeTable />
      </div>
    </div>
  )
}
