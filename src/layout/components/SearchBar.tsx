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
      {props.hideSearch ? (
        ''
      ) : (
        <Search
          placeholder={props?.placeholder || t('tip.searchText')}
          size="large"
          allowClear
          enterButton={t('common.search')}
          onSearch={onSearch}
          className={props.text ? 'w-334' : 'no-search-flex-1'}
        />
      )}
    </div>
  )
}

export default SearchBar
