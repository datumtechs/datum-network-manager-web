import { FC, useState, useEffect, useImperativeHandle, forwardRef } from 'react'
// import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Tooltip, Input, Button } from 'antd'
import MyModal from '@com/MyModal'
import failedSvg from '@assets/images/11.icon1.svg'
import successSvg from '@assets/images/9.icon1.svg'
import { nodeApi } from '@api/index'
import { buttonDisabled } from '@/utils/utils'

const SeedNodeTable: FC<any> = forwardRef((props: any, ref) => {
  // attribute
  const [tableData, tableDataSet] = useState<Array<object>>([])

  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const [curName, curNameSet] = useState<string>('')
  const [curPage, setCurPage] = useState<number>(1)
  const [total, totalSet] = useState<number>(0)
  const { t, i18n } = useTranslation()

  const pagination = {
    defaultCurPage: 1,
    current: 1,
    defaultPageSize: 10,
  }


  const deleteFn = record => {
    curNameSet(record.seedNodeId)
    isModalVisibleSet(true)
  }

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    querySeedNodeList
  }));

  const columns: Array<object> = [
    {
      title: ` `,
      width: 60,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('node.nodeSeedNodeId'),
      dataIndex: 'seedNodeId',
      ellipsis: true,

    },
    {
      title: t('node.initialNode'),
      dataIndex: 'initialNode',
      width: 100,
      render: (text, record, index) => (record.initFlag ? t('common.yes') : t('common.no')),
    },
    {
      title: t('common.status'),
      dataIndex: 'connStatus',
      width: 150,
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
      title: t('common.actions'),
      dataIndex: 'action',
      width: 120,
      render: (text, record, index) => {
        return (
          <>
            <Space size={10} className="operation-box">
              {record.initFlag ?
                <span className="span-view">{t('common.delete')}</span>
                :
                <span className="pointer btn" onClick={() => deleteFn(record)}>
                  {t('common.delete')}
                </span>
              }
            </Space>
          </>
        )
      },
    },
  ]

  if (buttonDisabled()) {//
    columns.pop()
  }

  const onPageChange = (page: number) => {
    setCurPage(page)
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


  const handleOk = () => {
    nodeApi.delSeedNode({
      seedNodeId: curName
    }).then((res) => {
      if (res.status === 0) {
        querySeedNodeList()
      }
      isModalVisibleSet(false)
    })
  }
  useEffect(() => {
    querySeedNodeList()
  }, [curPage])
  useEffect(() => {
    querySeedNodeList()
  }, [])
  // jsx
  return (
    <div >
      <Table
        className="com-table"
        dataSource={tableData}
        columns={columns}
        rowKey={(_: any) => _.seedNodeId}
        pagination={{
          defaultCurrent: 1, showSizeChanger: false, total, onChange: onPageChange,
          showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
        }}
      />
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
          {t('computeNodeMgt.confirmDelete')}:{curName}
        </p>
      </MyModal>
    </div>
  )
})

export default SeedNodeTable
