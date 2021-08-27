import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SeedNodeTable from './components/SeedNodeTable'
import SearchBar from '../../../layout/components/SearchBar'
import '../scss/seed.scss'

export const SeedNodeMgt: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const history = useHistory()
  const onAdd = () => {
    history.push({
      pathname: '/nodeMgt/SeedNodeMgt/addSeedNode',
      state: {
        type: 'Add',
      },
    })
  }
  return (
    <div className="layout-box">
      <div className="table-box">
        <SearchBar text={t('node.addSeedNode')} onAdd={onAdd} hideSearch />
        <SeedNodeTable />
      </div>
    </div>
  )
}
