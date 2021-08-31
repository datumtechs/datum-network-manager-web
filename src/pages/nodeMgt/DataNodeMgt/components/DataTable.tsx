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
  const [tableData, tableDataSet] = useState<Array<object>>([])
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

  // const { table } = useDatanodeTable({
  //   keyword: props.searchText,
  //   pageNumber: curPage,
  //   pageSize: pagination.defaultPageSize,
  // })

  const initData = async () => {
    const res = await dataNodeApi.queryDatanodeList({
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
    // initData()
  }, [props.searchText, curPage])

  const deleteFn = row => {
    SetCurName(row.nodeName)
    setCurId(row.nodeId)
    SetIsModalVisible(true)
  }
  const saveFn = () => {}

  const dataSource = [
    {
      connStatus: -1,
      externalIp: '111.111.111.111',
      externalPort: 9090,
      id: 0,
      internalIp: '222.222.222.222',
      internalPort: 8080,
      nodeId: '2',
      nodeName: '胡彦斌',
      isEdit: false,
    },
    {
      connStatus: 0,
      externalIp: '111.111.111.111',
      externalPort: 9090,
      id: 1,
      internalIp: '222.222.222.222',
      internalPort: 8080,
      nodeId: '2',
      nodeName: '胡彦斌',
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
      title: 'No.',
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
            {record.connStatus === 0 ? <img src={successSvg} alt="" /> : <img src={failedSvg} alt="" />}
            {record.connStatus === 0 ? (
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
          // <>
          //   <p>
          //     <span>{`${t('node.internal')}`}:&nbsp;&nbsp;</span>
          //     <span>{record.internalIp}</span>
          //   </p>
          //   <p>
          //     <span>{`${t('node.external')}`}:&nbsp;&nbsp;</span>
          //     <span>{record.externalIp}</span>
          //   </p>

          // </>
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
      width: 300,
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
      width: 150,
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any, index: any) => {
        return (
          <>
            {record.isEdit ? (
              <Space size={10}>
                <span className="main_color pointer" onClick={() => saveFn()}>
                  {t('common.save')}
                </span>
                <span className="main_color pointer" onClick={() => setEditStatus(record, false)}>
                  {t('common.cancel')}
                </span>
              </Space>
            ) : (
              <Space size={10}>
                <span className="pointer main_color" onClick={() => setEditStatus(record, true)}>
                  {t('common.edit')}
                </span>
                {record.connStatus === -1 ? (
                  <span className="pointer main_color" onClick={() => deleteFn(record)}>
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

  useEffect(() => {
    tableDataSet(dataSource)
  }, [])

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
