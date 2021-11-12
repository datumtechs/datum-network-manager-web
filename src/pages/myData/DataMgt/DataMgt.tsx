import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SearchBar from '@/layout/components/SearchBar'
import MyDataTable from './components/MyDataTable'

export const DataMgt: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const [searchText, setSearchText] = useState<string>('')

  const onAdd = (): void => {
    history.push({
      pathname: '/myData/dataAddition',
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
      <div className="data-table-box">
        <SearchBar text={t('center.uploadFile')} onAdd={onAdd} onSearch={onSearch} />
        <MyDataTable searchText={searchText} />
      </div>
    </div>
  )
}
