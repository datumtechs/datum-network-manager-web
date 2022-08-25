import { FC, useState, useEffect } from "react";
import { Table, Button, message, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import { useApplicationStatus, useProposalProgressStatus, useProposalType, useToDoContenttype } from '@utils/utils'


const OrgManageApplyDetails: FC<any> = (props) => {
  const { t, i18n } = useTranslation()
  const [tableData, setTableData] = useState<any[]>([])
  const [data, setData] = useState<any>({})

  const query = () => {
    // setTableData([{ applicationProgress: "xxx" }])
    const { type, id } = props?.location?.state

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
      if (status == 0) {
        // console.log(data)
        const claim = data.claim && JSON.parse(data.claim) || {}
        data.newClaim = claim
        setData(data)
        setTableData([{
          left: type == 'generalOrganization-applyDetail' ? t('orgManage.applicationInitiator') : t('orgManage.sponsorProposal'),
          right: type == 'generalOrganization-applyDetail' ? t('orgManage.approvedBy') : t('orgManage.proposalTime'),
          ldata: type == 'generalOrganization-applyDetail' ? data.approveOrg : type == 'getMyProposalList' ? data?.dynamicFields?.submitterName : data?.dynamicFields?.applyOrgName,
          rdata: type == 'generalOrganization-applyDetail' ? data.applyOrg : type == 'getMyProposalList' ? data?.createTime : data?.startTime,
        },
        {
          left: type == 'generalOrganization-applyDetail' ? t('orgManage.applicationTime') : t('orgManage.proposalContent'),
          right: type == 'generalOrganization-applyDetail' ? t('orgManage.approvalProgress') : t('orgManage.proposalStatus'),
          ldata: type == "generalOrganization-applyDetail" ? data.startTime : type == 'getMyProposalList' ? useProposalType(data) : useToDoContenttype({ ...data, type: data.status }),
          rdata: type == "generalOrganization-applyDetail" ? useApplicationStatus(data.progress) : useProposalProgressStatus(data.status),//这里需要特殊处理   我的待办  和我的提案状态不一致
        },
        {
          left: type == 'generalOrganization-applyDetail' ? t('orgManage.postscriptApplication') : t('orgManage.proposalProgress'),
          right: type == 'generalOrganization-applyDetail' ? t('orgManage.approvalTime') : t('orgManage.ProposalDeadline'),
          ldata: type == 'generalOrganization-applyDetail' ? data.applyRemark : "",
          rdata: type == 'generalOrganization-applyDetail' ? data.endTime : type == 'getMyProposalList' ? data?.dynamicFields?.voteEndTime : data.endTime,//提案进度问题
        },
        {
          left: type == 'generalOrganization-applyDetail' ? t('orgManage.approvalPostscript') : t('orgManage.ProposalResults'),
          right: type == 'generalOrganization-applyDetail' ? false : t('orgManage.PostscriptProposal'),
          ldata: type == 'generalOrganization-applyDetail' ? data.approveRemark : useProposalProgressStatus(data?.status),
          rdata: type == 'generalOrganization-applyDetail' ? undefined : data.remark
        },
        {
          left: '',
          rdata: 'img',
          right: t('orgManage.postscriptToApplicationMaterials'),
          ldata: "img"
        }
        ])
      }
    })
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
      {row.ldata ? row.rdata == 'img' ? <Image
        src={filterImgurl()}
      /> : row.ldata : row.ldata == 0 ? 0 : '-'}
    </>
  },
  {
    dataIndex: 'right',
    width: 300,
    onCell: (_, index) => {
      if (!_.right) {
        return { colSpan: 0 };
      }
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
    const imageUrl = data?.material
    if ((pinataGateway.length - 1) == pinataGateway.lastIndexOf('/')) {
      return `${pinataGateway}ipfs/${imageUrl && imageUrl.replace('ipfs://', '') || ''}`
    }
    return `${pinataGateway}/ipfs/${imageUrl && imageUrl.replace('ipfs://', '') || ''}`
    // return ''
  }

  useEffect(() => {
    query()
  }, [])

  return <div className="layout-box p-20 nomination-committee">
    <div className="list-title" style={{ paddingBottom: '20px' }}>
      <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.certificationApplicationDetails`)}</span>
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