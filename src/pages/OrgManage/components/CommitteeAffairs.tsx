import { FC, useState, useEffect } from "react";
import { Table, Button, Segmented, message } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import { useToDoContentStatus } from '@utils/utils'

const CommitteeAffairs: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [text, setSearchText] = useState()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [segmentedValue, setSegmented] = useState<string | number>('geetToDoList');

  const columns = (item): any[] => {
    const itemList = item == 'getMyProposalList' ? [
      {
        title: t('orgManage.proposalContent'),
        dataIndex: 'proposalContent',
        ellipsis: true,
      },
      {
        title: t('orgManage.proposalApplicationOrganization'),
        dataIndex: 'proposalApplicationOrganization',
        ellipsis: true,
      }
    ] : [
      {
        title: t('orgManage.toDoContent'),
        dataIndex: 'toDoContent',
        ellipsis: true,
        render: (text, row) => useToDoContentStatus(+text)
      },
    ]
    const itemProposalProgressList = item == 'getMyProposalList' ? [{
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
        title: t(`common.Num`),
        render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
        width: 60,
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
    orgManage[segmentedValue]({ pageSize, pageNumber: curPage, keyword: text }).then(res => {
      const { status, data } = res
      if (status == 0) {
        setTableData(data)
      }
    })
  }


  useEffect(() => {
    query()
  }, [])

  useEffect(() => {
    query()
  }, [segmentedValue, text])

  return <div className="committee-list">
    <div className="list-title">
      <span className="title">{t('orgManage.committeeAffairs')}</span>

    </div>
    <div className="list-title">
      <Segmented className="segmented" options={[
        {
          label: <div>{t('orgManage.myToDoList')}</div>,
          value: 'geetToDoList'
        },
        {
          label: <div>{t('orgManage.myDoneList')}</div>,
          value: 'getDoneList'
        },
        {
          label: <div>{t('orgManage.myProposal')}</div>,
          value: 'getMyProposalList'
        }
      ]} value={segmentedValue} onChange={setSegmented} />
      <SearchBar onSearch={setSearchText} />
    </div>
    <Table
      className="com-table com-table-lr-padding"
      dataSource={tableData}
      columns={columns(segmentedValue)}
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


export default CommitteeAffairs