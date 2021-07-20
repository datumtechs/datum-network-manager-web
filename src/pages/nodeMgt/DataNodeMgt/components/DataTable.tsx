import React, { FC, useState, useEffect, useImperativeHandle } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space } from 'antd'
import MyModal from '../../../../components/MyModal'
import useDatanodeTable from '../../../../hooks/useDatanodeTable'
import { dataNodeApi } from '../../../../api/index'

const DataTable: FC<any> = (props: any) => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [curName, SetCurName] = useState('')
  const history = useHistory()
  const [tableData, setTableData] = useState<[]>()
  const [total, totalSet] = useState<number>(0)
  const [curPage, setCurPage] = useState<number>(0)
  const [curId, setCurId] = useState<string>('')

  const { t } = useTranslation()

  const onPageChange = num => {
    setCurPage(num)
  }

  const pagination = {
    defaultCurPage: 1,
    current: 1,
    defaultPageSize: 10,
  }

  const { table } = useDatanodeTable({
    keyword: props.searchText,
    pageNumber: curPage,
    pageSize: pagination.defaultPageSize,
  })

  useEffect(() => {
    setTableData(table?.data)
    totalSet(table?.total)
  }, [table])

  const deleteFn = row => {
    SetCurName(row.nodeName)
    setCurId(row.id)
    SetIsModalVisible(true)
  }

  const editFn = row => {
    history.push({
      pathname: '/nodeMgt/dataNodeMgt/editDataNode',
      state: {
        type: 'Edit',
        id: row.id,
        row,
      },
    })
  }
  const dataSource = [
    {
      connStatus: '111',
      externalIp: '111.111.111.111',
      externalPort: 9090,
      id: 0,
      internalIp: '222.222.222.222',
      internalPort: 8080,
      nodeId: '2',
      nodeName: '胡彦斌',
    },
  ]
  const columns = [
    {
      title: '',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('computeNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      key: 'nodeName',
    },
    {
      title: t('common.status'),
      dataIndex: 'connStatus',
      key: 'connStatus',
    },
    {
      title: t('common.ip'),
      dataIndex: 'ip',
      key: 'ip',
      render: (text, record, index) => {
        return (
          <>
            <p>
              <span>{`${t('node.internal')}`}:&nbsp;&nbsp;</span>
              <span>{record.internalIp}</span>
            </p>
            <p>
              <span>{`${t('node.external')}`}:&nbsp;&nbsp;</span>
              <span>{record.externalIp}</span>
            </p>
          </>
        )
      },
    },
    {
      title: t('common.port'),
      dataIndex: 'port',
      key: 'port',
      render: (text, record, index) => {
        return (
          <>
            <p>
              <span>{`${t('node.internal')}`}:&nbsp;&nbsp;</span>
              <span>{record.internalPort}</span>
            </p>
            <p>
              <span>{`${t('node.external')}`}:&nbsp;&nbsp;</span>
              <span>{record.externalPort}</span>
            </p>
          </>
        )
      },
    },
    {
      title: t('common.operations'),
      width: 500,
      dataIndex: 'operations',
      key: 'operations',
      render: (text: any, row: any, index: any) => {
        return (
          <Space size={10} className="operation-box">
            <>
              <span className="btn pointer" onClick={() => editFn(row)}>
                {t('common.edit')}
              </span>
              <span className="btn pointer" onClick={() => deleteFn(row)}>
                {t('common.delete')}
              </span>
            </>
          </Space>
        )
      },
    },
  ]
  const handleOk = () => {
    dataNodeApi.deleteDatanode({ nodeId: curId }).then(res => {
      if (res.status === 0) {
        console.log(res)
      }
    })
  }
  const handleCancel = () => {
    SetIsModalVisible(false)
  }

  return (
    <div className="data-table-box">
      <Table
        // dataSource={tableData}
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultCurrent: 1, total, onChange: onPageChange }}
      />
      {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> */}
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
          {t('computeNodeMgt.confirmDelete')}:{curName}
        </p>
      </MyModal>
    </div>
  )
}

export default DataTable
