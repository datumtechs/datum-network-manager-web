import { FC, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Table, Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { orgManage } from '@api/index'


const CommitteeList: FC<any> = forwardRef((props: any, ref) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [text, setSearchText] = useState()
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<any>([])
  const [activeRow, setActiveRow] = useState<any>({})

  const columns: any[] = [
    {
      title: t(`common.Num`),
      render: (text, record, index) => index + 1,
      width: 70
    },
    {
      title: t('orgManage.orgName'),
      dataIndex: 'orgName',
      ellipsis: true,
      render: (text: any, row: any) => row.dynamicFields.identityName
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
      render: (text: any, row: any) => {
        if (row.identityId == props?.identityId?.identityId) return '-'
        if (!!row.isAdmin) return '-'
        return <Button style={{ padding: 0 }} type="link" onClick={() => (setVisible(true), setActiveRow(row))}>  {t('orgManage.nominationWithdrawal')}</Button>
      },
    },
  ]
  useImperativeHandle(ref, () => ({
    query
  }));

  const confirm = () => {
    setVisible(false)
    setTimeout(() => {
      history.push({
        pathname: "/OrgManage/nominationCommittee",
        state: {
          type: "out",
          identityId: activeRow.identityId
        }
      })
    }, 300)
  }

  const query = () => {
    orgManage.getAuthorityList({ keyword: text }).then(res => {
      const { status, data } = res
      if (status == 0) setData(data)
    })
  }

  useEffect(() => {
    query()
  }, [])

  useEffect(() => { query() }, [text])

  return <div className="committee-list" style={{ marginBottom: '30px' }}>
    <div className="list-title">
      <span className="title">{t('orgManage.committeeList')}</span>
      <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('orgManage.orgName')}`} />
    </div>
    <Table
      className="com-table com-table-lr-padding"
      dataSource={data}
      columns={columns}
      rowKey={(record: any) => record.id}
      pagination={false}
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
})


export default CommitteeList