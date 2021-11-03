import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Input } from 'antd'
import MyModal from '../../../../components/MyModal'
import { dataNodeApi } from '../../../../api/index'
import failedSvg from '../../../../assets/images/11.icon1.svg'
import successSvg from '../../../../assets/images/9.icon1.svg'

const DataTable: FC<any> = (props: any) => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [curName, SetCurName] = useState('')
  const history = useHistory()
  const [tableData, tableDataSet] = useState<Array<any>>([])
  const [tempTableData, tempTableDataSet] = useState<Array<any>>([])
  const [total, totalSet] = useState<number>(0)
  const [curPage, setCurPage] = useState<number>(1)
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

  const initData = async () => {
    const res = await dataNodeApi.queryDatanodeList({
      keyword: props.searchText,
      pageNumber: curPage,
      pageSize: pagination.defaultPageSize,
    })
    if (res.status === 0) {
      const newTableData: any[] = []
      res.data.forEach((item) => {
        newTableData.push(({ ...item, 'isEdit': false }))
      })
      // 一为真实数据 另为展示数据
      tableDataSet(newTableData)
      tempTableDataSet(JSON.parse(JSON.stringify(newTableData)))
      totalSet(res.total)
    }
  }

  useEffect(() => {
    initData()
  }, [props.searchText, curPage])

  const deleteFn = row => {
    SetCurName(row.nodeName)
    setCurId(row.nodeId)
    SetIsModalVisible(true)
  }
  const saveFn = (record, index) => {
    dataNodeApi.updateDataNode({
      "externalIp": tempTableData[index].externalIp,
      "externalPort": tempTableData[index].externalPort,
      "internalIp": tempTableData[index].internalIp,
      "internalPort": tempTableData[index].internalPort,
      "nodeId": record.nodeId,
    }).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.operationSucces')}`)
        initData()
      }
    })
  }

  const handleChange = (type, index, e) => {
    tempTableDataSet(() => {
      tempTableData[index][type] = e.target.value
      return [...tempTableData]
    })
  }

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
      width: 80,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('dataNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      key: 'nodeName',
      width: 200,
    },
    {
      title: t('common.status'),
      dataIndex: 'connStatus',
      key: 'connStatus',
      width: 200,
      render: (text, record, index) => {
        return (
          <div className="status-box">
            {record.connStatus === 1 ? <img src={successSvg} alt="" /> : <img src={failedSvg} alt="" />}
            {record.connStatus === 1 ? (
              <span className="success_color">{t('common.connectSuccess')}</span>
            ) : (
              <span className="failed_color">{t('common.connectFailed')}</span>
            )}
          </div>
        )
      },
    },
    {
      title: t('common.ip'),
      dataIndex: 'ip',
      width: 300,
      key: 'ip',
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.internalIP')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index]?.internalIp} onChange={(e) => handleChange('internalIp', index, e)} className="seedNode-edit-input" />
              </div>
            ) : (
              <div className="bottom8p">
                {t('dataNodeMgt.internalIP')}&nbsp;:&nbsp;{record.internalIp}
              </div>
            )}
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.externalIp')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index]?.externalIp} onChange={(e) => handleChange('externalIp', index, e)} className="seedNode-edit-input" />
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
      width: 300,
      key: 'port',
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.internalPort')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index].internalPort} onChange={(e) => handleChange('internalPort', index, e)} className="seedNode-edit-input" />
              </div>
            ) : (
              <div className="bottom8p">
                {t('dataNodeMgt.internalPort')}&nbsp;:&nbsp;{record.internalPort}
              </div>
            )}
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('dataNodeMgt.externalPort')}&nbsp;:&nbsp;</p>
                <Input value={tempTableData[index].externalPort} onChange={(e) => handleChange('externalPort', index, e)} className="seedNode-edit-input" />
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
      width: 150,
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any, index: any) => {
        return (
          <>
            {record.isEdit ? (
              <Space size={10} className="operation-box">
                <span className="main_color pointer btn" onClick={() => saveFn(record, index)}>
                  {t('common.save')}
                </span>
                <span className="main_color pointer btn" onClick={() => setEditStatus(record, false, index)}>
                  {t('common.cancel')}
                </span>
              </Space>
            ) : (
              <Space size={10} className="operation-box">
                <span className="pointer main_color btn" onClick={() => setEditStatus(record, true, index)}>
                  {t('common.edit')}
                </span>
                {record.connStatus === 0 ? (
                  <span className="pointer main_color btn" onClick={() => deleteFn(record)}>
                    {t('common.delete')}
                  </span>
                ) : (
                  ''
                )}
              </Space>
            )}
          </>
        )
      },
    },
  ]
  const handleOk = () => {
    dataNodeApi.deleteDatanode({ nodeId: curId }).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.deleteSuccess')}`)
        SetIsModalVisible(false)
        initData()
      } else {
        message.error(`${t('tip.deleteFailed')}`)
      }
    })
  }
  const handleCancel = () => {
    SetIsModalVisible(false)
  }

  // useEffect(() => {
  //   tableDataSet(dataSource)
  // }, [])

  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
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
