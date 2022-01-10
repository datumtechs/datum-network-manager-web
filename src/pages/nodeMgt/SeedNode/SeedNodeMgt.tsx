import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useHistory } from 'react-router-dom'
import SearchBar from '@/layout/components/SearchBar'
import SeedNodeTable from './components/SeedNodeTable'
import { AddSeedNode } from './AddSeedNode'
import '../scss/index.scss'

export const SeedNodeMgt: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const onAdd = () => {
    setShow(true)
  }

  const cancel = () => {
    setShow(false)
  }
  return (
    <div className="layout-box">
      <div className="data-table-box">
        <SearchBar text={t('node.addSeedNode')} onAdd={onAdd} hideSearch />
        <SeedNodeTable />
        <AddSeedNode show={show} cancel={cancel} />
      </div>
    </div>
  )
}
