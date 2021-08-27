import React, { FC, useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Tooltip } from 'antd'
import MyModal from '../../../../components/MyModal'
import './scss/index.scss'
import { computeNodeApi } from '../../../../api/index'
import { BaseInfoContext } from '../../../../layout/index'
import UseStatus from '../../../../hooks/useComputeStatus'
import { Row } from '../../../../entity/index'
import { changeSizeFn } from '../../../../utils/utils'
import useInterval from '../../../../hooks/useInterval'
import { tableInterVal } from '../../../../constant/index'

const DataTable: FC<any> = (props: any) => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [modalType, SetModalType] = useState('')
  const [curName, SetCurName] = useState('')
  const [total, totalSet] = useState<number>(0)
  const history = useHistory()
  const [tableData, setTableData] = useState<[]>()
  const [curPage, setCurPage] = useState<number>(0)
  const baseInfo = useContext(BaseInfoContext)
  const [curId, curIdSet] = useState<string>('')
  const [curPowerId, curPowerIdSet] = useState<string>('')
  const [curRow, setCurRow] = useState<Row>({
    core: '',
    memory: '',
    bandwidth: '',
    remarks: '',
  })

  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()
  const onPageChange = num => {
    setCurPage(num)
  }

  // const initFn = useComputenodeTable({
  //   identityId: baseInfo?.identityId,
  //   keyword: props.searchText,
  //   pageNumber: curPage,
  //   pageSize: pagination.defaultPageSize,
  // })

  const initTable = async () => {
    const res = await computeNodeApi.queryPowerNodeList({
      identityId: baseInfo?.identityId,
      keyword: props.searchText,
      pageNumber: curPage,
      pageSize: pagination.defaultPageSize,
    })
    if (res.status === 0) {
      setTableData(res.data)
      totalSet(res.total)
    }
  }

  useEffect(() => {
    initTable()
  }, [props.searchText, curPage])

  useInterval(() => {
    initTable()
  }, tableInterVal)

  const operation = (row, type) => {
    SetCurName(row.powerNodeName)
    SetModalType(type)
    SetIsModalVisible(true)
    curIdSet(row.powerNodeId)
    curPowerIdSet(row.powerId)
    if (type === 'view') {
      setCurRow(row)
    }
  }

  const viewInfo = row => {
    history.push({
      pathname: '/nodeMgt/computeNodeMgt/computeNodeDetail',
      state: {
        id: row.powerNodeId,
      },
    })
  }
  const editFn = row => {
    history.push({
      pathname: '/nodeMgt/computeNodeMgt/editComputeNode',
      state: {
        type: 'Edit',
        row,
      },
    })
  }
  const dataSource = [
    {
      key: '1',
      bandwidth: 100,
      connMessage: '',
      connTime: '',
      core: 10,
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
      remarks: '222222222222',
      startTime: '',
      connStatus: '2',
      updateTime: '',
      usedBandwidth: 0,
      usedCore: 0,
      usedMemory: 0,
    },
  ]
  const columns = [
    {
      title: 'No.',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 80,
    },
    {
      title: t('computeNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      key: 'nodeName',
      width: 300,
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <>
            <div>
              <p>{record.powerNodeName}</p>
            </div>
            <div>
              <Tooltip title={record.powerNodeId}>
                <p className="ellipsis">ID: &nbsp;{record.powerNodeId}</p>
              </Tooltip>
            </div>
          </>
        )
      },
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      width: 200,
      key: 'status',
      render: (text, record, index) => {
        return <>{UseStatus(record.connStatus)}</>
      },
    },
    {
      title: t('common.ip'),
      dataIndex: 'ip',
      width: 200,
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
      width: 200,
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
      title: t('common.actions'),
      width: 300,
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, row: any, index: any) => {
        return (
          <Space size={10} className="operation-box">
            {row.connStatus === '-1' ? (
              <>
                <span className="btn pointer" onClick={() => editFn(row)}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'delete')}>
                  {t('common.delete')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.connStatus === '0' ? (
              <>
                <span className="btn pointer" onClick={() => operation(row, 'view')}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={() => editFn(row)}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'enable')}>
                  {t('common.enable')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'delete')}>
                  {t('common.delete')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.connStatus === '1' ? (
              <>
                <span className="btn pointer" onClick={() => operation(row, 'view')}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'disable')}>
                  {t('common.disable')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.connStatus === '2' ? (
              <>
                <span className="btn pointer" onClick={() => viewInfo(row)}>
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
      computeNodeApi.deletePowerNode({ powerNodeId: curId }).then(res => {
        if (res.status === 0) {
          SetIsModalVisible(false)
          message.success(`${t('tip.operationSucces')}`)
          initTable()
        } else {
          message.error(`${t('tip.operationFailed')}`)
        }
      })
    } else if (modalType === 'enable') {
      computeNodeApi.publishPower({ powerNodeId: curId, status }).then(res => {
        if (res.status === 0) {
          SetIsModalVisible(false)
          message.success(`${t('tip.operationSucces')}`)
          // initTable()
        } else {
          message.error(`${t('tip.operationFailed')}`)
        }
      })
    } else if (modalType === 'disable') {
      computeNodeApi.revokePower({ powerId: curPowerId, status }).then(res => {
        if (res.status === 0) {
          SetIsModalVisible(false)
          message.success(`${t('tip.operationSucces')}`)
          // initTable()
        } else {
          message.error(`${t('tip.operationFailed')}`)
        }
      })
    } else if (modalType === 'view') {
      SetIsModalVisible(false)
    }
  }
  const handleCancel = () => {
    SetIsModalVisible(false)
  }

  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        // dataSource={dataSource}
        columns={columns}
        rowKey={record => record.powerNodeId}
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
              <span>
                {curRow.core} {`${t('overview.core')}`}
              </span>
            </p>
            <p>
              <span className="title">{t('overview.memory')}:</span>
              <span>{changeSizeFn(Number(curRow.memory))}</span>
            </p>
            <p>
              <span className="title">{t('overview.bandwidth')}:</span>
              <span>{`${changeSizeFn(Number(curRow.bandwidth))}P/S`}</span>
            </p>
            <p>
              <span className="title">{t('common.remark')}:</span>
              <span>{curRow.remarks}</span>
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
