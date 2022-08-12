import { FC, useEffect, useState } from "react";
import { Image } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { CopyOutlined } from '@ant-design/icons'
import { copy } from '@/utils/utils'
import { voucher as voucherApi, } from '@api/index'

const CredentialDetails: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const [datas, setData] = useState<any>({})
  const { state } = props.location
  const tokenId = state.tokenId
  const dataTokenAddress = state.dataTokenAddress
  const name = state.name
  const dataAddress = state.dataAddress
  const dataAddressName = state.dataAddressName

  useEffect(() => { query() }, [])

  const query = () => {
    voucherApi.getDataTokenInventoryDetail({
      dataTokenAddress,
      tokenId
    }).then(res => {
      const { status, data } = res
      if (status == 0) {
        setData(data)
      }
    })
  }

  return <div className="layout-box p-20 credential-details">
    <div className="details">
      <div className="details-left">
        <div className="details-lf-box">
          <Image
            src="http://ipfs.io/ipfs/QmTiFuE2Krx7rgwhVLF8jAvAAegBWijNazNY8ZYcCTtzzg"
          />
        </div>
        <div className="detais-lf-des">
          <p>{t('credential.credentialDescription')}</p>
          <p>{datas?.desc}
          </p>
        </div>
      </div>
      <div className="details-right">
        <div className="details-title">{name}</div>
        <div className="details-info">
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('center.usageScene')}:</label>
            <span>
              {[1, 3].includes(datas?.usage) ? t('center.Plaintext') : ""}
              {[2, 3].includes(datas?.usage) ? t('center.ciphertext') : ""}
            </span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.contractName')}:</label>
            <span>{dataAddressName}</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('voucher.ContractAddress')}:</label>
            <span>{dataAddress}</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.holdingUsers')}:</label>
            <span>{datas?.owner}</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('center.metaDataID')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.credentialId')}:</label>
            <span>{datas?.tokenId}</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.creationTime')}:</label>
            <span>xxxxx</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.validityPeriod')}:</label>
            <span>{datas?.endTime ? new Date(datas?.endTime).toLocaleString() : ""}</span>
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

