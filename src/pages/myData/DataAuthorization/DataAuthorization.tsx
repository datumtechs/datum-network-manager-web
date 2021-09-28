import { FC, useState, useEffect } from 'react'
import { Table, Space } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyModal from '../../../components/MyModal'
import { authApi } from '../../../api/index'

export const DataAuthorization: FC<any> = props => {
  const [curType, curTypeSet] = useState<number>(1)
  const { t } = useTranslation()
  const [curPage, curPageSet] = useState<number>(1)
  const [isModalVisible, isModalVisibleSet] = useState<boolean>(false)
  const [totalNum, totalNumSet] = useState<number>(0)
  const [opType, opTypeSet] = useState<string>('')
  const [curName, curNameSet] = useState<string>('')
  const [curId, curIdSet] = useState<string>('')
  const [tableData, tableDataSet] = useState([])

  const history = useHistory()

  const dataSource = [{
    id: 1,
    dataName: '222222222222222',
    account: '33333333333333333',
    authType: '1',
    authStartTime: '111111111111111111',
    authEndTime: '111111111111111111',
    sponsor: '111111',
    isAuthed: true
  }]
  const pagination = {
    defaultPageSize: 10
  }
  const view = (record) => {
    history.push({
      pathname: "/myData/dataAuthorization/authInfo",
      state: {
        isAuthed: record.isAuthed,
        dataName: record.dataName,
        owner: record.sponsor,
      },
    })
  }
  const agree = (record) => {
    isModalVisibleSet(true)
    curNameSet(record.dataName)
    curIdSet(record.id)
    opTypeSet('agree')
  }
  const decline = (record) => {
    isModalVisibleSet(true)
    curNameSet(record.dataName)
    curIdSet(record.id)
    opTypeSet('decline')
  }
  const handleOk = () => { }
  const handleCancel = () => { isModalVisibleSet(false) }

  const columns = [{
    title: t('common.Num'),
    render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    width: 80,
  }, {
    title: t('myData.dataNameAndApplicantAccount'),
    render: (text, record, index) => {
      return <>
        <p>{record.dataName}</p>
        <p>{record.account}</p>
      </>
    }
  },
  {
    title: t('myData.authType'),
    render: (text, record, index) => {
      return <>
        <p>{record.authType === '1' ? t('myData.period') : ''}</p>
        <p>{record.authType === '2' ? t('myData.count') : ''}</p>
      </>
    }
  },
  {
    title: t('myData.authValue'),
    render: (text, record, index) => {
      return <>
        <p>{record.authType === '1' ? <> <p>{record.authStartTime} to</p><p>{record.authEndTime}</p></> : ''}</p><br />
        <p>{record.authType === '2' ? record.count : ''}</p>
      </>
    }
  },
  {
    title: t('myData.authStartTime'),
    render: (text, record, index) => {
      return <>
        <p>{record.authStartTime}</p>
      </>
    }
  },
  {
    title: t('common.actions'),
    render: (text, record, index) => {
      return <Space className="operation-box" size={10}>
        <span onClick={() => view(record)} className="btn pointer">{t('common.view')}</span>
        <span onClick={() => agree(record)} className="btn pointer success_color">{t('common.agree')}</span>
        <span onClick={() => decline(record)} className="btn pointer failed_color">{t('common.decline')}</span>
      </Space>
    }
  },]
  const OnPageChange = () => { }

  // TODO: change type 替换数据

  useEffect(() => {
    authApi.authDataList({
      "keyWord": "",
      "pageNumber": 1,
      "pageSize": 10,
      "status": curType // 0：未定义， 1:待授权数据， 2:已授权数据(同意授权 + 拒绝授权)
    }).then(res => {
      console.log(res);

    })
  }, [curType])

  return <div className="layout-box">
    <div className="author-tab">
      <Space size={100}>
        <span className="tab-title pointer" onClick={() => curTypeSet(1)}>{t('myData.unauthorized')}:&nbsp;{ }</span>
        <span className="tab-title pointer" onClick={() => curTypeSet(2)}>{t('myData.authorized')}:&nbsp;{ }</span>
      </Space>
    </div>
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        // dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{
          defaultCurrent: 1,
          current: curPage,
          defaultPageSize: 10,
          total: totalNum,
          onChange: OnPageChange,
        }}
      />

    </div>
    <MyModal width={600} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>
        {opType === 'agree' ? t('tip.isAuthData') : t('tip.isUnAuthData')}
        {curName}
      </p>
    </MyModal>
  </div >
}
