import React, { FC, useState, useRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'

export const MyRadioBtn: FC<any> = forwardRef((props: any, inputRef: any) => {
  const { t } = useTranslation()
  const { name } = props.file
  // const fileInput = useRef<any>(null)// as React.MutableRefObject<null> // as React.RefObject<HTMLInputElement>;
  const onSearch = () => {
    inputRef.current.input.click();
  }
  const onChange = (e) => {
    props.onChange(e)
  }
  return (
    <div>
      <Input.Search value={name} size="large" enterButton={t('myData.selectCsvFile')} onSearch={onSearch} />
      <Input id="fileInput" ref={inputRef} className="hide" style={{ visibility: 'hidden' }} type="file" onChange={onChange} />
    </div>
  )
})

