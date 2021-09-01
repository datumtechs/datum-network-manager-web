import React, { FC, useMemo, useEffect, useState, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Space, Select, Tabs, Switch, Input } from 'antd'
import EditTableCell from './EditableCell'
import { DATATYPE } from '../../../../config/constant'
import '../scss/editTable.scss'

interface Item {
  id: String
  key: string
  name: string
  dataProvider: number
  visible: string
  columnType: string
  remarks: string
  columnIdx?: number
}

const MyFiledsTable: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const history = useHistory()
  const { Option } = Select
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  const [data, setData] = useState<Item[]>([])
  const { mode, tableData, total, setPage, curPage, originalData } = props
  // useEffect(() => {
  //   if (isFieldEditing && inputRef.current) {
  //     inputRef.current!.focus();
  //   }
  // }, [isFieldEditing]);
  // const linkMeta = () => {
  //   history.push('/resource/dataCenter/metaDataDetail')
  // }

  const dataSource = [
    {
      id: 0,
      columnName: '郑克爽',
      visible: 'Y',
      dataType: 'STRING',
      remarks: '优势在我, 优势在我',
    },
  ]

  const handleSelectChange = (e, record) => {
    const rows = [...data]
    const row = rows.find(item => item.id === record.id)
    if (row) {
      row.columnType = e
    }
    setData(rows)
  }
  const handleSwitchChange = (e, record) => {
    const rows = [...data]
    const row = rows.find(item => item.id === record.id)
    if (row) {
      row.visible = e.target.value
    }
    setData(rows)
  }
  const handleCellChange = (e, record, column) => {
    const rows = [...data]
    const row = rows.find(item => item.id === record.id)
    if (row) {
      row[column] = e.target.value
    }
    setData(rows)
    // const tempAry = props.state.tableData.originalList
    // tempAry.forEach(item => {
    //   if (item.id === record.id) {
    //     item[column] = e.target.value
    //   }
    // })
    props.updateData(data)
  }
  const onPageChange = (page: number) => {
    setPage(page)
  }
  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setData(() => [...tableData])
    }
  }, [tableData])

  const columns = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('center.fileField'),
      dataIndex: 'columnName',
      width: '20%',
      key: 'columnName',
      editable: 'true',
      render: (text, record, index) => (
        <EditTableCell record={record} column="columnName" handleCellChange={handleCellChange} />
      ),
    },
    {
      title: t('myData.visible'),
      dataIndex: 'visible',
      key: 'visible',
      editable: 'true',
      // onCell: (record: any) => ({
      //   record,
      //   editable: 'true',
      //   dataIndex: 'visible',
      //   title: t('myData.visible'),
      //   onChange: e => handleCellChange(e, record),
      // }),
      render: (text, record, index) => {
        return (
          <Space size={20}>
            {record.visible === 'Y' ? <span>{t('myData.yes')}</span> : <span>{t('myData.no')}</span>}

            <Switch size="small" defaultChecked={record.visible === 'Y'} />
          </Space>
        )
      },
    },
    {
      title: t('center.dataType'),
      dataIndex: 'columnType',
      key: 'columnType',
      editable: 'false',
      render: (text, record, index) => {
        return (
          <Select
            onChange={e => handleSelectChange(e, record)}
            defaultValue="STRING"
            style={{ width: 100 }}
            placeholder="Select a type"
          >
            {DATATYPE.map(type => (
              <Option value={type.label} key={type.id}>
                {type.label}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: t('center.remarks'),
      dataIndex: 'remarks',
      editable: 'true',
      key: 'remarks',
      width: '35%',
      render: (text, record, index) => (
        <EditTableCell record={record} column="remarks" handleCellChange={handleCellChange} />
      ),
    },
  ]

  return (
    <div className="data-table-box">
      {mode === 'add' ? <div className="tips pb-20">{t('myData.infoTips')}</div> : ''}
      <Table
        rowClassName={() => 'editable-row'}
        rowKey={record => record.id}
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultCurrent: 1, total, onChange: onPageChange }}
        bordered
      />
    </div>
  )
}

export default connect(
  (state: any) => ({ state }),
  (dispatch: any) => ({
    updateData: (originalData: Array<[]>) => {
      dispatch({
        type: 'SET_ORIGINAL_DATA',
        data: originalData,
      })
    },
  }),
)(MyFiledsTable)
