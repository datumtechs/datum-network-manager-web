import { FC, useState, useEffect } from "react";
import { Table, Button, Segmented, message } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import { useToDoContentStatus } from '@utils/utils'
import { useHistory } from 'react-router-dom'

const CommitteeAffairs: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [text, setSearchText] = useState()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const history = useHistory()
  const [segmentedValue, setSegmented] = useState<string | number>('getToDoList');

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
          return <>
            <Button type="link" onClick={() => details(row)}>  {t('orgManage.viewContent')}</Button>
            {
              item == 'getToDoList' ?
                <Button type="link" onClick={() => handle(row)}>  {t('orgManage.handle')}</Button>
                : ''
            }
            {
              item == 'getMyProposalList' ?
                <Button type="link" onClick={() => retreat(row)}>  {t('orgManage.handle')}</Button>
                : ''
            }
            {
              item == '自己提案' ?
                <Button type="link" onClick={() => retreat(row)}>  {t('orgManage.withdrawProposal')}</Button>
                : ""
            }
          </>
        },
      },
    ]
  }

  const handle = (row) => {
    console.log(row);
  }
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
    setTableData([])
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
          value: 'getToDoList'
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