import { FC, useState, useEffect } from "react";
import { Table, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'

const Application: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [text, setSearchText] = useState()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const columns: any[] = [
    {
      title: ` `,
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 70,
      className: "no-right-border"
    },
    {
      title: t('orgManage.certificationOrganization'),
      dataIndex: 'certificationOrganization',
      ellipsis: true,
    },
    {
      title: t('orgManage.timeInitiationCertification'),
      dataIndex: 'timeInitiationCertification',
      ellipsis: true,
    },
    {
      title: t('orgManage.applicationProgress'),
      dataIndex: 'applicationProgress',
      ellipsis: true,
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        return <>
          <Button style={{ padding: 0, paddingRight: '10px' }} type="link" onClick={() => retreat(row)}>  {t('orgManage.viewPublicity')}</Button>
          <Button style={{ padding: 0 }} type="link" onClick={() => retreat(row)}>  {t('orgManage.downloadCertificate')}</Button>
        </>
      },
    },
  ]

  const retreat = (row) => {
    console.log(row);

  }
  const query = () => {
    setTableData([{ applicationProgress: "xxx" }])
  }


  useEffect(() => {
    query()
  }, [])

  return <div className="committee-list">
    <div className="list-title" style={{ paddingBottom: '20px' }}>
      <span className="title">{t('orgManage.myApplication')}</span>
    </div>
    <Table
      className="com-table"
      dataSource={tableData}
      columns={columns}
      rowKey={(record: any) => record.name}
      pagination={{
        current: curPage,
        defaultPageSize: pageSize,
        showSizeChanger: false,
        total: total,
        onChange: setCurPage,
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
      }}
    />
  </div>
}


export default Application