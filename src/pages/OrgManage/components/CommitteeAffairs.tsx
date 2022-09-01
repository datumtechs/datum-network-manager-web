import { FC, useState, useEffect, useRef } from "react";
import { Table, Button, Segmented, message, Modal, Form, Radio, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import UsFilterTime from '@com/UsFilterTime'
import {
  ExclamationCircleTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone
} from '@ant-design/icons'
import { orgManage } from '@api/index'
import {
  useToDoContentStatus, useProcessStatus,
  useProposalProgressStatus, useProposalStatus, useToDoContenttype, useProposalType
} from '@utils/utils'
import { useHistory } from 'react-router-dom'

const CommitteeAffairs: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const [text, setSearchText] = useState<any>()
  const [tableData, setTableData] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [tableLoading, setTableLoading] = useState(false)
  const [retreatModal, setRetreatModal] = useState(false)
  const [ModalLoading, setModalLoading] = useState(false)
  const [activeRow, setActiveRow] = useState<any>({})
  const history = useHistory()
  const [segmentedValue, setSegmented] = useState<string | number>('getToDoList');
  const form = useRef<any>()
  const seatchRef = useRef<any>()



  const columns = (item): any[] => {
    const itemList = item == 'getMyProposalList' ? [
      {
        title: t('orgManage.proposalContent'),
        dataIndex: 'proposalContent',
        width: 260,
        render: (text, row) => <span className="ant-btn-link" onClick={() => details(row, item)}>{useProposalType(row)}</span>
      },
      {
        title: t('orgManage.proposalApplicationOrganization'),
        dataIndex: 'proposalApplicationOrganization',
        ellipsis: true,
        render: (text, row) => row?.dynamicFields?.submitterName
      }
    ] : [
      {
        title: t('orgManage.toDoContent'),
        dataIndex: 'toDoContent',
        width: 300,
        render: (text, row) => <span className="ant-btn-link" onClick={() => details(row, item)}>{useToDoContenttype(row)}</span>
      },
    ]
    const itemProposalProgressList = item == 'getMyProposalList' ? [{
      title: t('orgManage.proposalProgress'),
      dataIndex: 'proposalProgress',
      ellipsis: true,
      render: (text, row) => useProposalProgressStatus(row?.status)
    }] : [
      {
        title: item == 'getDoneList' ? t('orgManage.HandlingOpinions') : t('orgManage.processingStatus'),
        dataIndex: 'processingStatus',
        ellipsis: true,
        render: (text, row) => <>
          {row?.processStatus == 0 ? <ExclamationCircleTwoTone twoToneColor='#ffbc00' /> :
            row?.processStatus == 1 ? < CheckCircleTwoTone twoToneColor="#52c41a" /> :
              row?.processStatus == 2 ? <CloseCircleTwoTone twoToneColor="#c70e0e" /> : ''
          }&nbsp;&nbsp;
          {useProcessStatus(row?.processStatus)}
        </>
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
        render: (text, row) => <UsFilterTime isStamp={false} time={item == 'getMyProposalList' ? row.createTime : text} />
      },
      ...itemProposalProgressList,
      {
        title: t('common.actions'),
        dataIndex: 'actions',
        render: (text: any, row: any) => {
          return <>
            <Button style={{ padding: '0 10px 0 0' }} type="link" onClick={() => details(row, item)}>  {t('orgManage.viewContent')}</Button>
            {
              item == 'getToDoList' && ((row.type == 101 || row.type == 102) && row?.dynamicFields?.proposalStatus == 1 || row.type == 1 && row?.processStatus == 0) ?
                <Button style={{ padding: '0' }} type="link" onClick={() => handle(row)}>  {t('orgManage.handle')}</Button>
                : ''
            }
            {
              item == 'getMyProposalList' && (!row?.status || row?.status == 5) ?
                <Button style={{ padding: '0' }} type="link" onClick={() => (setRetreatModal(true), setActiveRow(row))}>  {t('orgManage.withdrawProposal')}</Button>
                : ""
            }
          </>
        },
      },
    ]
  }

  const handle = (row) => {
    Modal.confirm({
      title: t('common.tips'),
      icon: '',
      centered: true,
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
        message.success(t('task.success'))
        query()
      }
    })
  }


  const details = (row, type) => {
    let status = ''
    if (row.type == 1 && (type == "getToDoList" || type == 'getDoneList')) {
      status = row.type
    }
    history.push({
      pathname: "/OrgManage/orgManageApplyDetails",
      state: {
        id: row.id,
        title: "certificationApplicationDetails",
        type,
        status,
      }
    })
  }

  const retreat = (row) => {
    setModalLoading(true)
    setRetreatModal(false)
    orgManage.revokeProposal({ id: activeRow.id }).then(res => {
      const { status } = res
      if (status == 0) {
        message.success(t('task.success'))
        setActiveRow('')
        query()
      }
      setModalLoading(false)
    })
  }

  const onCancel = (row) => {
    setActiveRow('')
    setRetreatModal(false)
    setModalLoading(false)
  }
  const query = () => {
    setTableLoading(true)
    setTableData([])
    orgManage[segmentedValue]({ pageSize, pageNumber: curPage, keyword: text }).then(res => {
      const { status, data } = res
      if (status == 0) {
        setTableData(data)
        setTotal(res.total)
      }
      setTableLoading(false)
    })
  }


  useEffect(() => {
    query()
  }, [])

  useEffect(() => {
    query()
  }, [segmentedValue, text, curPage])

  useEffect(() => {
    setSearchText('')
    console.log(seatchRef.current);

    setCurPage(1)
  }, [segmentedValue])

  return <div className="committee-list" style={{ marginTop: '5px' }}>
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
      <SearchBar key={segmentedValue} onSearch={setSearchText} ref={seatchRef} />
    </div>
    <Table
      className="com-table com-table-lr-padding"
      dataSource={tableData}
      loading={tableLoading}
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
    <Modal
      title={t('common.tips')}
      okText={t('common.submit')}
      centered
      visible={retreatModal}
      confirmLoading={ModalLoading}
      cancelText={t('UserCenter.ModalCancel')}
      onOk={retreat}
      onCancel={onCancel}
    >
      {t('orgManage.opposeNomination')}
    </Modal>
  </div>
}


export default CommitteeAffairs