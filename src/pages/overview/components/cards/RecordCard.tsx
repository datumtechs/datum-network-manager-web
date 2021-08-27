import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import emphasizeSvg from '../../../../assets/images/8.icon1.svg'

const RecordCard: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const [dataList, dataListSet] = useState<any>([])

  useEffect(() => {
    dataListSet([
      {
        id: '1',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '2',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '3',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '4',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '5',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '6',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '7',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '8',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '9',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
      {
        id: '10',
        date: '2021-3-3 12:30:59',
        remark: 'Bank of AAA has initiated an authorization application of XXXXXX.',
      },
    ])
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
                <div className="auth-list-date">{item.date}</div>
              </div>
              <div className="auth-list-remark">{item.remark}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecordCard
