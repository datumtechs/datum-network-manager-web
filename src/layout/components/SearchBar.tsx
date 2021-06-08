import React, { FC } from 'react'
import { Button, Input } from 'antd'
import { useTranslation } from 'react-i18next'

const { Search } = Input;
const SearchBar: FC<any> = (props: any) => {
  console.log(props);
  const { t } = useTranslation()
  const onSearch = () => {

  }
  return (
    <div className="searchBar-box">
      <div>
        <Button type="primary" className="btn pointer" size="large">
          {t('node.addNewComputingNode')}
        </Button>
      </div>
      <Search placeholder="input search text" size="large" allowClear enterButton={t("common.search")} onSearch={onSearch} style={{ width: 334 }} />
    </div>
  )
}

export default SearchBar