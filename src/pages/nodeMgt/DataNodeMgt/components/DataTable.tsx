import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Space } from 'antd'
import MyModal from '../../../../components/MyModal'

const DataTable: FC<any> = () => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [curName, SetCurName] = useState('哈哈哈哈哈哈哈哈')
  console.log(curName)

  const { t } = useTranslation()
  const deleteFn = id => {
    console.log(id)
    SetCurName('hahahahahah')
    SetIsModalVisible(true)
  }
  const dataSource = [
    {
      key: '1',
      nodeName: '胡彦斌',
      status: 32,
      ip: '1010101',
      port: '9090',
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      nodeName: '胡彦祖',
      status: 42,
      ip: '1010101',
      port: '9090',
      address: '西湖区湖底公园1号',
    },
  ]
  const columns = [
    {
      title: t('dataNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      key: 'nodeName',
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('common.ip'),
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: t('common.port'),
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: t('common.operations'),
      dataIndex: 'operations',
      key: 'operations',
      render: (text: any, row: any, index: any) => {
        console.log(text)
        console.log(row)
        console.log(index)
        return (
          <Space size={10} className="operation-box">
            <span className="btn pointer">{t('common.edit')}</span>
            <span className="btn pointer" onClick={deleteFn}>
              {t('common.delete')}
            </span>
          </Space>
        )
      },
    },
  ]
  const handleOk = () => {
    console.log('callback 删除改数据节点 Api')
  }
  const handleCancel = () => {
    SetIsModalVisible(false)
  }
  return (
    <div className="data-table-box">
      <Table dataSource={dataSource} columns={columns} />
      {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> */}
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
          {t('node.confirmDelete')}:{curName}
        </p>
      </MyModal>
      {/* </Modal> */}
    </div>
  )
}

export default DataTable
