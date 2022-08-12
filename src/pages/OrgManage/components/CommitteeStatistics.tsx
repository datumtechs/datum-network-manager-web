import { FC, useState, useEffect } from "react";
import { Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { orgManage } from '@api/index'

const CommitteeStatistics: FC<any> = (props) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [data, setData] = useState<any>({})

  const query = () => {
    orgManage['getOrgManageHome']().then(res => {
      const { status, data } = res
      if (status == 0) {
        console.log(data)
        setData(data)
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
        <img className="committee-logo" src="#" />
        <div className="committee-name">
          <div className="name-box">
            {data.identityName}
            {data.canTrusted ? <span>交易委员会会员</span> : ''}
          </div>
          <p className="committee-identity">{data.identityId}</p>
        </div>
      </div>
      <div className="title-right-box">
        {
          props.isAdmin ? <>
            <Button type="primary">{t('orgManage.nominationMembers')}</Button>
            <Button>{t('orgManage.withdrawCommittee')}</Button>
          </> : <Button type="primary" onClick={apply}>{t('menu.applyCertification')}</Button>
        }


      </div>
    </div>
    {
      props.isAdmin ?
        <div className="statistics-box">
          <div className="item">
            <p>{t('orgManage.committeeMembers')}</p>
            <p>123</p>
          </div>
          <Divider style={{ height: '60px' }} type="vertical" />
          <div className="item">
            <p>{t('orgManage.trustCertificateIssued')}</p>
            <p>123</p>
          </div>
          <Divider style={{ height: '60px' }} type="vertical" />
          <div className="item">
            <p>{t('orgManage.myToDoList')}</p>
            <p>123</p>
          </div>
          <Divider style={{ height: '60px' }} type="vertical" />
          <div className="item">
            <p>{t('orgManage.myProposal')}</p>
            <p>123</p>
          </div>
        </div> :
        <div className="statistics-box">
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

  </div>
}


export default CommitteeStatistics