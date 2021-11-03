import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Tooltip, Input, Button } from 'antd'
import MyModal from '../../../../components/MyModal'
import failedSvg from '../../../../assets/images/11.icon1.svg'
import successSvg from '../../../../assets/images/9.icon1.svg'
import { nodeApi } from '../../../../api/index'

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

  const setEditStatus = (record, bool) => {
    tableData.forEach((item: any) => {
      if (item.id === record.id) {
        item.isEdit = bool
      }
    })
    tableDataSet(tableData)
  }

  const saveFn = () => { }

  const deleteFn = record => {
    isModalVisibleSet(true)
    curNameSet(record.seedNodeId)
  }

  const columns: Array<object> = [
    {
      title: t('common.Num'),
      width: 60,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('node.nodeSeedNodeId'),
      dataIndex: 'seedNodeId',
      key: 'seedNodeId',
      ellipsis: true,

    },
    {
      title: t('common.status'),
      dataIndex: 'connStatus',
      key: 'connStatus',
      width: 150,
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
      title: t('common.actions'),
      dataIndex: '',
      key: 'action',
      width: 120,
      render: (text, record, index) => {
        return (
          <>
            <Space size={10} className="operation-box">
              {!record.initFlag ?
                <span className="pointer btn" onClick={() => deleteFn(record)}>
                  {t('common.delete')}
                </span> :
                (<span className="span-view">{t('common.delete')}</span>)
              }
            </Space>
          </>
        )
      },
    },
  ]

  // methods
  const onPageChange = () => { }
  const handleOk = () => {
    nodeApi.delSeedNode({
      seedNodeId: curName
    }).then((res) => {
      if (res.status === 0) {
        tableDataSet(res.data)
        totalSet(res.total)
      }
    })
  }
  const handleCancel = () => isModalVisibleSet(false)

  const querySeedNodeList = () => {
    nodeApi.querySeedNodeList({
      keyWord: '',
      pageNumber: curPage,
      pageSize: pagination.defaultPageSize
    }).then((res) => {
      if (res.status === 0) {
        tableDataSet(res.data)
        totalSet(res.total)
      }
    })
  }

  useEffect(() => {
    // tableDataSet(dataSource)
    querySeedNodeList()
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
