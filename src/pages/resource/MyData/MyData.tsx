import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import Bread from '../../../layout/components/Bread'
import SearchBar from '../../../layout/components/SearchBar'
import MyDataTable from './components/MyDataTable'

export const MyData: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const [searchText, setSearchText] = useState<string>('')

  const onAdd = (): void => {
    history.push({
      pathname: '/resource/myData/dataAddition',
      state: {
        type: 'add',
      },
    })
  }
  const onSearch = (e): void => {
    setSearchText(e)
  }
  return (
    <div className="layout-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="table-box">
        <SearchBar text={t('center.uploadFile')} onAdd={onAdd} onSearch={onSearch} />
        <MyDataTable searchText={searchText} />
      </div>
    </div>
  )
}
