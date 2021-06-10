import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'antd'

const { Search } = Input
const SearchBar: FC<any> = (props: any) => {
  const { t } = useTranslation()
  console.log(props)

  const onSearch = () => {
    props.onSearch()
  }
  const addBtn = () => {
    props.onAdd()
  }
  return (
    <div className="searchBar-box">
      <div>
        <Button type="primary" className="btn pointer" size="large" onClick={addBtn}>
          {props.text}
        </Button>
      </div>
      <Search
        placeholder="input search text"
        size="large"
        allowClear
        enterButton={t('common.search')}
        onSearch={onSearch}
        style={{ width: 334 }}
      />
    </div>
  )
}

export default SearchBar
