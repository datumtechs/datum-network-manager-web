import React, { FC, useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import '../scss/index.scss'

const EditTableCell: FC<any> = (props: any) => {
  const [isFieldEditing, setIsFieldEditing] = useState<boolean>(false)
  const { record, column, disabled } = props || { disabled: false }
  const inputRef = useRef<Input>(null)
  useEffect(() => {
    if (isFieldEditing) {
      inputRef.current!.focus()
    }
  }, [isFieldEditing])

  const handleCellChange = e => {
    props.handleCellChange(e, record, column)
  }
  const toggleEdit = () => {
    if (disabled) return
    setIsFieldEditing(!isFieldEditing)
    // form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  }
  const { t } = useTranslation()
  return (
    <>
      {isFieldEditing ? (
        <Input onChange={e => handleCellChange(e)} maxLength={32} onBlur={toggleEdit} ref={inputRef} value={record[column]} />
      ) : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {record[column]}
        </div>
      )}
    </>
  )
}
export default EditTableCell
