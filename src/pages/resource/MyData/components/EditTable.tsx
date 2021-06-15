import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProColumns } from '@ant-design/pro-table'
import { EditableProTable } from '@ant-design/pro-table'
import { Button, Radio } from 'antd'

type DataSourceType = {
  id: React.Key
  title?: string
  decs?: string
  state?: string
  visible?: string
  createdAt?: string
  children?: DataSourceType[]
}

const defaultData: DataSourceType[] = new Array(10).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    dataType: 'string',
    decs: '这个活动真好玩',
    visible: 'true',
    state: 'open',
    createdAt: '2020-05-26T09:42:56Z',
  }
})

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => defaultData.map(item => item.id))
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData)
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: '6%',
      editable: (text, record, index) => {
        return false
      },
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('center.fileField'),
      dataIndex: 'title',
      valueType: 'text',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: t('myData.visible'),
      key: 'visible',
      width: '20%',
      valueType: 'radioButton',
      dataIndex: 'visible',
      fieldProps: {
        options: [
          {
            label: `${t('myData.yes')}`,
            value: 'true',
          },
          {
            label: `${t('myData.no')}`,
            value: 'false',
          },
        ],
      },
      // render: (text, record, index) => {
      //   return (
      //     <div>
      //       <Radio.Group
      //         defaultValue="yes"
      //         // onChange={changeVisibleFn}
      //         value={record.visible}
      //         optionType="button"
      //         buttonStyle="solid"
      //       >
      //         <Radio.Button checked value="yes">
      //           {t('myData.yes')}
      //         </Radio.Button>
      //         <Radio.Button value="no">{t('myData.no')}</Radio.Button>
      //       </Radio.Group>
      //     </div>
      //   )
      // },
    },
    {
      title: t('center.dataType'),
      key: 'dataType',
      width: '20%',
      dataIndex: 'dataType',
      valueType: 'select',
      valueEnum: {
        string: { text: 'STRING', status: 'string' },
        int: {
          text: 'INT',
          status: 'int',
        },
        float: {
          text: 'FLOAT',
          status: 'float',
        },
      },
    },
    {
      title: t('center.remarks'),
      key: 'desc',
      valueType: 'textarea',
      dataIndex: 'textarea',
    },
    // {
    //   title: t('center.remarks'),
    //   valueType: 'text',
    //   dataIndex: 'decs',
    // },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   width: 250,
    //   render: () => {
    //     return null
    //   },
    // },
  ]

  return (
    <>
      <EditableProTable<DataSourceType>
        size="large"
        columns={columns}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        // recordCreatorProps={{
        //   newRecordType: 'dataSource',
        //   record: () => ({
        //     id: Date.now(),
        //   }),
        // }}
        // toolBarRender={() => {
        //   return [
        //     <Button
        //       type="primary"
        //       key="save"
        //       onClick={() => {
        //         // dataSource 就是当前数据，可以调用 api 将其保存
        //         console.log(dataSource)
        //       }}
        //     >
        //       保存数据
        //     </Button>,
        //   ]
        // }}
        editable={{
          type: 'single',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete]
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  )
}
