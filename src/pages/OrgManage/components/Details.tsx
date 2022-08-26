import { FC, useState, useEffect } from "react";
import { Table, Button, message, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import { useApplicationStatus, useProposalProgressStatus, useProposalType, useToDoContenttype } from '@utils/utils'
import { ArrowLeftOutlined } from '@ant-design/icons'

const OrgManageApplyDetails: FC<any> = (props) => {
  const { t, i18n } = useTranslation()
  const [tableData, setTableData] = useState<any[]>([])
  const [data, setData] = useState<any>({})
  const { type, id, status } = props?.location?.state

  const query = () => {
    // setTableData([{ applicationProgress: "xxx" }])
    let url = ''
    if (type == 'generalOrganization-applyDetail') url = 'getApplyDetails'
    if (type == 'getToDoList') url = 'gettodoDetail'
    if (type == 'getDoneList') url = 'getdoneDetail'
    if (type == 'getMyProposalList') url = 'getproposalDetail'
    if (!url) return history.go(-1), message.error(t('exception.-32602'))
    // debugger
    orgManage[url]({ id }
    ).then(res => {
      const { status, data } = res
      if (status == 0 && data) {
        // console.log(data)
        const claim = data?.claim && JSON.parse(data.claim) || {}
        data.newClaim = claim
        setData(data)
        let dataList: any[] = []
        if (type == 'generalOrganization-applyDetail' || type == 'getToDoList' && props?.location?.state?.status == 1 || type == 'getDoneList' && props?.location?.state?.status == 1) {
          dataList = [{
            left: t('orgManage.applicationInitiator'),
            right: t('orgManage.approvedBy'),
            ldata: data.approveOrg,
            rdata: data.applyOrg
          },
          {
            left: t('orgManage.applicationTime'),
            right: t('orgManage.approvalProgress'),
            ldata: data.startTime,
            rdata: useApplicationStatus(data.progress),
          },
          {
            left: t('orgManage.postscriptApplication'),
            right: t('orgManage.approvalTime'),
            ldata: data.applyRemark,
            rdata: data.endTime
          },
          {
            left: t('orgManage.approvalPostscript'),
            right: false,
            ldata: data.approveRemark,
            rdata: undefined
          },
          {
            left: '',
            rdata: 'img',
            right: t('orgManage.postscriptToApplicationMaterials'),
            ldata: "img"
          }
          ]
        } else {
          dataList = [{
            left: t('orgManage.sponsorProposal'),
            right: t('orgManage.proposalTime'),
            ldata: data?.dynamicFields?.submitterName,
            rdata: new Date(data?.createTime).toLocaleString(),
          },
          {
            left: t('orgManage.proposalContent'),
            right: t('orgManage.proposalStatus'),
            ldata: useProposalType(data),
            rdata: useProposalProgressStatus(data.status, 'details'),
          },
          {
            left: t('orgManage.proposalProgress'),
            right: t('orgManage.ProposalDeadline'),
            ldata: `${data.voteAgreeNumber} / ${data.authorityNumber}`,
            rdata: new Date(+(String(data?.dynamicFields?.voteEndTime) + '000')).toLocaleString()
          },
          {
            left: t('orgManage.ProposalResults'),
            right: t('orgManage.PostscriptProposal'),
            ldata: filterStatus(data?.status),
            rdata: data.remark
          },
          {
            left: '',
            rdata: 'img',
            right: t('orgManage.postscriptToApplicationMaterials'),
            ldata: "img"
          }
          ]
        }
        setTableData(dataList)
        //   [{
        //   left: type == 'generalOrganization-applyDetail' ? t('orgManage.applicationInitiator') : t('orgManage.sponsorProposal'),
        //   right: type == 'generalOrganization-applyDetail' ? t('orgManage.approvedBy') : t('orgManage.proposalTime'),
        //   ldata: type == 'generalOrganization-applyDetail' ? data.approveOrg : type == 'getMyProposalList' ? data?.dynamicFields?.submitterName : data?.dynamicFields?.applyOrgName,
        //   rdata: type == 'generalOrganization-applyDetail' ? data.applyOrg : type == 'getMyProposalList' ? new Date(data?.createTime).toLocaleString() : new Date(data?.startTime).toLocaleString(),
        // },
        // {
        //   left: type == 'generalOrganization-applyDetail' ? t('orgManage.applicationTime') : t('orgManage.proposalContent'),
        //   right: type == 'generalOrganization-applyDetail' ? t('orgManage.approvalProgress') : t('orgManage.proposalStatus'),
        //   ldata: type == "generalOrganization-applyDetail" ? data.startTime : type == 'getMyProposalList' ? useProposalType(data) : useToDoContenttype({ ...data, type: data.status }),
        //   rdata: type == "generalOrganization-applyDetail" ? useApplicationStatus(data.progress) : useProposalProgressStatus(data.status),//这里需要特殊处理   我的待办  和我的提案状态不一致
        // },
        // {
        //   left: type == 'generalOrganization-applyDetail' ? t('orgManage.postscriptApplication') : t('orgManage.proposalProgress'),
        //   right: type == 'generalOrganization-applyDetail' ? t('orgManage.approvalTime') : t('orgManage.ProposalDeadline'),
        //   ldata: type == 'generalOrganization-applyDetail' ? data.applyRemark : `${data.voteAgreeNumber} / ${data.authorityNumber}`,
        //   rdata: type == 'generalOrganization-applyDetail' ? data.endTime : type == 'getMyProposalList' ? new Date(+(String(data?.dynamicFields?.voteEndTime) + '000')).toLocaleString() : data.endTime,//提案进度问题
        // },
        // {
        //   left: type == 'generalOrganization-applyDetail' ? t('orgManage.approvalPostscript') : t('orgManage.ProposalResults'),
        //   right: type == 'generalOrganization-applyDetail' ? false : t('orgManage.PostscriptProposal'),
        //   ldata: type == 'generalOrganization-applyDetail' ? data.approveRemark : filterStatus(data?.status),
        //   rdata: type == 'generalOrganization-applyDetail' ? undefined : data.remark
        // },
        // {
        //   left: '',
        //   rdata: 'img',
        //   right: t('orgManage.postscriptToApplicationMaterials'),
        //   ldata: "img"
        // }
        // ])
      }
    })
  }

  const filterStatus = (status) => {
    if (status < 3) return t('orgManage.VotingProgress')
    if (status == 3) return t('task.success')
    if (status == 4) return t('task.failed')
    if (status > 4) return t('task.success')
  }

  const columns = [{
    dataIndex: 'left',
    width: 300,
    onCell: (_, index) => {
      if (!_.right) {
        return { colSpan: 2 };
      }
      return {};
    },
    render: (text, row) => <>
      <p style={{ fontWeight: 600 }}>{text ? text : ""}</p>
      {row.ldata ? row.rdata == 'img' ? <Image src={filterImgurl()} /> : row.ldata : row.ldata == 0 ? 0 : '-'}
    </>
  },
  {
    dataIndex: 'right',
    width: 300,
    onCell: (_, index) => {
      if (!_.right) return { colSpan: 0 };
      return {};
    },
    render: (text, row) => <>
      <p style={{ fontWeight: 600 }}>{text ? t(text) : ""}</p>
      {row.rdata ? row.rdata == 'img' ? data.materialDesc : row.rdata : row.rdata == 0 ? 0 : '-'}
    </>
  },]


  const filterImgurl = () => {
    if (!data?.dynamicFields?.pinataGateway) return ''
    const pinataGateway = data?.dynamicFields?.pinataGateway
    let imageUrl = data?.material
    imageUrl = imageUrl && imageUrl.replace('ipfs://', '')
    // const splitUrl = imageUrl.split('/')[0]
    const splitUrl = imageUrl
    if ((pinataGateway.length - 1) == pinataGateway.lastIndexOf('/')) {
      return `${pinataGateway}ipfs/${splitUrl}`
    }
    return `${pinataGateway}/ipfs/${splitUrl}`
    // return ''
  }

  useEffect(() => {
    query()
  }, [])

  return <div className="layout-box p-20 nomination-committee">
    <div className="list-title" style={{ paddingBottom: '20px' }}>
      <span className="title pointer" style={{ marginRight: '20px' }} onClick={() => history.go(-1)}><ArrowLeftOutlined /></span>
      {
        type == 'generalOrganization-applyDetail' ? <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ApplicationDetails`)}</span> : ''
      }
      {
        // type == 'getToDoList' ? status !== 1 ? <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.NominationDetails`)}</span> :
        type == 'getToDoList' ? status !== 1 ? <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ProposalDetails`)}</span> :
          <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ApplicationDetails`)}</span> : ''
      }
      {
        // type == 'getDoneList' ? status !== 1 ? <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.NominationDetails`)}</span> :
        type == 'getDoneList' ? status !== 1 ? <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ProposalDetails`)}</span> :
          <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ApplicationDetails`)}</span> : ""
      }
      {
        type == 'getMyProposalList' ? <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ProposalDetails`)}</span> : ""
      }
    </div>
    <Table
      dataSource={tableData}
      columns={columns}
      showHeader={false}
      bordered
      rowKey={(record: any) => record.id}
      pagination={false}
    />
  </div>
}


export default OrgManageApplyDetails