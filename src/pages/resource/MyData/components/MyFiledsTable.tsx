import React, { FC, useMemo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space, Select, Tabs, Radio } from 'antd'
import { DATATYPE } from '../../../../config/constant'

interface Item {
  id: String
  key: string
  name: string
  dataProvider: number
  visible: string
  dataType: string
  remarks: string
}

interface EditableRowProps {
  index: number
}

const MyFiledsTable: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const changeVisibleFn = (e, record) => {
    console.log(record)
    console.log(e)
    return e
  }
  const { Option } = Select
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  const [data, setData] = useState<Item[]>([])

  const linkMeta = () => {
    history.push('/resource/dataCenter/metaDataDetail')
  }

  const handleCellChange = (e, record) => {
    let rows = [...data]
    let row = rows.find(item => item.id === record.id)
    row ? (row.visible = e.taget.value) : ''
    console.log(record)
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
  }, [data])

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('center.fileField'),
      dataIndex: 'name',
      key: 'name',
      editable: 'true',
    },
    {
      title: t('myData.visible'),
      dataIndex: 'visible',
      key: 'visible',
      editable: 'true',
      // onCell: (record: any) => ({
      //   record,
      //   editable: col.editable,
      //   dataIndex: col.dataIndex,
      //   title: col.title,
      //   handleSave: this.handleSave,
      // }),
      render: (text, record, index) => {
        return (
          <div>
            <Radio.Group
              defaultValue="yes"
              onChange={e => {
                changeVisibleFn(e, record)
              }}
              value={record.visible}
              optionType="button"
              buttonStyle="solid"
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
      editable: 'true',
      render: (text, record, index) => {
        return (
          <Space size={60}>
            {/* <p>{record.dataType}</p> */}
            {/* <p className="link">{t('myData.select')}</p> */}
            <Select defaultValue="STRING" style={{ width: 100 }} placeholder="Select a type">
              {DATATYPE.map(type => (
                <Option value={type.label} key={type.id}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Space>
        )
      },
    },
    {
      title: t('center.remarks'),
      dataIndex: 'remarks',
      editable: 'true',
      key: 'remarks',
    },
  ]

  const editCol = useMemo(
    () =>
      columns.map(col => {
        if (!col.editable) return col
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            title: col.title,
            dataindex: col.dataIndex,
            onChange: handleCellChange,
          }),
        }
      }),
    [columns],
  )

  return (
    <div className="data-table-box">
      <Table dataSource={data} columns={editCol} />
    </div>
  )
}

export default MyFiledsTable
