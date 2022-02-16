import { FC, useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Space, message, Input, Modal, Form } from 'antd'
import MyModal from '@com/MyModal'
import { computeNodeApi } from '@api/index'
import { BaseInfoContext } from '@/layout/index'
import UseStatus from '@hooks/useComputeStatus'
import { Row } from '@/entity/index'
import { changeSizeFn, buttonDisabled } from '@utils/utils'
import './scss/index.scss'

// 节点状态，-1: 未被调度服务连接上; 0: 连接上; 1: 算力启用<计算服务>; 2: 算力被占用(计算服务算力正在被任务占用)',

const DataTable: FC<any> = (props: any) => {
  const [isModalVisible, SetIsModalVisible] = useState(false),
    [form] = Form.useForm(),
    [show, setShow] = useState(false),
    [modalType, SetModalType] = useState(''),
    [curName, SetCurName] = useState(''),
    [total, totalSet] = useState<number>(0),
    history = useHistory(),
    [tableData, tableDataSet] = useState<Array<any>>([]),
    [curPage, setCurPage] = useState<number>(1),
    baseInfo = useContext(BaseInfoContext),
    [curId, curIdSet] = useState<string>(''),
    { t } = useTranslation(),
    [curRow, setCurRow] = useState<Row>({
      core: '',
      memory: '',
      bandwidth: '',
      remarks: '',
    }),
    [activeRow, setActiveRow] = useState({
      nodeName: "", nodeId: ""
    })

  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }

  const onPageChange = num => {
    setCurPage(num)
  }


  const initTable = async () => {
    const res = await computeNodeApi.queryPowerNodeList({
      identityId: baseInfo?.identityId,
      keyword: props.searchText,
      pageNumber: curPage,
      pageSize: pagination.defaultPageSize,
    })
    if (res.status === 0) {
      const newTableData: any[] = []
      tableDataSet(res.data)
      totalSet(res.total)
    }
  }

  useEffect(() => {
    initTable()
  }, [props.searchText, curPage])


  const operation = (row, type) => {
    SetCurName(row.nodeName)
    SetModalType(type)
    SetIsModalVisible(true)
    curIdSet(row.nodeId)
    if (type === 'view') {
      setCurRow(row)
    }
  }

  const viewInfo = row => {
    history.push({
      pathname: '/nodeMgt/computeNodeMgt/computeNodeDetail',
      state: {
        id: row.nodeId,
        name: row.nodeName,
        // identityId: row.identityId
      },
    })
  }
  // const editFn = row => { }

  const renameNode = (record) => {
    setActiveRow(record)
    setShow(true)

    form!.setFieldsValue({
      nodeName: record?.nodeName,
    })
  }



  const columns = [
    {
      title: t('common.Num'),
      dataIndex: 'id',
      render: (text, record, index) => `${(curPage - 1) * pagination.defaultPageSize + (index + 1)}`,
      width: 40,
    },
    {
      title: t('computeNodeMgt.nodeName'),
      dataIndex: 'nodeName',
      width: 80,
      ellipsis: true
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      width: 80,
      render: (text, record, index) => {
        /**
         * 连接状态 connStatus 0 1
         * 算力节点状态 0 未知 1 未启用 2 空闲(已启用) 3 占用(已启用) 4:已撤销
         */
        const { img, content } = UseStatus(record.connStatus, record.powerStatus)
        return (
          <div className="status-box">
            <img src={img} alt="" />
            <span>{content}</span>
          </div>
        )
      },
    },
    {
      title: t('common.ip'),
      dataIndex: 'ip',
      width: 110,
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
      width: 100,
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
      width: 100,
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        return (
          <Space size={10} className="operation-box">
            {row.connStatus === 0 ? (
              <>
                <Space size={10}>
                  {
                    buttonDisabled() ? '' :
                      <span className="btn pointer main_color" onClick={() => renameNode(row)}>
                        {t('common.rename')}
                      </span>
                  }
                </Space>
              </>
            ) : (
              <></>
            )}
            {row.connStatus === 1 && (row.powerStatus === 1 || row.powerStatus === 4) ? (
              <>
                <Space size={10}>
                  {
                    buttonDisabled() ? '' :
                      <>
                        <span className="btn pointer main_color" onClick={() => renameNode(row)}>
                          {t('common.rename')}
                        </span>
                      </>
                  }
                  <span className="btn pointer main_color" onClick={() => operation(row, 'view')}>
                    {t('common.view')}
                  </span>
                  <span className="btn pointer main_color" onClick={() => operation(row, 'enable')}>
                    {t('common.enable')}
                  </span>
                </Space>
                {/* )} */}

              </>
            ) : ''}
            {row.connStatus === 1 && row.powerStatus === 2 ? (
              <>
                <span className="btn pointer" onClick={() => operation(row, 'view')}>
                  {t('common.view')}
                </span>
                <span className="btn pointer" onClick={() => operation(row, 'disable')}>
                  {t('common.disable')}
                </span>
              </>
            ) : ''
            }
            {row.connStatus == 1 && (row.powerStatus === 6 || row.powerStatus === 5) ? (
              <>
                <span className="btn pointer" onClick={() => operation(row, 'view')}>
                  {t('common.view')}
                </span>
              </>
            ) : ''
            }
            {row.connStatus === 1 && row.powerStatus === 3 ? <span className="btn pointer" onClick={() => viewInfo(row)}>
              {t('common.viewNodeInfo')}
            </span> : ''}
          </Space>
        )
      },
    },
  ]

  const handleOk = () => {
    if (modalType === 'delete') {
      computeNodeApi.deletePowerNode({ powerNodeId: curId }).then(res => {
        if (res.status === 0) {
          SetIsModalVisible(false)
          message.success(`${t('tip.operationSucces')}`)
          initTable()
        }
      })
    } else if (modalType === 'enable') {
      computeNodeApi.publishPower({ powerNodeId: curId }).then(res => {
        if (res.status === 0) {
          message.success(`${t('tip.operationSucces')}`)
          initTable()
        }
      }).finally(() => {
        SetIsModalVisible(false)
      })
    } else if (modalType === 'disable') {
      computeNodeApi.revokePower({ powerNodeId: curId }).then(res => {
        if (res.status === 0) {
          SetIsModalVisible(false)
          message.success(`${t('tip.operationSucces')}`)
          initTable()
        }
      })
    } else if (modalType === 'view') {
      SetIsModalVisible(false)
    }
  }
  const handleCancel = () => {
    SetIsModalVisible(false)
  }

  const saveFn = () => {
    form?.validateFields().then(v => {
      computeNodeApi.updatePowerNode({
        "nodeName": v?.nodeName,
        "nodeId": activeRow.nodeId,
      }).then(res => {
        if (res.status === 0) {
          message.success(`${t('tip.operationSucces')}`)
          initTable()
          cancel()
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }
  const cancel = () => {
    setShow(false)
  }


  return (
    <div className="data-table-box">
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={_ => _.nodeId}
        scroll={{ x: 990 }}
        pagination={{ defaultCurrent: 1, showSizeChanger: false, total, onChange: onPageChange }}
      />
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {modalType === 'delete' ? (
          <p>
            {t('computeNodeMgt.confirmDelete')}:{curName}
          </p>
        ) : (
          ''
        )}
        {modalType === 'view' ? (
          <div className="simple-info-box">
            <p>
              <span className="title">CPU:</span>
              <span>
                {curRow.core} {`${t('overview.core')}`}
              </span>
            </p>
            <p>
              <span className="title">{t('overview.memory')}:</span>
              <span>{changeSizeFn(Number(curRow.memory))}</span>
            </p>
            <p>
              <span className="title">{t('overview.bandwidth')}:</span>
              <span>{`${changeSizeFn(Number(curRow.bandwidth))}P/S`}</span>
            </p>
          </div>
        ) : (
          ''
        )}
        {modalType === 'disable' ? (
          <p>
            {t('computeNodeMgt.confirmDisable')}:{curName}
          </p>
        ) : (
          ''
        )}
        {modalType === 'enable' ? (
          <p>
            {t('computeNodeMgt.confirmEnable')}:{curName}
          </p>
        ) : (
          ''
        )}
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
            label={t('computeNodeMgt.nodeName')}
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
            }
          </div> */}
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
