import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space, message } from 'antd'
import { resourceApi } from '../../../../api/index'
import MyModal from '../../../../components/MyModal'

const MyDataTable: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const [pop, setPop] = useState({
    type: '',
    id: '',
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [curPage, setCurPage] = useState(1)
  const [totalNum, setTotalNum] = useState(0)
  const [tableData, setTableData] = useState([])

  const initTableData = () => {
    resourceApi.queryMydata({ pageNum: curPage, pageSize: 10 }).then(res => {
      if (res.status === 0) {
        setTotalNum(res.total)
        setTableData(res.list)
      }
    })
  }

  useEffect(() => {
    initTableData()
  }, [curPage])

  useEffect(() => {
    if (pop.type !== '') {
      setIsModalVisible(true)
    }
  }, [pop])

  const handleOk = () => {
    let data = {}
    if (pop.type === 'publish') {
      data = {
        metaDataId: pop.id,
        action: 1,
      }
    } else if (pop.type === 'withdraw') {
      data = {
        metaDataId: pop.id,
        action: 0,
      }
    } else if (pop.type === 'delete') {
      data = {
        metaDataId: pop.id,
        action: -1,
      }
    }
    resourceApi.metaDataAction(data).then(res => {
      if (res.status === 0) {
        console.log(res)
        message.success('操作成功')
        setIsModalVisible(false)
      }
    })
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const viewFn = row => {
    history.push({
      pathname: '/resource/myData/dataDetail',
      state: {
        type: 'view',
        id: row.metaDataId,
      },
    })
  }

  const modifyFn = row => {
    history.push({
      pathname: '/resource/myData/dataDetail',
      state: {
        type: 'edit',
        id: row.metaDataId,
      },
    })
  }
  const publishFn = (row: any) => {
    setPop({
      type: 'publish',
      id: row.metaDataId,
    })
  }

  const deleteFn = (row: any) => {
    setPop({
      type: 'delete',
      id: row.metaDataId,
    })
  }
  const withDrawFn = (row: any) => {
    setPop({
      type: 'withdraw',
      id: row.metaDataId,
    })
  }

  const downloadFn = () => {}

  const OnPageChange = page => {
    setCurPage(page)
  }

  const columns = [
    {
      title: t('center.metaName'),
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: t('center.metaStatus'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('center.metaFiled'),
      dataIndex: 'metaDataColumnList',
      key: 'metaDataColumnList',
      render: (text: any) => (
        <Space size={10}>
          {text.map(item => (
            <span key={item}>{item}</span>
          ))}
        </Space>
      ),
    },
    {
      title: t('common.operations'),
      width: 500,
      dataIndex: 'operations',
      key: 'operations',
      render: (text: any, row: any, index: any) => {
        if (row.status === 'released') {
          return (
            <Space size={10} className="operation-box">
              <span className="btn pointer link" onClick={viewFn}>
                {t('center.view')}
              </span>
              <span className="btn pointer link" onClick={downloadFn}>
                {t('center.download')}
              </span>
              <span className="btn pointer link" onClick={() => withDrawFn(row)}>
                {t('center.withdraw')}
              </span>
            </Space>
          )
        }
        return (
          <Space size={10} className="operation-box">
            <span className="btn pointer link" onClick={() => viewFn(row)}>
              {t('center.view')}
            </span>
            <span className="btn pointer link" onClick={() => modifyFn(row)}>
              {t('center.modify')}
            </span>
            <span className="btn pointer link" onClick={downloadFn}>
              {t('center.download')}
            </span>
            <span className="btn pointer link" onClick={() => publishFn(row)}>
              {t('center.publish')}
            </span>
            <span className="btn pointer link" onClick={() => deleteFn(row)}>
              {t('center.delete')}
            </span>
          </Space>
        )
      },
    },
  ]
  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        bordered
        rowKey={record => record.metaDataId}
        pagination={{
          defaultCurrent: 1,
          current: curPage,
          defaultPageSize: 10,
          total: totalNum,
          onChange: OnPageChange,
        }}
      />
      <MyModal
        width={600}
        title={t('common.tips')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bordered
      >
        {pop.type === 'delete' ? (
          <p>
            {t('center.confirmDelete')}&nbsp;:&nbsp;{pop.id}
          </p>
        ) : (
          ''
        )}
        {pop.type === 'publish' ? (
          <p>
            {t('center.confirmPublish')}&nbsp;:&nbsp;{pop.id}
          </p>
        ) : (
          ''
        )}
        {pop.type === 'withdraw' ? (
          <p>
            {t('center.confirmWithdraw')}&nbsp;:&nbsp;{pop.id}
          </p>
        ) : (
          ''
        )}
      </MyModal>
    </div>
  )
}

export default MyDataTable
