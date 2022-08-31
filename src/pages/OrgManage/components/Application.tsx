import { FC, useState, useEffect } from "react";
import { Table, Button, message, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import { useApplicationStatus } from '@utils/utils'
import { useHistory } from 'react-router-dom'

const Application: FC<any> = (props) => {
  const { t, i18n } = useTranslation()
  const [text, setSearchText] = useState()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const history = useHistory()

  const columns: any[] = [
    {
      title: t(`common.Num`),
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 60,
    },
    {
      title: t('orgManage.certificationOrganization'),
      dataIndex: 'applyOrg',
      ellipsis: true,
      render: (text, row) => row?.dynamicFields?.approveOrgName || '-'
    },
    {
      title: t('orgManage.timeInitiationCertification'),
      dataIndex: 'startTime',
      render: (text) => new Date(text).toLocaleString()
    },
    {
      title: t('orgManage.applicationProgress'),
      dataIndex: 'progress',
      ellipsis: true,
      render: (text) => useApplicationStatus(text)
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      render: (text: any, row: any) => {
        return <>
          <Button style={{ padding: 0, }} type="link" onClick={() => details(row)}>  {t('computeNodeMgt.detail')}</Button>
          {
            +row.progress == 1 ? <Button style={{ padding: '0  0 0 10px' }} type="link" onClick={() => download(row)}>  {t('orgManage.downloadCertificate')}</Button> : ''}
          {
            !props.parentData.isAuthority && row.progress == 1 ?
              <Button style={{ paddingRight: '10px' }} type="link" onClick={() => useCertificate(row)}>  {t('orgManage.UseCertificate')}</Button> : ''
          }
        </>
      },
    },
  ]

  const details = (row) => {
    history.push({
      pathname: "/OrgManage/orgManageApplyDetails",
      state: {
        id: row.id,
        title: "certificationApplicationDetails",
        type: "generalOrganization-applyDetail"
      }
    })
  }

  const download = (row, type?: string) => {
    orgManage.postDownload({ id: row.id }).then(res => {
      if (res.name && type == 'Refresh') return query()
      if (res.data && res.name) {
        const name = res.name.split('attachment;')[1].split('filename=')[1]
        const file = new File([res.data], name, { type: "application/octet-stream" })
        const createUrl = window.URL.createObjectURL(file)
        const link = document.createElement('a')
        link.style.display = "none"
        link.href = createUrl
        link.download = name + '.';
        link.setAttribute('target', '_blank')
        document.body.append(link)
        link.click()
        document.body.removeChild(link)
      }
    })
  }

  const useCertificate = (row) => {
    orgManage.useCertificate({ id: row.id }).then(res => {
      const { status } = res
      if (status == 0) {
        message.success('task.success')
        query()
        props.query()
      }
    })
  }


  const query = () => {
    orgManage.getgenerAlapplyList({ pageNumber: curPage, pageSize: pageSize }).then(res => {
      const { status, data } = res
      if (status == 0) {
        setTableData(data)
        setTotal(res.total)
      }
    })
  }


  useEffect(() => {
    query()
  }, [])

  return <div className="committee-list">
    <div className="list-title" style={{ paddingBottom: '20px' }}>
      <span className="title">{t('orgManage.myApplication')}</span>
    </div>
    <Table
      className="com-table com-table-lr-padding"
      dataSource={tableData}
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
  </div>
}


export default Application