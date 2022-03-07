import { FC, useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Input, Modal, Form } from 'antd'
import MyModal from '@com/MyModal'
import { dataNodeApi } from '@api/index'
import failedSvg from '@assets/images/11.icon1.svg'
import successSvg from '@assets/images/9.icon1.svg'
import { buttonDisabled } from '@/utils/utils'
import MyTag from '@com/MyTag'

const DataTable: FC<any> = (props: any) => {
  const [isModalVisible, SetIsModalVisible] = useState(false)
  const [show, SetShow] = useState(false)
  const [activeRow, setActiveRow] = useState({
    nodeName: "", nodeId: ""
  })
  const [curName, SetCurName] = useState('')
  // const history = useHistory()
  const [tableData, tableDataSet] = useState<Array<any>>([])
  // const [tempTableData, tempTableDataSet] = useState<Array<any>>([])
  const [total, totalSet] = useState<number>(0)
  const [curPage, setCurPage] = useState<number>(1)
  const [curId, setCurId] = useState<string>('')
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation()
  // const [showNameStatus, showNameStatusSet] = useState<boolean>(false)
  // const [nameStatus, nameStatusSet] = useState<boolean>(false)

  const onPageChange = num => {
    setCurPage(num)
  }

  const pagination = {
    defaultCurPage: 1,
    current: 1,
    defaultPageSize: 10,
  }

  const initData = async () => {
    const res = await dataNodeApi.queryDatanodeList({
      keyword: props.searchText,
      pageNumber: curPage,
      pageSize: pagination.defaultPageSize,
    })
    if (res.status === 0) {
      const newTableData: any[] = []
      res.data.forEach((item) => {
        newTableData.push(({ ...item, 'isEdit': false }))
      })
      tableDataSet(newTableData)
      totalSet(res.total)
    }
  }

  useEffect(() => {
    initData()
  }, [props.searchText, curPage])

  const deleteFn = row => {
    SetCurName(row.nodeName)
    setCurId(row.nodeId)
    SetIsModalVisible(true)
  }
  const saveFn = () => {
    form?.validateFields().then(v => {
      dataNodeApi.updateDataNode({
        "nodeName": v?.nodeName,
        "nodeId": activeRow.nodeId,
      }).then(res => {
        if (res.status === 0) {
          message.success(`${t('tip.operationSucces')}`)
          initData()
          cancel()
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }

  const editName = (row) => {
    setActiveRow(row)
    SetShow(true)
    form!.setFieldsValue({
      nodeName: row?.nodeName,
    })
  }



  const cancel = () => {
    SetShow(false)
  }

  const columns = [
    {
      title: t('common.Num'),
      width: 80,
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('dataNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      width: 200,
      ellipsis: true
    },
    {
      title: t('common.status'),
      dataIndex: 'connStatus',
      width: 200,
      render: (text, record, index) => {
        return (
          <div className="status-box">
            {record.connStatus === 1 ? <img src={successSvg} alt="" /> : <img src={failedSvg} alt="" />}
            {record.connStatus === 1 ? (
              <span className="success_color">{t('common.connectSuccess')}</span>
            ) : (
              <span className="failed_color">{t('common.connectFailed')}</span>
            )}
          </div>
        )
      },
    },
    {
      title: t('common.ip'),
      dataIndex: 'ip',
      width: 300,
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            <div className="bottom8p">
              {t('dataNodeMgt.internal')}&nbsp;:&nbsp;{record.internalIp}
            </div>
            <div>
              {t('dataNodeMgt.external')}&nbsp;:&nbsp;{record.externalIp}
            </div>
          </div>
        )
      },
    },
    {
      title: t('common.port'),
      dataIndex: 'port',
      width: 300,
      render: (text, record, index) => {
        return (
          <div className="seedNode-edit-box ">
            <div className="bottom8p">
              {t('dataNodeMgt.internal')}&nbsp;:&nbsp;{record.internalPort}
            </div>
            <div>
              {t('dataNodeMgt.external')}&nbsp;:&nbsp;{record.externalPort}
            </div>
          </div>
        )
      },
    },
    {
      title: t('common.actions'),
      width: 150,
      dataIndex: 'actions',
      render: (text: any, record: any, index: any) => {
        return (
          <>
            <Space size={10} className="operation-box">
              <span className="pointer main_color btn" onClick={() => editName(record)}>
                {t('common.rename')}
              </span>
              {/* {record.connStatus === 0 ? (
                <span className="pointer main_color btn" onClick={() => deleteFn(record)}>
                  {t('common.delete')}
                </span>
              ) : (
                ''
              )} */}
            </Space>
          </>
        )
      },
    },
  ]
  if (buttonDisabled()) {
    columns.pop()
  }


  const handleOk = () => {
    dataNodeApi.deleteDatanode({ nodeId: curId }).then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.deleteSuccess')}`)
        SetIsModalVisible(false)
        initData()
      }
    })
  }
  const handleCancel = () => {
    SetIsModalVisible(false)
  }

  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={_ => _.nodeId}
        pagination={{ defaultCurrent: 1, showSizeChanger: false, total, onChange: onPageChange }}
      />
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
          {t('computeNodeMgt.confirmDelete')}:{curName}
        </p>
      </MyModal>
      <Modal
        visible={show}
        zIndex={2}
        onOk={saveFn}
        destroyOnClose={true}
        centered={true}
        onCancel={cancel}
        okText={t('common.submit')}
        cancelText={t('common.cancel')}
        title={t('node.ModifyNodeName')}>
        <Form
          name="basic"
          size="large"
          layout={"vertical"}
          preserve={false}
          form={form}
        >
          {/* <div className="form-group"> */}
          <Form.Item name="nodeName"
            label={t('dataNodeMgt.nodeName')}
            className="froup-item"
            rules={[{
              required: true,
              min: 4,
              max: 20,
              message: t('common.nodeNamingRulesTipe'),

            }]}>
            <Input
              className="form-box-input" placeholder={t('node.forSelfidentity')} />
          </Form.Item>
          {/* {
              showNameStatus ? nameStatus ? <MyTag margin={true} content={t('myData.availableName')} bgColor="#B7EB8F" color="#45B854" /> :
                <MyTag margin={true} content={t('myData.unavailableName')} bgColor="#FFA39E" color="#F45564" /> : ''
            } */}
          {/* </div> */}
          <Form.Item
            colon={false}
            style={{ marginTop: '10px' }}
            className="form-item"
          >
            <p>{t('DidApplication.SetYourOrgNameRules')}</p>
            <p>1.{t('DidApplication.SetYourOrgNameRulesItem1')}</p>
            <p>2.{t('DidApplication.SetYourOrgNameRulesItem2')}</p>
            <p>3.{t('DidApplication.SetYourOrgNameRulesItem3')}</p>
            <p>4.{t('DidApplication.SetYourOrgNameRulesItem4')}</p>
            <p>5.{t('common.nodeNamingRules5')}</p>
          </Form.Item>
        </Form>
      </Modal >
      <style>
        {`
          .form-group{
            align-items: flex-start;
          }
          .froup-item{flex:0 0 75%}
          .my-tag-box{
            margin-top: 58px !important;
            margin-left: 10px !important;
          }
        `}
      </style>
    </div>
  )
}

export default DataTable
