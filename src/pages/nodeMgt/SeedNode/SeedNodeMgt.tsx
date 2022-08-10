import { FC, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
// import { useHistory } from 'react-router-dom'
import SearchBar from '@/layout/components/SearchBar'
import SeedNodeTable from './components/SeedNodeTable'
import { AddSeedNode } from './components/AddSeedNode'
import '../scss/index.scss'

export const SeedNodeMgt: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const tableRef = useRef<any>()
  const onAdd = () => {
    setShow(true)
  }

  const cancel = () => {
    setShow(false)
    tableRef.current.querySeedNodeList()
  }
  return (
    <div className="layout-box">
      <SearchBar text={t('node.addSeedNode')} onAdd={onAdd} hideSearch />
      <SeedNodeTable ref={tableRef} />
      <AddSeedNode show={show} cancel={cancel} />
    </div>
  )
}
