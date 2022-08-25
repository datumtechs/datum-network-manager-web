import { FC, useState, useEffect, useRef } from "react";
import { Table, Button, Segmented, message, Modal, Form, Radio, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import { useToDoContentStatus, useApplicationStatus, useProposalProgressStatus, useProposalStatus, useToDoContenttype, useProposalType } from '@utils/utils'
import { useHistory } from 'react-router-dom'

const CommitteeAffairs: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [text, setSearchText] = useState<any>()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const history = useHistory()
  const [segmentedValue, setSegmented] = useState<string | number>('getToDoList');
  const form = useRef<any>()

  const columns = (item): any[] => {
    const itemList = item == 'getMyProposalList' ? [
      {
        title: t('orgManage.proposalContent'),
        dataIndex: 'proposalContent',
        width: 260,
        render: (text, row) => useProposalType(row)
      },
      {
        title: t('orgManage.proposalApplicationOrganization'),
        dataIndex: 'proposalApplicationOrganization',
        ellipsis: true,
        render: (text, row) => row?.dynamicFields?.submitterName
      }
    ] : [//待办内容
      {
        title: t('orgManage.toDoContent'),
        dataIndex: 'toDoContent',
        width: 300,
        // 1-申请认证，101-提名加入提案，102-提名踢出提案
        render: (text, row) => useToDoContenttype(row)
      },
    ]
    const itemProposalProgressList = item == 'getMyProposalList' ? [{
      title: t('orgManage.proposalProgress'),
      dataIndex: 'proposalProgress',
      ellipsis: true,
      render: (text, row) => useProposalProgressStatus(row?.status) || text
    }] : [
      {
        title: t('orgManage.processingStatus'),
        dataIndex: 'processingStatus',
        ellipsis: true,
        render: (text, row) => useApplicationStatus(row?.processStatus) || text
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
        render: (text, row) => item == 'getMyProposalList' ? useProposalStatus(+row.type) : useToDoContentStatus(+row.type) || text
      },
      {
        title: t('computeNodeMgt.startTime'),
        dataIndex: 'startTime',
        ellipsis: true,
        render: (text, row) => item == 'getMyProposalList' ? row.createTime : text
      },
      ...itemProposalProgressList,
      {
        title: t('common.actions'),
        dataIndex: 'actions',
        render: (text: any, row: any, index: any) => {
          return <>
            <Button style={{ padding: '0 10px 0 0' }} type="link" onClick={() => details(row, item)}>  {t('orgManage.viewContent')}</Button>
            {
              item == 'getDoneList' && !row?.processStatus ?
                <Button style={{ padding: '0' }} type="link" onClick={() => handle(row)}>  {t('orgManage.handle')}</Button>
                : ''
            }
            {
              item == 'getMyProposalList' && !row?.status ?
                <Button style={{ padding: '0' }} type="link" onClick={() => retreat(row)}>  {t('orgManage.withdrawProposal')}</Button>
                : ""
            }
          </>
        },
      },
    ]
  }

  const handle = (row) => {
    Modal.confirm({
      icon: '',
      content: (
        <div>
          <Form
            colon={false}
            labelAlign="left"
            layout={'vertical'}
            ref={form}
          >
            <Form.Item
              label={t('orgManage.ApprovalComments')}
              name="result"
              rules={[{ required: true, message: `${t('center.pleaseSelect')}${t('orgManage.ApprovalComments')}` }]}
            >
              <Radio.Group >
                <Radio value={1}>{t('common.agree')}</Radio>
                <Radio value={2}>{t('common.noAgree')}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={t('orgManage.approvalPostscript')}
              name="remark"
              rules={[
                {
                  required: true,
                  validator: (rule, value, callback): any => {
                    if (!value) return callback(`${t('credential.pleaseEnter')}${t('orgManage.approvalPostscript')}`)
                    return callback()
                  },
                },
              ]}
            >
              <Input.TextArea
                onChange={e => form.current.setFieldsValue({ remark: e.target?.value.replace(/\s*/g, "") } || '')}
                maxLength={200} showCount></Input.TextArea>
            </Form.Item>
          </Form>
        </div>
      ),
      okText: t('common.submit'),
      cancelText: t('UserCenter.ModalCancel'),
      onOk(close) {
        const value = form.current.validateFields().then(values => {
          console.log(values);
          handleprocessTodo({
            id: row.id,
            "remark": values.remark,
            "result": values.result
          })
          close()
        })
        return close
      },
    });
  }

  const handleprocessTodo = (data) => {
    orgManage.processTodo(data).then(res => {
      const { status, data } = res
      if (status == 0) {
        message.success('task.success')
        query()
      }
    })
  }


  const details = (row, type) => {
    history.push({
      pathname: "/OrgManage/orgManageApplyDetails",
      state: {
        id: row.id,
        title: "certificationApplicationDetails",
        type: type
      }
    })
  }

  const retreat = (row) => {
    Modal.confirm({
      title: t('common.tips'),
      content: t('orgManage.opposeNomination'),
      okText: t('common.submit'),
      centered: true,
      cancelText: t('UserCenter.ModalCancel'),
      onOk(close) {
        orgManage.revokeProposal({ id: row.id }).then(res => {
          const { status, data } = res
          if (status == 0) {
            message.success('task.success')
            query()
          }
        })
      },
    });

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
  useEffect(() => {
    setSearchText('')
  }, [segmentedValue])

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