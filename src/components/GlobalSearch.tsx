import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd'

const { Option } = Select

const GlobalSearch = (props: any) => {
  const [value, valueSet] = useState<''>()
  const { t, i18n } = useTranslation()
  const handleSearch = () => {}
  const handleChange = () => {}

  return (
    <Select
      style={{ width: '270px' }}
      showSearch
      value={value}
      placeholder={`${t('tip.searchTips')}`}
      defaultActiveFirstOption={false} // 是否高亮第一个选项
      showArrow={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null} // 当下拉列表为空时显示的内容
    ></Select>
  )
}

export default GlobalSearch
