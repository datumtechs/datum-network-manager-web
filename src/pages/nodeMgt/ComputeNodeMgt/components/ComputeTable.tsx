import React, { FC, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space } from 'antd'
import MyModal from '../../../../components/MyModal'
import './scss/index.scss'
import { computeNodeApi } from '../../../../api/index'
import useComputenodeTable from '../../../../hooks/useComputenodeTable'
import { BaseInfoContext } from '../../../../layout/index'
import UseStatus from '../../../../hooks/useStatus'

const DataTable: FC<any> = (props: any) => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [modalType, SetModalType] = useState('')
  const [curName, SetCurName] = useState('')
  const [total, totalSet] = useState<number>(0)
  const history = useHistory()
  const [tableData, setTableData] = useState<[]>()
  const [curPage, setCurPage] = useState<number>(0)
  const baseInfo = useContext(BaseInfoContext)

  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()
  const onPageChange = num => {
    setCurPage(num)
  }

  const { table } = useComputenodeTable({
    identityId: baseInfo?.identityId,
    keyword: props.searchText,
    pageNumber: curPage,
    pageSize: pagination.defaultPageSize,
  })

  useEffect(() => {
    setTableData(table?.data)
    totalSet(table?.total)
  }, [table])

  const deleteFn = row => {
    SetCurName(row.powerNodeName)
    SetModalType('delete')
    SetIsModalVisible(true)
  }
  // 查看简略info
  const viewFn = row => {
    SetCurName(row.powerNodeName)
    SetModalType('view')
    SetIsModalVisible(true)
  }
  const enableFn = row => {
    SetCurName(row.powerNodeName)
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
      bandwidth: 0,
      connMessage: '',
      connTime: '',
      core: 0,
      createTime: '',
      externalIp: '22222222222222222',
      externalPort: 9090,
      id: 0,
      identityId: '11111111111111111',
      internalIp: '11111111111111111',
      internalPort: 8080,
      memory: 0,
      powerNodeId: '1111111111133333333333333',
      powerNodeName: '奥术大师多',
      remarks: '',
      startTime: '',
      status: 1,
      updateTime: '',
      usedBandwidth: 0,
      usedCore: 0,
      usedMemory: 0,
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
      render: (text, record, index) => {
        return (
          <>
            <p>
              <span>{record.powerNodeName}</span>
            </p>
            <p>
              <span>ID:{record.powerNodeId}</span>
            </p>
          </>
        )
      },
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => {
        console.log('status', record.status)

        return <>{UseStatus(record.status)}</>
      },
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
        console.log('row', row)
        return (
          <Space size={10} className="operation-box">
            {row.status === 0 ? (
              <>
                <span className="btn pointer" onClick={() => editFn(row)}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={() => deleteFn(row)}>
                  {t('common.delete')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.status === 1 ? (
              <>
                <span className="btn pointer" onClick={() => viewFn(row)}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={() => editFn(row)}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={() => enableFn(row)}>
                  {t('common.enable')}
                </span>
                <span className="btn pointer" onClick={() => deleteFn(row)}>
                  {t('common.delete')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.status === 2 ? (
              <>
                <span className="btn pointer" onClick={() => viewFn(row)}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={() => disableFn(row)}>
                  {t('common.disable')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.status === 3 ? (
              <>
                <span className="btn pointer" onClick={() => viewInfo()}>
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
    if (modalType === 'delete') {
      computeNodeApi.deletePowerNode({ powerNodeId: '' }).then(res => {
        if (res.status === 0) {
          console.log(res)
        }
      })
    } else if (modalType === 'enable') {
      computeNodeApi.publishPower({ powerNodeId: '' }).then(res => {
        if (res.status === 0) {
          console.log(res)
        }
      })
    } else if (modalType === 'disable') {
      console.log('disable')
    } else if (modalType === 'view') {
      console.log('view')
    }
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
