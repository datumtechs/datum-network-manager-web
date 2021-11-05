import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import emphasizeSvg from '../../../../assets/images/8.icon1.svg'
import { overviewApi } from '../../../../api'
import i18n from '../../../../i18n/config'

const RecordCard: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const [dataList, dataListSet] = useState<any>([])
  const history = useHistory()

  const queryData = () => {
    overviewApi.queryWaitAuthDataList().then(res => {
      if (res.status === 0 && res.data) {
        // console.log(res.data);
        dataListSet(res.data)
      }
    })
  }

  const linkToAuthorization = () => {
    history.push('/myData/dataAuthorization')
  }

  useEffect(() => {
    queryData()
  }, [])

  return (
    <div className="overview-authorization item">
      <div className="data-name">{t('overview.dataAuthorizationApplication')}</div>
      <div className="auth-list">
        {dataList.map(item => {
          return (
            <div className="auth-list-box" key={item.id}>
              <div className="auth-list-name">
                <img src={emphasizeSvg} alt="" />
                <div className="auth-list-date">{dayjs(item.applyTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
              {i18n.language === 'zh' ?
                <div className="auth-list-remark">
                  {item.orgName}{t('overview.SeedApplication')}
                  {item.metaDataName}
                  {t('overview.AuthorizationApplication')}
                </div> :
                <div className="auth-list-remark">
                  {item.orgName}
                  {t('overview.AuthorizationApplication')}
                  {item.metaDataName}
                </div>
              }
            </div>
          )
        })}
      </div>
      {/* {dataList.length ? */}
      <div className="pointer view-link-left" onClick={linkToAuthorization}>{t('overview.viewAll')}</div>
      {/* // : ''} */}
    </div >
  )
}

export default RecordCard
