import { FC, useEffect, useState } from "react";
import { Image } from 'antd'
import { useTranslation } from 'react-i18next'
// import SearchBar from '@/layout/components/SearchBar'
// import { CopyOutlined } from '@ant-design/icons'
// import { copy } from '@/utils/utils'
import { voucher as voucherApi, } from '@api/index'
import tofun from '@/assets/images/voucher/tofun.png'

const CredentialDetails: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const [datas, setData] = useState<any>({})
  const { state } = props.location
  const tokenId = state.tokenId
  const dataTokenAddress = state.dataTokenAddress
  const name = state.name
  const dataAddress = state.dataAddress
  const dataAddressName = state.dataAddressName
  const [exchangeData, setExchangeData] = useState<any>([])
  useEffect(() => {
    query()
    getExchange()
  }, [])

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

  const getExchange = () => {
    voucherApi.getExchange({}).then(res => {
      const { status, data } = res
      if (status == 0) {
        setExchangeData(data?.exchangeList || [])
      }
    })
  }


  const filterImgurl = () => {
    if (!datas?.dynamicFields?.pinataGateway) return ''
    const pinataGateway = datas?.dynamicFields?.pinataGateway
    const imageUrl = datas?.imageUrl
    if ((pinataGateway.length - 1) == pinataGateway.lastIndexOf('/')) {
      return `${pinataGateway}ipfs/${imageUrl && imageUrl.replace('ipfs://', '') || ''}`
    }
    return `${pinataGateway}/ipfs/${imageUrl && imageUrl.replace('ipfs://', '') || ''}`
  }

  const linkToExchange = (row: any, data: any) => {
    const dexUrl = `${data.url}/${row.dataTokenAddress}`
    window.open(dexUrl, "_blank");
  }

  return <div className="layout-box p-20 credential-details">
    <div className="details">
      <div className="details-left">
        <div className="details-lf-box">
          <Image
            src={filterImgurl()}
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
              {[1, 3].includes(+datas?.usage) ? t('center.Plaintext') : ""}
              {[2, 3].includes(+datas?.usage) ? t('center.ciphertext') : ""}
            </span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.contractName')}:</label>
            <span className="item-metaDataId">{dataAddressName}</span>
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
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }} >{t('center.metaDataID')}:</label>
            <span className="item-metaDataId">{datas?.dynamicFields?.metaDataId || '-'}</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.credentialId')}:</label>
            <span>{datas?.tokenId}</span>
          </div>
          {/* <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.creationTime')}:</label>
            <span>xxxxx</span>
          </div> */}
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.validityPeriod')}:</label>
            <span>{datas?.endTime ? new Date(Number(datas?.endTime)).toLocaleString() : ""}</span>
          </div>
          <div className="info-item">
            <label style={{ minWidth: i18n.language == 'en' ? '135px' : '70px' }}>{t('credential.exchangePlatform')}:</label>
            <span>
              {exchangeData.map(v => {
                return <img onClick={() => linkToExchange(datas, v)} style={{ marginRight: "20px", maxWidth: '30px', maxHeight: '30px' }} className="attributed-credental-exchange-logo" src={tofun} alt="" />
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default CredentialDetails

