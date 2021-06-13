import React, { FC, useState, useRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Button, Space } from 'antd'

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
  const uploadFn = () => {
    props.uploadFn()
  }
  return (
    <div className="upload-line" >
      <Space>
        <Input.Search value={name} size="large" style={{ width: '400px' }} enterButton={t('myData.selectCsvFile')} onSearch={onSearch} />
        <Input id="fileInput" ref={inputRef} className="hide" style={{ visibility: 'hidden', position: 'absolute', zIndex: -1 }} type="file" onChange={onChange} />
        <Button size="large" type="primary" onClick={uploadFn}>{t('myData.upload')}</Button>
      </Space>
    </div>
  )
})

