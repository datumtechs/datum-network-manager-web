import React, { FC, useState, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space } from 'antd'
import MyModal from '../../../../components/MyModal'
import './scss/index.scss'

const DataTable: FC<any> = () => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [modalType, SetModalType] = useState('')
  const [curName, SetCurName] = useState('哈哈哈哈哈哈哈哈')
  const history = useHistory()

  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()

  const deleteFn = id => {
    console.log(id)
    SetCurName('hahahahahah')
    SetModalType('delete')
    SetIsModalVisible(true)
  }
  // 查看简略info
  const viewFn = id => {
    console.log(id)
    SetCurName('hahahahahah')
    SetModalType('view')
    SetIsModalVisible(true)
  }
  const enableFn = id => {
    console.log(id)
    SetCurName('hahahahahah')
    SetModalType('enable')
    SetIsModalVisible(true)
  }
  const disableFn = id => {
    console.log(id)
    SetCurName('hahahahahah')
    SetModalType('disable')
    SetIsModalVisible(true)
  }

  const viewInfo = () => {
    history.push({
      pathname: '/nodeMgt/computeNodeMgt/computeNodeDetail',
      state: {
        id: '11111111',
      },
    })
  }
  const editFn = id => {
    history.push({
      pathname: '/nodeMgt/computeNodeMgt/editComputeNode',
      state: {
        type: 'Edit',
        id: '11111111',
      },
    })
  }
  const dataSource = [
    {
      key: '1',
      nodeName: '胡彦斌',
      status: 'Connection failed',
      ip: '1010101',
      port: '9090',
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      nodeName: '胡彦祖',
      status: 'Power disabled',
      ip: '1010101',
      port: '9090',
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      nodeName: '胡彦祖',
      status: 'Power enabled',
      ip: '1010101',
      port: '9090',
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      nodeName: '胡彦祖',
      status: 'Power occupied',
      ip: '1010101',
      port: '9090',
      address: '西湖区湖底公园1号',
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
      width: 500,
      dataIndex: 'operations',
      key: 'operations',
      render: (text: any, row: any, index: any) => {
        console.log('row', row)
        return (
          <Space size={10} className="operation-box">
            {row.status === 'Connection failed' ? (
              <>
                <span className="btn pointer" onClick={editFn}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={deleteFn}>
                  {t('common.delete')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.status === 'Power disabled' ? (
              <>
                <span className="btn pointer" onClick={viewFn}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={editFn}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={enableFn}>
                  {t('common.enable')}
                </span>
                <span className="btn pointer" onClick={deleteFn}>
                  {t('common.delete')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.status === 'Power enabled' ? (
              <>
                <span className="btn pointer" onClick={viewFn}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={disableFn}>
                  {t('common.disable')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.status === 'Power occupied' ? (
              <>
                <span className="btn pointer" onClick={viewInfo}>
                  {t('common.viewNodeInfo')}
                </span>
              </>
            ) : (
              <></>
            )}
            {/* <span className="btn pointer" onClick={editFn}>
              {t('common.edit')}
            </span>
            <span className="btn pointer" onClick={deleteFn}>
              {t('common.delete')}
            </span>
            <span className="btn pointer" onClick={viewFn}>
              {t('common.view')}
            </span>
            <span className="btn pointer" onClick={enableFn}>
              {t('common.enable')}
            </span>
            <span className="btn pointer" onClick={disableFn}>
              {t('common.disable')}
            </span>
            <span className="btn pointer" onClick={viewInfo}>
              {t('common.viewNodeInfo')}
            </span> */}
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
      <Table dataSource={dataSource} columns={columns} pagination={pagination} />
      {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> */}
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {modalType === 'delete' ? (
          <p>
            {t('computeNodeMgt.confirmDelete')}:{curName}
          </p>
        ) : (
          ''
        )}
        {modalType === 'view' ? (
          <div className="simple-info-box">
            <p>
              <span className="title">CPU:</span>
              <span>cpu信息</span>
            </p>
            <p>
              <span className="title">{t('overview.memory')}:</span>
              <span>Meomory信息</span>
            </p>
            <p>
              <span className="title">{t('overview.bandWidth')}:</span>
              <span>带宽信息</span>
            </p>
            <p>
              <span className="title">{t('common.remark')}:</span>
              <span>备注</span>
            </p>
          </div>
        ) : (
          ''
        )}
        {modalType === 'disable' ? (
          <p>
            {t('computeNodeMgt.confirmDisable')}:{curName}
          </p>
        ) : (
          ''
        )}
        {modalType === 'enable' ? (
          <p>
            {t('computeNodeMgt.confirmEnable')}:{curName}
          </p>
        ) : (
          ''
        )}
      </MyModal>
    </div>
  )
}

export default DataTable
