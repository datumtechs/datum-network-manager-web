import { FC, useState, useEffect } from "react";
import { Table, Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const CommitteeList: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const [text, setSearchText] = useState()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [visible, setVisible] = useState(false)

  const columns: any[] = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 70,
      align: 'center',
      className: "no-right-border"
    },
    {
      title: t('orgManage.orgName'),
      dataIndex: 'orgName',
      ellipsis: true,
    },
    {
      title: t('orgManage.joinTime'),
      dataIndex: 'joinTime',
      ellipsis: true,
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        return <Button type="link" onClick={() => setVisible(row)}>  {t('orgManage.nominationWithdrawal')}</Button>
      },
    },
  ]

  const confirm = () => {
    console.log(visible);
    // return
    history.push({
      pathname: "/OrgManage/nominationCommittee"
    })
    setVisible(false)
  }
  const query = () => {
    setTableData([{
      orgName: 'XXX'
    }])
  }


  useEffect(() => {
    query()
  }, [])

  return <div className="committee-list">
    <div className="list-title">
      <span className="title">{t('orgManage.committeeList')}</span>
      <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('orgManage.orgName')}`} />
    </div>
    <Table
      dataSource={tableData}
      columns={columns}
      rowKey={(record: any) => record.name}
      pagination={{
        current: curPage,
        defaultPageSize: pageSize,
        showSizeChanger: false,
        total: total,
        onChange: setCurPage,
      }}
    />
    <Modal
      title={t('common.tips')}
      centered
      visible={visible}
      onOk={() => confirm()}
      onCancel={() => setVisible(false)}
      okText={t('common.confirm')}
      cancelText={t('common.cancel')}
    >
      <div>
        <ExclamationCircleOutlined />     {t('orgManage.nominationWithdrawalTips')}?
      </div>
    </Modal>
  </div>
}


export default CommitteeList