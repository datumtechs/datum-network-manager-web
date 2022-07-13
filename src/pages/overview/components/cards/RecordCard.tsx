import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { overviewApi } from '@api'
import i18n from '@/i18n/config'
import * as echarts from 'echarts/lib/echarts'

const RecordCard: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const [dataList, dataListSet] = useState<any>([])
  const history = useHistory()

  const queryData = () => {
    overviewApi.queryWaitAuthDataList().then(res => {
      if (res.status === 0 && res.data) {
        dataListSet(res.data)
        initChart()
      }
    })
  }


  useEffect(() => {
    queryData()
  }, [])


  const initChart = () => {
    const option = {
      color: ['#63C7BB', '#657ACD', '#F167A8', '#F29201',],
      grid: { left: '10%', top: '10%', right: '10%', bottom: '10%' },
      title: {
        zlevel: 0,
        text: ``,
        subtext: `${t('task.tasks')}`,
        top: '41%',
        left: '48%',
        textAlign: 'center',
        textStyle: {
          color: '#3C3588',
          fontSize: 18,
          rich: {
            value: {
              color: '#303133',
              fontSize: 24,
              lineHeight: 24,
            },
            name: {
              color: '#909399',
              fontSize: 14,
              lineHeight: 35,
            },
          },
        },
        subtextStyle: {
          color: '#5D5C65 ',
          fontSize: 12,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['50%', '80%'],
          avoidLabelOverlap: false,
          // itemStyle: {
          //   borderRadius: 10,
          //   borderColor: '#fff',
          //   borderWidth: 2,
          // },
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 0, name: t('credential.attributeCredential') },
            { value: 0, name: `${t('credential.noAttributeCredential')}(${t('credential.priced')})` },
            { value: 0, name: `${t('credential.noAttributeCredential')}(${t('credential.noPriced')})` },
          ],
        },
      ],
    }
    const chart = echarts.init(document.getElementById('credential'))
  }


  return (
    <div className="overview-authorization item">
      <div className="data-name">{t('overview.dataAuthorizationApplication')}</div>
      <div id="credential"></div>
    </div >
  )
}

export default RecordCard
