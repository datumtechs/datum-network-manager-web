import { FC, useState, useEffect } from "react";
import { Table, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'

const Application: FC<any> = () => {
  const { t } = useTranslation()
  const [text, setSearchText] = useState()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const columns: any[] = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 70,
      align: 'center',
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
          <Button type="link" onClick={() => retreat(row)}>  {t('orgManage.viewPublicity')}</Button>
          <Button type="link" onClick={() => retreat(row)}>  {t('orgManage.downloadCertificate')}</Button>
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
    <div className="list-title">
      <span className="title">{t('orgManage.myApplication')}</span>
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
  </div>
}


export default Application