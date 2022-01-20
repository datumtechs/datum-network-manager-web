/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, forwardRef, useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Space, Button, Progress, message } from 'antd'

const MyDragger: FC<any> = forwardRef((props: any, draggerRef: any) => {
  const { t } = useTranslation()
  const { file, uploadProgress } = props
  const inputRef = useRef<any>()
  const [dragging, setDragging] = useState<boolean>(false);
  const [progressStatus, progressStatusSet] = useState<any>('')

  useEffect(() => {
    if (uploadProgress > 0 && uploadProgress < 100) {
      progressStatusSet('active')
    } else if (uploadProgress === 100 || uploadProgress === 0) {
      progressStatusSet('')
    } else {
      // TODO 异常显示
      progressStatusSet('exception')
    }
  }, [uploadProgress])

  const triggerUpload = () => {
    inputRef.current.input.click()
  }
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  const handleDrop = (e) => {
    // debugger
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
    if (props.maxSize && filterSize(e.dataTransfer?.files[0].size) > props.maxSize) {
      message.info(t('myData.fileMaxSizeTips'))
      return
    }
    setDragging(false)
    props.uploadByDrag(e)
  }
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target !== draggerRef.current && setDragging(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target === draggerRef.current && setDragging(false)
  }

  useEffect(() => {
    draggerRef.current.addEventListener('dragover', handleDragOver);
    draggerRef.current.addEventListener('drop', handleDrop);
    draggerRef.current.addEventListener('dragenter', handleDragEnter);
    draggerRef.current.addEventListener('dragleave', handleDragLeave);
    return () => { }
  }, [])

  const filterSize = (size: number = 0): number => {
    if (isNaN(size)) return 0
    return Number((size / 1024 / 1024).toFixed(2))
  }

  const onChange = e => {
    if (props.maxSize && filterSize(e.target?.files[0].size) > props.maxSize) {
      message.info(t('myData.fileMaxSizeTips'))
      return
    }
    props.onChange(e)
  }
  const uploadFn = () => {
    props.uploadFn()
  }

  const onDragEnd = (e) => {
    console.log(e);
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <Space size={30}>
      <div ref={draggerRef} className={`dragger-box pointer ${dragging ? 'dot-line' : ''}`} onClick={triggerUpload} onDragEnd={onDragEnd} >
        {
          file?.name ? <div className="dragger-box-title">
            {file.name}
            <Progress percent={uploadProgress} status={progressStatus} />
          </div> : <div className="content-box">
            {t('myData.uploadFiletips')}
          </div>
        }

        <Input
          id="fileInput"
          ref={inputRef}
          className="hide"
          style={{ visibility: 'hidden', position: 'absolute', zIndex: -1 }}
          type="file"
          onChange={onChange}
        />
      </div>
      <Button loading={props.loading} onClick={uploadFn}>
        {t('myData.upload')}
      </Button>
    </Space>
  )
})

export default MyDragger