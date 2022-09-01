import { FC, useState, useEffect } from "react";
import { Table, Button, message, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import {
  useApplicationStatus, useProposalProgressStatus, useHandlingOpinionsStatus,
  useProposalType, useToDoContenttype
} from '@utils/utils'
import { ArrowLeftOutlined } from '@ant-design/icons'
import ImgBGDefault from '@assets/images/voucher/default.svg'
import { filterTime } from '@utils/utils'

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
    orgManage[url]({ id }
    ).then(res => {
      const { status, data } = res
      if (status == 0 && data) {
        const claim = data?.claim && JSON.parse(data.claim) || {}
        data.newClaim = claim
        setData(data)
        let dataList: any[] = []
        if (type == 'generalOrganization-applyDetail' || type == 'getToDoList' && props?.location?.state?.status == 1 || type == 'getDoneList' && props?.location?.state?.status == 1) {
          dataList = [{
            left: t('orgManage.applicationInitiator'),
            right: t('orgManage.approvedBy'),
            ldata: data?.dynamicFields?.applyOrgName,
            rdata: data?.dynamicFields?.approveOrgName
          },
          {
            left: t('orgManage.applicationTime'),
            right: t('orgManage.approvalProgress'),
            ldata: filterTime(data.startTime),
            rdata: useApplicationStatus(data.status),
          },
          {
            left: t('orgManage.postscriptApplication'),
            right: t('orgManage.approvalTime'),
            ldata: data.applyRemark,
            rdata: filterTime(data.endTime)
          },
          {
            left: t('orgManage.approvalPostscript'),
            right: false,
            ldata: data.approveRemark,
            rdata: undefined
          },
          {
            left: '',
            ldata: "img",
            right: t('orgManage.postscriptToApplicationMaterials'),
            rdata: data.materialDesc
          }
          ]
        } else {//提案  退出
          const condition = data.type == 3 ? [
            {
              left: t('orgManage.ProposalDeadline'),
              right: false,
              ldata: filterTime(data?.dynamicFields?.autoQuitTime, true),
              rdata: undefined
            },
          ] : [
            {
              left: t('orgManage.proposalProgress'),
              right: t('orgManage.ProposalDeadline'),
              ldata: data.voteAgreeNumber == null ? '--' : `${data.voteAgreeNumber} / ${data.authorityNumber}`,
              rdata: filterTime(data?.dynamicFields?.voteEndTime, true)
            },
            {
              left: t('orgManage.ProposalResults'),
              right: t('orgManage.PostscriptProposal'),
              ldata: useHandlingOpinionsStatus(data?.status),
              rdata: data.remark
            },
            {
              left: '',
              ldata: "img",
              right: t('orgManage.postscriptToApplicationMaterials'),
              rdata: data.materialDesc
            }
          ]
          dataList = [{
            left: t('orgManage.sponsorProposal'),
            right: t('orgManage.proposalTime'),
            ldata: data?.dynamicFields?.submitterName,
            rdata: filterTime(data?.createTime),
          },
          {
            left: t('orgManage.proposalContent'),
            right: t('orgManage.proposalStatus'),
            ldata: useProposalType(data),
            rdata: useProposalProgressStatus(data.status),
          },
          ...condition
          ]
        }
        setTableData(dataList)
      }
    })
  }


  const columns = [{
    dataIndex: 'left',
    width: 300,
    onCell: (_) => {
      if (!_.right) return { colSpan: 2 };
      return {};
    },
    render: (text, row) => <>
      <p style={{ fontWeight: 600 }}>{text ? text : ""}</p>
      {row.ldata == 'img' ?
        <Image style={{ maxWidth: '100%' }} src={filterImgurl()} fallback={ImgBGDefault} /> : row.ldata || '-'}
    </>
  },
  {
    dataIndex: 'right',
    width: 300,
    valign: 'top',
    onCell: _ => {
      if (!_.right) return { colSpan: 0 };
      return {};
    },
    render: (text, row) => {
      return <div style={{ height: '100%' }}>
        <p style={{ fontWeight: 600 }}>{text ? t(text) : ""}</p>
        {row.rdata || '-'}
      </div>
    }
  },]


  const filterImgurl = () => {
    if (!data?.dynamicFields?.pinataGateway) return ''
    const pinataGateway = data?.dynamicFields?.pinataGateway
    let imageUrl = data?.material
    imageUrl = imageUrl && imageUrl.replace('ipfs://', '')
    if ((pinataGateway.length - 1) == pinataGateway.lastIndexOf('/')) return `${pinataGateway}ipfs/${imageUrl}`
    return `${pinataGateway}/ipfs/${imageUrl}`
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
        type == 'getToDoList' ? status !== 1 ? <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ProposalDetails`)}</span> :
          <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.ApplicationDetails`)}</span> : ''
      }
      {
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
      rowKey={(row: any) => row.right || row.left}
      rowClassName={_ => "posti-unset"}
      pagination={false}
    />
  </div>
}


export default OrgManageApplyDetails