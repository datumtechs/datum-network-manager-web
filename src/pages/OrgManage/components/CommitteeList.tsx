import { FC, useState, useEffect } from "react";
import { Table, Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { orgManage } from '@api/index'


const CommitteeList: FC<any> = (props) => {
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const [text, setSearchText] = useState()
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<any>([])
  const [activeRow, setActiveRow] = useState<any>({})

  const columns: any[] = [
    {
      title: t(`common.Num`),
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 70
    },
    {
      title: t('orgManage.orgName'),
      dataIndex: 'orgName',
      ellipsis: true,
      render: (text: any, row: any, index: any) => row.dynamicFields.identityName
    },
    {
      title: t('orgManage.joinTime'),
      dataIndex: 'joinTime',
      ellipsis: true,
      render: (text) => new Date(text).toLocaleString()
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        return <Button style={{ padding: 0 }} type="link" onClick={() => (setVisible(true), setActiveRow(row))}>  {t('orgManage.nominationWithdrawal')}</Button>
      },
    },
  ]

  const confirm = () => {
    // return
    history.push({
      pathname: "/OrgManage/nominationCommittee",
      state: {
        type: "out",
        identityId: activeRow.identityId
      }
    })
    setVisible(false)
  }

  const query = () => {
    orgManage.getAuthorityList({ keyword: text }).then(res => {
      const { status, data } = res
      if (status == 0) {
        console.log(data)
        setData(data)
      }
    })
  }

  useEffect(() => {
    query()
  }, [])
  useEffect(() => {
    query()
  }, [text])

  return <div className="committee-list">
    <div className="list-title">
      <span className="title">{t('orgManage.committeeList')}</span>
      <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('orgManage.orgName')}`} />
    </div>
    <Table
      className="com-table com-table-lr-padding"
      dataSource={data}
      columns={columns}
      rowKey={(record: any) => record.id}
      pagination={{
        current: curPage,
        defaultPageSize: pageSize,
        showSizeChanger: false,
        total: total,
        onChange: setCurPage,
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
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