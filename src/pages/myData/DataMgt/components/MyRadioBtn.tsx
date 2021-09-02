
import React, { FC, useState, useRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Button, Space, Upload } from 'antd'
import MyDragger from './MyDragger'
import '../scss/index.scss'

export const MyRadioBtn: FC<any> = forwardRef((props: any, inputRef: any) => {
  const { t } = useTranslation()
  const { file: { name }, type } = props
  const { Dragger } = Upload;
  // const fileInput = useRef<any>(null)// as React.MutableRefObject<null> // as React.RefObject<HTMLInputElement>;
  const onSearch = () => {
    inputRef.current.input.click()
  }
  const onChange = e => {
    props.onChange(e)
  }
  const uploadFn = () => {
    props.uploadFn()
  }
  return (
    <div className="upload-box">
      <Space size={30}>
        {
          type === 'dragger' ?
            <>
              <Dragger className="dragger-box">
                {t('myData.uploadFiletips')}
              </Dragger>

              <MyDragger onChange={onChange}></MyDragger>
            </>
            :
            <>
              <Input.Search
                value={name}
                size="large"
                style={{ width: '400px' }}
                enterButton={t('myData.selectCsvFile')}
                onSearch={onSearch}
                readOnly
              />
              <Input
                id="fileInput"
                ref={inputRef}
                className="hide"
                style={{ visibility: 'hidden', position: 'absolute', zIndex: -1 }}
                type="file"
                onChange={onChange}
              />
            </>
        }

        <Button size="large" loading={props.loading} onClick={uploadFn}>
          {t('myData.upload')}
        </Button>
      </Space>
    </div>
  )
})
