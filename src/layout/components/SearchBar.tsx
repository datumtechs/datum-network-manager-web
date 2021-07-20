import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'antd'

const { Search } = Input
const SearchBar: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const onSearch = (e: any) => {
    props.onSearch(e)
  }
  const addBtn = () => {
    props.onAdd()
  }
  return (
    <div className="searchBar-box" style={{}}>
      {props.text ? (
        <Button type="primary" className="btn pointer" size="large" onClick={addBtn}>
          {props.text}
        </Button>
      ) : (
        ''
      )}
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
