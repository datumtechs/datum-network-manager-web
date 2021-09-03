import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Tooltip, Input } from 'antd'
import MyModal from '../../../../components/MyModal'
import failedSvg from '../../../../assets/images/11.icon1.svg'
import successSvg from '../../../../assets/images/9.icon1.svg'

const SeedNodeTable: FC<any> = (props: any) => {
  // attribute
  const [tableData, tableDataSet] = useState<Array<object>>([])

  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const [curName, curNameSet] = useState<string>('')
  const [curPage, setCurPage] = useState<number>(1)
  const [total, totalSet] = useState<number>(0)
  const { t } = useTranslation()

  const pagination = {
    defaultCurPage: 1,
    current: 1,
    defaultPageSize: 10,
  }
  const dataSource = [
    {
      id: 0,
      name: '尼克萨哈',
      publickey: '1111111111111111111111111111112222222222',
      status: -1,
      isInitial: 0,
      ip: '1111',
      port: '222',
      isEdit: false,
    },
    {
      id: 1,
      name: '索尼',
      publickey: '3333333333333333333333333333332222222222',
      status: 0,
      isInitial: 1,
      ip: '3333',
      port: '444',
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

  const saveFn = () => { }

  const deleteFn = record => {
    isModalVisibleSet(true)
    curNameSet(record.name)
  }

  const columns: Array<object> = [
    {
      title: t('common.Num'),
      width: 60,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('node.seedNodeAndNodePK'),
      dataIndex: 'seedNodeName',
      key: 'seedNodeName',
      width: 300,
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box">
            <p className="bottom8p">{record.name}</p>
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('node.npk')} :</p>
                <Input className="seedNode-edit-input" />
              </div>
            ) : (
              <Tooltip title={record.publickey}>
                <p className="ellipsis" style={{ whiteSpace: 'nowrap' }}>
                  {t('node.npk')}&nbsp;:&nbsp;{record.publickey}
                </p>
              </Tooltip>
            )}
          </div>
        )
      },
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record, index) => {
        return (
          <div className="status-box">
            {record.status === 0 ? <img src={successSvg} alt="" /> : <img src={failedSvg} alt="" />}
            {record.status === 0 ? (
              <span className="success_color">{t('common.connectSuccess')}</span>
            ) : (
              <span className="failed_color">{t('common.connectFailed')}</span>
            )}
          </div>
        )
      },
    },
    {
      title: t('node.initialNode'),
      dataIndex: 'initialNode',
      key: 'initialNode',
      width: 100,
      render: (text, record, index) => (record.isInitial === 1 ? t('common.yes') : t('common.no')),
    },
    {
      title: t('node.internalNetworkAddress'),
      dataIndex: 'internalNetworkAddress',
      key: 'internalNetworkAddress',
      width: 150,
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">IP :</p>
                <Input className="seedNode-edit-input" />
              </div>
            ) : (
              <div className="bottom8p">IP : {record.ip}</div>
            )}
            {record.isEdit ? (
              <div className="seedNode-edit-cell">
                <p className="seed-name">{t('common.port')} :</p>
                <Input className="seedNode-edit-input" />
              </div>
            ) : (
              <div>
                {t('common.port')} : {record.port}
              </div>
            )}
          </div>
        )
      },
    },
    {
      title: t('common.actions'),
      dataIndex: '',
      key: 'action',
      width: 120,
      render: (text, record, index) => {
        return (
          <>
            {record.isEdit ? (
              <Space size={10} className="operation-box">
                <span className="btn pointer" onClick={() => saveFn()}>
                  {t('common.save')}
                </span>
                <span className="btn pointer" onClick={() => setEditStatus(record, false)}>
                  {t('common.cancel')}
                </span>
              </Space>
            ) : (
              <Space size={10} className="operation-box">
                <span className="pointer btn" onClick={() => setEditStatus(record, true)}>
                  {t('common.edit')}
                </span>
                <span className="pointer btn" onClick={() => deleteFn(record)}>
                  {t('common.delete')}
                </span>
              </Space>
            )}
          </>
        )
      },
    },
  ]

  // methods
  const onPageChange = () => { }
  const handleOk = () => { }
  const handleCancel = () => isModalVisibleSet(false)

  useEffect(() => {
    tableDataSet(dataSource)
  }, [])

  // jsx
  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={{ defaultCurrent: 1, total, onChange: onPageChange }}
      />
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
          {t('computeNodeMgt.confirmDelete')}:{curName}
        </p>
      </MyModal>
    </div>
  )
}

export default SeedNodeTable
