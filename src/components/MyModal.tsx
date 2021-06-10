import React, { FC } from 'react'
import { Modal } from 'antd'

const DataTable: FC<any> = (props: any) => {
  const { visible, children, title, width } = props
  console.log('modal-props', props)
  const handleOk = () => {
    props.onOk()
  }
  const handleCancel = () => {
    props.onCancel()
  }
  return (
    <div className="data-table-box">
      <Modal destroyOnClose width={width} visible={visible} title={title} onOk={handleOk} onCancel={handleCancel}>
        {Array.isArray(children) ? children.map(child => child) : <>{children}</>}
      </Modal>
    </div>
  )
}

export default DataTable
