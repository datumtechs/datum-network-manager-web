import { FC, useState, useEffect } from "react";
import { Button, Divider, message, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { orgManage } from '@api/index'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const CommitteeStatistics: FC<any> = (props) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [data, setData] = useState<any>({})
  const { isAdmin } = props
  const [visible, setVisible] = useState(false)

  const query = () => {
    orgManage[+isAdmin == 1 ? 'getAuthorityHome' : 'getOrgManageHome']().then(res => {
      const { status, data } = res
      if (status == 0) {
        setData(data)
        props.setData(data)
      }
    })
  }
  const add = () => {
    history.push({
      pathname: "/OrgManage/nominationCommittee",
      state: {
        type: "add",
      }
    })
  }

  const out = () => {
    orgManage.postExitOrg().then(res => {
      const { status, data } = res
      if (status == 0) {
        console.log(data)
        message.success(t('task.success'))
      }
    })
  }



  useEffect(() => {
    query()
  }, [])

  const apply = () => {
    history.push({
      pathname: "/OrgManage/applyCertification"
    })
  }

  return <div className="committee-statistics p-20 " style={{ paddingBottom: 0 }}>
    <div className="statistics-title ">
      <div className="title-left-box">
        <img className="committee-logo" src={data.imageUrl} />
        <div className="committee-name">
          <div className="name-box">
            {data.identityName}
            {data.isAuthority ? <span>{t('orgManage.committeeMember')}</span> : ''}
          </div>
          <p className="committee-identity">{data.identityId}</p>
        </div>
      </div>
      <div className="title-right-box">
        {
          props.isAdmin ? <>
            <Button onClick={add} type="primary">{t('orgManage.nominationMembers')}</Button>
            <Button onClick={() => setVisible(true)}>{t('orgManage.withdrawCommittee')}</Button>
          </> : <Button type="primary" onClick={apply}>{t('menu.applyCertification')}</Button>
        }


      </div>
    </div>
    {
      props.isAdmin ?
        <div className="statistics-box">
          <div className="item">
            <p>{t('orgManage.committeeMembers')}</p>
            <p>{data.authorityCount}</p>
          </div>
          <Divider style={{ height: '60px' }} type="vertical" />
          <div className="item">
            <p>{t('orgManage.trustCertificateIssued')}</p>
            <p>{data.approveCount}</p>
          </div>
          <Divider style={{ height: '60px' }} type="vertical" />
          <div className="item">
            <p>{t('orgManage.myToDoList')}</p>
            <p>{data.todoCount}</p>
          </div>
          <Divider style={{ height: '60px' }} type="vertical" />
          <div className="item">
            <p>{t('orgManage.myProposal')}</p>
            <p>{data.proposalCount}</p>
          </div>
        </div> :
        <div className="statistics-box" style={{ width: "50%" }}>
          <div className="item">
            <p>{t('orgManage.Certified')}</p>
            <p>{data.credentialsCount || 0}</p>
          </div>
          <Divider style={{ height: '60px' }} type="vertical" />
          <div className="item">
            <p>{t('orgManage.myApplication')}</p>
            <p>{data.applyCount || 0}</p>
          </div>
        </div>
    }
    <Modal
      title={t('common.tips')}
      centered
      visible={visible}
      onOk={() => out()}
      onCancel={() => setVisible(false)}
      okText={t('common.confirm')}
      cancelText={t('common.cancel')}
    >
      <div>
        <ExclamationCircleOutlined />     {t('orgManage.PleaseConfirmQuit')}
      </div>
    </Modal>
  </div>
}


export default CommitteeStatistics