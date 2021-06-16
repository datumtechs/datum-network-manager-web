import React, { FC, useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import '../scss/editTable.scss'

const EditTableCell: FC<any> = (props: any) => {
  const [isFieldEditing, setIsFieldEditing] = useState<boolean>(false)
  const { record, type } = props
  const inputRef = useRef<Input>(null)
  useEffect(() => {
    if (isFieldEditing) {
      inputRef.current!.focus()
    }
  }, [isFieldEditing])

  const handleCellChange = e => {
    props.handleCellChange(e, record, type)
  }
  const toggleEdit = () => {
    setIsFieldEditing(!isFieldEditing)
    // form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  }
  const { t } = useTranslation()
  return (
    <>
      {isFieldEditing ? (
        <Input onChange={e => handleCellChange(e)} onBlur={toggleEdit} ref={inputRef} value={record[type]} />
      ) : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {record[type]}
        </div>
      )}
    </>
  )
}
export default EditTableCell
