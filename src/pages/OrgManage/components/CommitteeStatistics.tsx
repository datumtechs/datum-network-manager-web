import { FC, useState, useEffect } from "react";
import { Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'

const CommitteeStatistics: FC<any> = () => {
  const { t } = useTranslation()
  const query = () => {

  }
  useEffect(() => {
    query()
  }, [])

  return <div className="committee-statistics">
    <div className="statistics-title">
      <div className="title-left-box">
        <img className="committee-logo" src="#" />
        <div className="committee-name">
          <div className="name-box">
            华丰银行
            <span>交易委员会会员</span>
          </div>
          <p className="committee-identity">Identity：xxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
      <div className="title-right-box">
        <Button type="primary">{t('orgManage.nominationMembers')}</Button>
        <Button>{t('orgManage.withdrawCommittee')}</Button>
      </div>
    </div>
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
    </div>
  </div>
}


export default CommitteeStatistics