import { FC, useState } from "react";
import { Image } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { CopyOutlined } from '@ant-design/icons'
import { copy } from '@/utils/utils'

const CredentialDetails: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  return <div className="layout-box credential-details">
    <div className="details">
      <div className="details-left">
        <div className="details-lf-box">
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="detais-lf-des">
          <p>{t('credential.credentialDescription')}</p>
          <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </p>
        </div>
      </div>
      <div className="details-right">
        <div className="details-title">TookenName</div>
        <div className="details-info">
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('center.usageScene')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.contractName')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('voucher.ContractAddress')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.holdingUsers')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('center.metaDataID')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.credentialId')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.creationTime')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.validityPeriod')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.exchangePlatform')}:</label>
            <span>xxxxx</span>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default CredentialDetails

