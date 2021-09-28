import React, { FC, useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Input } from 'antd'
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
  const [tableData, tableDataSet] = useState<Array<object>>([])
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
  const saveFn = () => { }
  const initTable = async () => {
    const res = await computeNodeApi.queryPowerNodeList({
      identityId: baseInfo?.identityId,
      keyword: props.searchText,
      pageNumber: curPage,
      pageSize: pagination.defaultPageSize,
    })
    if (res.status === 0) {
      tableDataSet(res.data)
      totalSet(res.total)
    }
  }

  useEffect(() => {
    initTable() // TODO
  }, [props.searchText, curPage])

  useInterval(() => {
    // initTable() TODO
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
        name: row.powerNodeName,
      },
    })
  }
  const editFn = row => { }

  // 节点状态，-1: 未被调度服务连接上; 0: 连接上; 1: 算力启用<计算服务>; 2: 算力被占用(计算服务算力正在被任务占用)',
  const dataSource = [
    {
      key: '1',
      bandwidth: 100,
      connMessage: '',
      connTime: '',
      core: 10,
      createTime: '',
      externalIp: '192.168.18.34',
      externalPort: 9090,
      id: 0,
      identityId: '11111111111111111',
      internalIp: '192.168.18.34',
      internalPort: 8080,
      memory: 0,
      powerNodeId: '1111111111133333333333333',
      powerNodeName: '奥术大师多',
      remarks: '222222222222',
      startTime: '',
      connStatus: '-1',
      updateTime: '',
      usedBandwidth: 0,
      usedCore: 0,
      usedMemory: 0,
      isEdit: false,
    },
    {
      key: '2',
      bandwidth: 100,
      connMessage: '',
      connTime: '',
      core: 10,
      createTime: '',
      externalIp: '192.168.18.34',
      externalPort: 9090,
      id: 1,
      identityId: '11111111111111111',
      internalIp: '192.168.18.34',
      internalPort: 8080,
      memory: 0,
      powerNodeId: '1111111111133333333333333',
      powerNodeName: '奥术大师多',
      remarks: '222222222222',
      startTime: '',
      connStatus: '0',
      updateTime: '',
      usedBandwidth: 0,
      usedCore: 0,
      usedMemory: 0,
      isEdit: false,
    },
    {
      key: '2',
      bandwidth: 100,
      connMessage: '',
      connTime: '',
      core: 10,
      createTime: '',
      externalIp: '192.168.18.34',
      externalPort: 9090,
      id: 3,
      identityId: '11111111111111111',
      internalIp: '192.168.18.34',
      internalPort: 8080,
      memory: 0,
      powerNodeId: '1111111111133333333333333',
      powerNodeName: '奥术大师多',
      remarks: '222222222222',
      startTime: '',
      connStatus: '1',
      updateTime: '',
      usedBandwidth: 0,
      usedCore: 0,
      usedMemory: 0,
      isEdit: false,
    },
    {
      key: '3',
      bandwidth: 100,
      connMessage: '',
      connTime: '',
      core: 10,
      createTime: '',
      externalIp: '192.168.18.34',
      externalPort: 9090,
      id: 4,
      identityId: '11111111111111111',
      internalIp: '192.168.18.34',
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
      isEdit: false,
    },
  ]

  const setEditStatus = (record, bool) => {
    dataSource.forEach(item => {
      if (item.id === record.id) {
        item.isEdit = bool
      }
    })
    tableDataSet(dataSource)
  }

  const columns = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 40,
    },
    {
      title: t('computeNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      key: 'nodeName',
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
      key: 'status',
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
      key: 'ip',
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.internalIP')}&nbsp;:&nbsp;</p>
                <Input className="seedNode-edit-input" />
              </div>
            ) : (
              <div className="bottom8p">
                {t('dataNodeMgt.internalIP')}&nbsp;:&nbsp;{record.internalIp}
              </div>
            )}
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.externalIp')}&nbsp;:&nbsp;</p>
                <Input className="seedNode-edit-input" />
              </div>
            ) : (
              <div>
                {t('dataNodeMgt.externalIp')}&nbsp;:&nbsp;{record.externalIp}
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
      key: 'port',
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.internalPort')}&nbsp;:&nbsp;</p>
                <Input className="seedNode-edit-input" />
              </div>
            ) : (
              <div className="bottom8p">
                {t('dataNodeMgt.internalPort')}&nbsp;:&nbsp;{record.internalPort}
              </div>
            )}
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.externalPort')}&nbsp;:&nbsp;</p>
                <Input className="seedNode-edit-input" />
              </div>
            ) : (
              <div>
                {t('dataNodeMgt.externalPort')}&nbsp;:&nbsp;{record.externalPort}
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
      key: 'actions',
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
                    <span className="btn main_color pointer" onClick={() => saveFn()}>
                      {t('common.save')}
                    </span>
                    <span className="btn main_color pointer" onClick={() => setEditStatus(row, false)}>
                      {t('common.cancel')}
                    </span>
                  </Space>
                ) : (
                  <Space size={10}>
                    <span className="btn pointer main_color" onClick={() => setEditStatus(row, true)}>
                      {t('common.edit')}
                    </span>
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
                    <span className="btn main_color pointer" onClick={() => saveFn()}>
                      {t('common.save')}
                    </span>
                    <span className="btn main_color pointer" onClick={() => setEditStatus(row, false)}>
                      {t('common.cancel')}
                    </span>
                  </Space>
                ) : (
                  <Space size={10}>
                    <span className="btn pointer main_color" onClick={() => setEditStatus(row, true)}>
                      {t('common.edit')}
                    </span>
                    <span className="btn pointer main_color" onClick={() => operation(row, 'delete')}>
                      {t('common.delete')}
                    </span>
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
        scroll={{ x: 990 }}
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
