import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space, message } from 'antd'
import { resourceApi } from '../../../../api/index'
import MyModal from '../../../../components/MyModal'
import useInterval from '../../../../hooks/useInterval'
import { tableInterVal } from '../../../../constant/index'

const MyDataTable: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const history = useHistory()
  const { searchText } = props
  const [pop, setPop] = useState({
    type: '',
    id: '',
    fileName: '',
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [curPage, setCurPage] = useState(1)
  const [totalNum, setTotalNum] = useState(0)
  const [tableData, setTableData] = useState([])

  const initTableData = () => {
    resourceApi.queryMydataByKeyword({ keyword: searchText, pageNumber: curPage, pageSize: 10 }).then(res => {
      if (res.status === 0) {
        setTotalNum(res.total)
        setTableData(res.data)
      }
    })
  }

  useEffect(() => {
    initTableData()
  }, [curPage, searchText])

  useEffect(() => {
    if (pop.type !== '') {
      setIsModalVisible(true)
    }
  }, [pop])

  useInterval(() => {
    initTableData()
  }, tableInterVal)

  const handleOk = () => {
    let data = {}
    if (pop.type === 'publish') {
      data = {
        id: pop.id,
        action: 1,
      }
    } else if (pop.type === 'withdraw') {
      data = {
        id: pop.id,
        action: 0,
      }
    } else if (pop.type === 'delete') {
      data = {
        id: pop.id,
        action: -1,
      }
    }
    resourceApi.metaDataAction(data).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.operationSucces')}`)
        setIsModalVisible(false)
        initTableData()
      } else {
        message.error(`${t('tip.operationFailed')}`)
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
        id: row.id,
      },
    })
  }

  const modifyFn = row => {
    history.push({
      pathname: '/resource/myData/dataDetail',
      state: {
        type: 'edit',
        id: row.id,
        fileName: row.fileName,
      },
    })
  }
  const publishFn = (row: any) => {
    setPop({
      type: 'publish',
      id: row.id,
      fileName: row.fileName,
    })
  }

  const deleteFn = (row: any) => {
    setPop({
      type: 'delete',
      id: row.id,
      fileName: row.fileName,
    })
  }
  const withDrawFn = (row: any) => {
    setPop({
      type: 'withdraw',
      id: row.id,
      fileName: row.fileName,
    })
  }

  const download = (data: any, fileName: string) => {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', `${fileName}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadFn = (row: any) => {
    const { fileName } = row
    resourceApi.downloadMeta({ id: row.id }).then(res => {
      if (res) {
        download(res, fileName)
        message.success(`${t('tip.operationSucces')}`)
        setIsModalVisible(false)
      } else {
        message.error(`${t('tip.operationFailed')}`)
      }
    })
  }

  const OnPageChange = (page: number) => {
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
      render: (text, record, index) => {
        // 1已发布，0未发布
        if (record.status === '1') {
          return t('center.pulish')
        }
        return t('center.unPublish')
      },
    },
    {
      title: t('center.metaFiled'),
      dataIndex: 'metaDataColumnList',
      key: 'metaDataColumnList',
      width: 400,
      render: (text: any) => (
        <Space size={10} wrap>
          {text.map(item => (
            <span key={item}>{item}</span>
          ))}
        </Space>
      ),
    },
    {
      title: t('common.operations'),
      width: 300,
      dataIndex: 'operations',
      key: 'operations',
      render: (text: any, row: any, index: any) => {
        if (row.status === '1') {
          return (
            <Space size={10} className="operation-box">
              <span className="btn pointer link" onClick={() => viewFn(row)}>
                {t('center.view')}
              </span>
              <span className="btn pointer link" onClick={() => downloadFn(row)}>
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
            <span className="btn pointer link" onClick={() => downloadFn(row)}>
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
        rowKey={record => record.id}
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
            {t('center.confirmDelete')}&nbsp;:&nbsp;{pop.fileName}
          </p>
        ) : (
          ''
        )}
        {pop.type === 'publish' ? (
          <p>
            {t('center.confirmPublish')}&nbsp;:&nbsp;{pop.fileName}
          </p>
        ) : (
          ''
        )}
        {pop.type === 'withdraw' ? (
          <p>
            {t('center.confirmWithdraw')}&nbsp;:&nbsp;{pop.fileName}
          </p>
        ) : (
          ''
        )}
      </MyModal>
    </div>
  )
}

export default MyDataTable
