import React, { FC, useMemo, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space, Select, Tabs, Radio, Input } from 'antd'
import EditTableCell from './EditableCell'
import { DATATYPE } from '../../../../config/constant'
import '../scss/editTable.scss'

interface Item {
  id: String
  key: string
  name: string
  dataProvider: number
  visible: string
  dataType: string
  remarks: string
}

const MyFiledsTable: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const history = useHistory()
  const changeVisibleFn = (e, record) => {
    console.log(record)
    console.log(e)
  }
  const { Option } = Select
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  const [data, setData] = useState<Item[]>([])
  const { mode } = props
  // useEffect(() => {
  //   if (isFieldEditing && inputRef.current) {
  //     inputRef.current!.focus();
  //   }
  // }, [isFieldEditing]);
  // const linkMeta = () => {
  //   history.push('/resource/dataCenter/metaDataDetail')
  // }
  const handleSelectChange = (e, record) => {
    console.log(record)
    console.log(e)
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
    console.log(column)

    const rows = [...data]
    const row = rows.find(item => item.id === record.id)
    if (row) {
      row[column] = e.target.value
    }
    setData(rows)
  }
  const dataSource = [
    {
      id: '1',
      key: '1',
      name: '胡彦斌',
      dataProvider: 32,
      visible: 'yes',
      dataType: '啊啊啊啊',
      remarks: '西湖区湖底公园1号',
    },
    {
      id: '2',
      key: '2',
      name: '胡彦斌',
      dataProvider: 32,
      visible: 'no',
      dataType: '啊啊啊啊',
      remarks: '西湖区湖底公园1号',
    },
  ]

  useEffect(() => {
    setData(() => [...dataSource])
  }, [])

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('center.fileField'),
      dataIndex: 'name',
      width: '20%',
      key: 'name',
      editable: 'true',
      render: (text, record, index) => (
        <EditTableCell record={record} column="name" handleCellChange={handleCellChange} />
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
          <div>
            <Radio.Group
              defaultValue="yes"
              value={record.visible}
              optionType="button"
              buttonStyle="solid"
              onChange={e => handleSwitchChange(e, record)}
            >
              <Radio.Button checked value="yes">
                {t('myData.yes')}
              </Radio.Button>
              <Radio.Button value="no">{t('myData.no')}</Radio.Button>
            </Radio.Group>
          </div>
        )
      },
    },
    {
      title: t('center.dataType'),
      dataIndex: 'dataType',
      key: 'dataType',
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
      {mode === 'add' ?
        <div className="tips pb-20">{t('myData.infoTips')}</div> : ""}
      <Table rowClassName={() => 'editable-row'} dataSource={data} columns={columns} />
    </div>
  )
}

export default MyFiledsTable
