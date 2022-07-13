import { FC, useState, useEffect } from "react";
import { Table, Button, Segmented } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'

const CommitteeAffairs: FC<any> = () => {
  const { t } = useTranslation()
  const [text, setSearchText] = useState()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [segmentedValue, setSegmented] = useState<string | number>('myHandling');

  const columns = (item): any[] => {
    const itemList = item == 'myProposal' ? [{
      title: t('orgManage.proposalApplicationOrganization'),
      dataIndex: 'proposalApplicationOrganization',
      ellipsis: true,
    }] : []
    const itemProposalProgressList = item == 'myProposal' ? [{
      title: t('orgManage.proposalProgress'),
      dataIndex: 'proposalProgress',
      ellipsis: true,
    }] : [
      {
        title: t('orgManage.processingStatus'),
        dataIndex: 'processingStatus',
        ellipsis: true,
      }
    ]
    return [
      {
        title: t('common.Num'),
        render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
        width: 70,
        align: 'center',
      },
      {
        title: item == 'myHandling' ? t('orgManage.toDoContent') : t('orgManage.eventContent'),
        dataIndex: 'toDoContent',
        ellipsis: true,
      },
      ...itemList,
      {
        title: t('orgManage.type'),
        dataIndex: 'type',
        ellipsis: true,
      },
      {
        title: t('computeNodeMgt.startTime'),
        dataIndex: 'startTime',
        ellipsis: true,
      },
      ...itemProposalProgressList,
      {
        title: t('common.actions'),
        dataIndex: 'actions',
        render: (text: any, row: any, index: any) => {
          return item == 'myProposal' ?
            <>
              <Button type="link" onClick={() => retreat(row)}>  {t('orgManage.handle')}</Button>
              <Button type="link" onClick={() => retreat(row)}>  {t('orgManage.viewPublicity')}</Button>

            </> : <>
              <Button type="link" onClick={() => retreat(row)}>  {t('common.view')}</Button>
              <Button type="link" onClick={() => retreat(row)}>  {t('orgManage.withdrawProposal')}</Button>
            </>
        },
      },
    ]
  }

  const retreat = (row) => {
    console.log(row);

  }
  const query = () => {

  }


  useEffect(() => {
    query()
  }, [])

  return <div className="committee-list">
    <div className="list-title">
      <span className="title">{t('orgManage.committeeAffairs')}</span>

    </div>
    <div className="list-title">
      <Segmented className="segmented" options={[
        {
          label: <div>{t('orgManage.myHandling')}</div>,
          value: 'myHandling'
        },
        {
          label: <div>{t('orgManage.myProposal')}</div>,
          value: 'myProposal'
        }
      ]} value={segmentedValue} onChange={setSegmented} />
      <SearchBar onSearch={setSearchText} />
    </div>
    <Table
      dataSource={tableData}
      columns={columns(segmentedValue)}
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


export default CommitteeAffairs