import React, { FC, useEffect } from 'react'
import { Modal } from 'antd'
import warnSvg from '../assets/images/8.icon1.svg'

const DataTable: FC<any> = (props: any) => {
  const { visible, children, title, width } = props
  const handleOk = () => {
    props.onOk()
  }
  const handleCancel = () => {
    props.onCancel()
  }

  useEffect(() => { }, [title])

  return (
    <Modal
      destroyOnClose
      width={width}
      visible={visible}
      title={title || <img src={warnSvg} alt="" />}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {Array.isArray(children) ? children.map(child => child) : <>{children}</>}
    </Modal>
  )
}

export default DataTable
