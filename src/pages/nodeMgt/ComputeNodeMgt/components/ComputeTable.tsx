import { FC, useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Input } from 'antd'
import MyModal from '@com/MyModal'
import { computeNodeApi } from '@api/index'
import { BaseInfoContext } from '@/layout/index'
import UseStatus from '@hooks/useComputeStatus'
import { Row } from '@/entity/index'
import { changeSizeFn, buttonDisabled } from '@utils/utils'
import './scss/index.scss'

// import useInterval from '../../../../hooks/useInterval'
// import { tableInterVal } from '../../../../constant/index'

// 节点状态，-1: 未被调度服务连接上; 0: 连接上; 1: 算力启用<计算服务>; 2: 算力被占用(计算服务算力正在被任务占用)',

const DataTable: FC<any> = (props: any) => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [modalType, SetModalType] = useState('')
  const [curName, SetCurName] = useState('')
  const [total, totalSet] = useState<number>(0)
  const history = useHistory()
  const [tableData, tableDataSet] = useState<Array<any>>([])
  const [tempTableData, tempTableDataSet] = useState<Array<any>>([])
  const [curPage, setCurPage] = useState<number>(1)
  const baseInfo = useContext(BaseInfoContext)
  const [curId, curIdSet] = useState<string>('')
  const { t } = useTranslation()
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

  const onPageChange = num => {
    setCurPage(num)
  }

  // const initFn = useComputenodeTable({
  //   identityId: baseInfo?.identityId,
  //   keyword: props.searchText,
  //   pageNumber: curPage,
  //   pageSize: pagination.defaultPageSize,
  // })
  const handleChange = (type, index, e) => {
    tempTableDataSet(() => {
      tempTableData[index][type] = e.target.value
      return [...tempTableData]
    })
  }

  const initTable = async () => {
    const res = await computeNodeApi.queryPowerNodeList({
      identityId: baseInfo?.identityId,
      keyword: props.searchText,
      pageNumber: curPage,
      pageSize: pagination.defaultPageSize,
    })
    if (res.status === 0) {
      const newTableData: any[] = []
      res.data.forEach((item) => {
        newTableData.push(({ ...item, 'isEdit': false }))
      })
      tableDataSet(res.data)
      tempTableDataSet(JSON.parse(JSON.stringify(newTableData)))
      totalSet(res.total)
    }
    // tableDataSet([...dataSource])
  }
  const saveFn = (record, index) => {
    computeNodeApi.updatePowerNode({
      "externalIp": tempTableData[index].externalIp,
      "externalPort": tempTableData[index].externalPort,
      "internalIp": tempTableData[index].internalIp,
      "internalPort": tempTableData[index].internalPort,
      "remarks": '',
      "powerNodeId": record.powerNodeId,
    }).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.operationSucces')}`)
        initTable()
      } else {
        message.error(`${t('tip.operationFailed')}`)
      }
    })
  }
  useEffect(() => {
    initTable() // TODO
  }, [props.searchText, curPage])


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
        name: row.powerNodeName,
        identityId: row.identityId
      },
    })
  }
  // const editFn = row => { }

  const setEditStatus = (record, bool, index) => {
    tableData.forEach(item => {
      if (item.id === record.id) {
        item.isEdit = bool
      }
    })
    tableDataSet([...tableData])
    if (!bool) {
      tempTableDataSet(() => {
        tempTableData[index].internalIp = tableData[index].internalIp
        tempTableData[index].internalPort = tableData[index].internalPort
        tempTableData[index].externalIp = tableData[index].externalIp
        tempTableData[index].externalPort = tableData[index].externalPort
        return [...tempTableData]
      })
    }
  }



  const columns = [
    {
      title: t('common.Num'),
      dataIndex: 'id',
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 40,
    },
    {
      title: t('computeNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      width: 80,
      ellipsis: true,
      render: (text, record, index) => {
        return <p>{record.powerNodeName}</p>
      },
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      width: 80,
      render: (text, record, index) => {
        /**
         * 连接状态 connStatus 0 1
         * 算力节点状态 0 未知 1 未启用 2 空闲(已启用) 3 占用(已启用) 4:已撤销
         */
        const { img, content } = UseStatus(record.connStatus, record.powerStatus)
        return (
          <div className="status-box">
            <img src={img} alt="" />
            <span>{content}</span>
          </div>
        )
      },
    },
    {
      title: t('common.ip'),
      dataIndex: 'ip',
      width: 110,
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.internal')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index]?.internalIp} onChange={(e) => handleChange('internalIp', index, e)} className="seedNode-edit-input" />
              </div>
            ) : (
              <div className="bottom8p">
                {t('dataNodeMgt.internal')}&nbsp;:&nbsp;{record.internalIp}
              </div>
            )}
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.external')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index]?.externalIp} onChange={(e) => handleChange('externalIp', index, e)} className="seedNode-edit-input" />
              </div>
            ) : (
              <div>
                {t('dataNodeMgt.external')}&nbsp;:&nbsp;{record.externalIp}
              </div>
            )}
          </div>
        )
      },
    },
    {
      title: t('common.port'),
      dataIndex: 'port',
      width: 100,
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.internal')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index].internalPort} onChange={(e) => handleChange('internalPort', index, e)} className="seedNode-edit-input" />
              </div>
            ) : (
              <div className="bottom8p">
                {t('dataNodeMgt.internal')}&nbsp;:&nbsp;{record.internalPort}
              </div>
            )}
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.external')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index].externalPort} onChange={(e) => handleChange('externalPort', index, e)} className="seedNode-edit-input" />
              </div>
            ) : (
              <div>
                {t('dataNodeMgt.external')}&nbsp;:&nbsp;{record.externalPort}
              </div>
            )}
          </div>
        )
      },
    },
    {
      title: t('common.actions'),
      width: 100,
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        return (
          <Space size={10} className="operation-box">
            {row.connStatus === 0 ? (
              <>
                {/* <span className="btn pointer" onClick={() => editFn(row)}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'delete')}>
                  {t('common.delete')}
                </span> */}

                {row.isEdit ? (
                  <Space size={10}>
                    <span className="btn main_color pointer" onClick={() => saveFn(row, index)}>
                      {t('common.save')}
                    </span>
                    {
                      buttonDisabled() ? '' :
                        <span className="btn main_color pointer" onClick={() => setEditStatus(row, false, index)}>
                          {t('common.cancel')}
                        </span>
                    }

                  </Space>
                ) : (
                  <Space size={10}>
                    {
                      buttonDisabled() ? '' :
                        <span className="btn pointer main_color" onClick={() => setEditStatus(row, true, index)}>
                          {t('common.edit')}
                        </span>
                    }

                    <span className="btn pointer main_color" onClick={() => operation(row, 'delete')}>
                      {t('common.delete')}
                    </span>
                  </Space>
                )}
              </>
            ) : (
              <></>
            )}
            {row.connStatus === 1 && (row.powerStatus === 1 || row.powerStatus === 4) ? (
              <>
                {row.isEdit ? (
                  <Space size={10}>
                    <span className="btn main_color pointer" onClick={() => saveFn(row, index)}>
                      {t('common.save')}
                    </span>
                    {
                      buttonDisabled() ? '' :
                        <span className="btn main_color pointer" onClick={() => setEditStatus(row, false, index)}>
                          {t('common.cancel')}
                        </span>
                    }

                  </Space>
                ) : (
                  <Space size={10}>
                    {
                      buttonDisabled() ? '' :
                        <>
                          <span className="btn pointer main_color" onClick={() => setEditStatus(row, true, index)}>
                            {t('common.edit')}
                          </span>
                          <span className="btn pointer main_color" onClick={() => operation(row, 'delete')}>
                            {t('common.delete')}
                          </span>
                        </>
                    }
                    <span className="btn pointer main_color" onClick={() => operation(row, 'view')}>
                      {t('common.view')}
                    </span>
                    <span className="btn pointer main_color" onClick={() => operation(row, 'enable')}>
                      {t('common.enable')}
                    </span>
                  </Space>
                )}

                {/* 
                <span className="btn pointer" onClick={() => editFn(row)}>
                  {t('common.edit')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'view')}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'enable')}>
                  {t('common.enable')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'delete')}>
                  {t('common.delete')}
                </span> */}
              </>
            ) : (
              <></>
            )}
            {row.connStatus === 1 && row.powerStatus === 2 ? (
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
            {row.connStatus === 1 && row.powerStatus === 3 ? (
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
          initTable()
        } else {
          message.error(`${t('tip.operationFailed')}`)
        }
      })
    } else if (modalType === 'disable') {
      computeNodeApi.revokePower({ powerNodeId: curId, status }).then(res => {
        if (res.status === 0) {
          SetIsModalVisible(false)
          message.success(`${t('tip.operationSucces')}`)
          initTable()
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
        columns={columns}
        rowKey={_ => _.id}
        scroll={{ x: 990 }}
        pagination={{ defaultCurrent: 1, showSizeChanger: false, total, onChange: onPageChange }}
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
            {/* <p>
              <span className="title">{t('common.remark')}:</span>
              <span>{curRow.remarks}</span>
            </p> */}
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
