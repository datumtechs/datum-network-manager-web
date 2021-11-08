import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space, message } from 'antd'
import { resourceApi } from '../../../../api/index'
import MyModal from '../../../../components/MyModal'
import useInterval from '../../../../hooks/useInterval'
import { tableInterVal } from '../../../../constant/index'
import warnSvg from '../../../../assets/images/10.icon1.svg'
import successSvg from '../../../../assets/images/9.icon1.svg'
import { changeSizeFn } from '../../../../utils/utils'

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
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  // const dataSource = [
  //   {
  //     id: 0,
  //     fileName: '遏必隆',
  //     status: '1',
  //     dataSize: 222222,
  //     lastUpdateTime: 111111111111111111,
  //     taskNum: 12123,
  //   },
  //   {
  //     id: 1,
  //     fileName: '索额图',
  //     status: '0',
  //     dataSize: 2222222,
  //     lastUpdateTime: 111111111111111111,
  //     taskNum: 12123,
  //   },
  // ]

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
      pathname: '/myData/dataMgt/dataDetail',
      state: {
        type: 'edit',
        id: row.id,
        metaDataId: row.metaDataId
      },
    })
  }

  const saveAsNewData = row => {
    history.push({
      pathname: '/myData/dataMgt/saveNewData',
      state: {
        type: 'save',
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

  const readFile = (steam) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      const mes = JSON.parse(reader.result as any)
      console.log(mes.msg);
      message.error(`${t('tip.operationFailed')}`)
    }
    reader.readAsText(steam)
  }

  const downloadFn = (row: any) => {
    const { fileName } = row
    resourceApi.downloadMeta({ id: row.id }).then(res => {
      const typeList = ['application/json']
      // 以json返回 则非正常
      if (typeList.includes(res.type)) {
        readFile(res)
      } else {
        download(res, fileName)
        message.success(`${t('tip.operationSucces')}`)
        setIsModalVisible(false)
      }

    })
  }

  const OnPageChange = (page: number) => {
    setCurPage(page)
  }

  const columns = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 80,
    },
    {
      title: t('center.dataName'),
      dataIndex: 'fileName',
      key: 'fileName',
      width: 180,
    },
    {
      title: t('center.metaStatus'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text, record, index) => {
        // 1已发布，0未发布
        if (record.status === '1') {
          return (
            <div className="status-box">
              <img src={successSvg} alt="" />
              <p>{t('center.pulish')}</p>
            </div>
          )
        }
        return (
          <div className="status-box">
            <img src={warnSvg} alt="" />
            <p>{t('center.unPublish')}</p>
          </div>
        )
      },
    },
    {
      title: t('myData.dataSize'),
      dataIndex: 'size',
      key: 'size',
      width: 100,
      render: (text, record, index) => {
        return <>{changeSizeFn(text)}</>
      }
    },
    {
      title: t('myData.taskNum'),
      dataIndex: 'attendTaskCount',
      key: 'attendTaskCount',
      width: 100,
    },
    // {
    //   title: t('center.metaFiled'),
    //   dataIndex: 'metaDataColumnList',
    //   key: 'metaDataColumnList',
    //   width: 400,
    //   render: (text: any) => (
    //     <Space size={10} wrap>
    //       {text.map(item => (
    //         <span key={item}>{item}</span>
    //       ))}
    //     </Space>
    //   ),
    // },
    {
      title: t('common.actions'),
      width: 220,
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, row: any, index: any) => {
        if (row.status === '1') {
          return (
            <div className="operation-box">
              <p className="btn pointer link pr10" onClick={() => viewFn(row)}>
                {t('center.view')}
              </p>
              <p className="btn pointer link pr10" onClick={() => downloadFn(row)}>
                {t('center.download')}
              </p>
              <p className="btn pointer link pr10" onClick={() => withDrawFn(row)}>
                {t('center.withdraw')}
              </p>
              <p className="btn pointer link pr10" onClick={() => saveAsNewData(row)}>
                {t('center.saveAsNewData')}
              </p>
            </div>
          )
        }
        return (
          <div className="operation-box">
            <p className="btn pointer link pr10" onClick={() => viewFn(row)}>
              {t('center.view')}
            </p>
            <p className="btn pointer link pr10" onClick={() => downloadFn(row)}>
              {t('center.download')}
            </p>
            <p className="btn pointer link pr10" onClick={() => publishFn(row)}>
              {t('center.publish')}
            </p>
            <p className="btn pointer link pr10" onClick={() => saveAsNewData(row)}>
              {t('center.saveAsNewData')}
            </p>
            <p className="btn pointer link pr10" onClick={() => deleteFn(row)}>
              {t('center.delete')}
            </p>
          </div>
        )
      },
    },
  ]
  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        // dataSource={dataSource}
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
      <MyModal width={600} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} bordered>
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
