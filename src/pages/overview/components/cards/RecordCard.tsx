import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { overviewApi } from '@api'
import i18n from '@/i18n/config'
import * as echarts from 'echarts/lib/echarts'

const RecordCard: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const [dataObj, dataListSet] = useState<any>([])
  const history = useHistory()

  const queryData = () => {
    overviewApi.queryWaitAuthDataList().then(res => {
      const { status, data } = res
      if (status === 0) {
        dataListSet(data)
      }
    })
  }


  useEffect(() => {
    queryData()
  }, [])
  useEffect(() => {
    initChart()
  }, [dataObj])


  const initChart = () => {
    const option = {
      color: ['#63C7BB', '#657ACD', '#F167A8', '#F29201',],
      grid: { left: '10%', top: '10%', right: '10%', bottom: '10%' },
      title: {
        zlevel: 0,
        text: ``,
        subtext: `${t('overview.TotalVouchers')}`,
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
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 0, name: t('credential.attributeCredential') },//有属性凭证
            { value: 0, name: `${t('credential.noAttributeCredential')}(${t('credential.priced')})` },//已定价无属性数据凭证数量
            { value: 0, name: `${t('credential.noAttributeCredential')}(${t('credential.noPriced')})` },//	未定价无属性数据凭证数量
          ],
        },
      ],
    }
    const chart = echarts.init(document.getElementById('credential'))
    option.title.text = `${Number(dataObj.attributeDataTokenCount) + Number(dataObj.unPriceddataTokenCount) + Number(dataObj.pricedDataTokenCount) || 0}`
    option.series[0].data[0].value = dataObj.attributeDataTokenCount || 0
    option.series[0].data[1].value = dataObj.pricedDataTokenCount || 0
    option.series[0].data[2].value = dataObj.unPriceddataTokenCount || 0
    chart.setOption(option)
    chart.resize()
  }


  return (
    <div className="overview-authorization item">
      <div className="data-name">{t('overview.dataAuthorizationApplication')}</div>
      <div className="overview-tasks-content">
        <div className="overview-tasks-detail">
          <div className="detail-line">
            <div className="left">
              <span className="logo logo-success"></span>
              <span className="type">{t('credential.attributeCredential')}</span>
            </div>
            <div className="value">{dataObj.attributeDataTokenCount}</div>
          </div>
          <div className="detail-line">
            <div className="left">
              <span className="logo logo-pending"></span>
              <span className="type">{`${t('credential.noAttributeCredential')}(${t('credential.priced')})`}</span>
            </div>
            <div className="value">{dataObj.pricedDataTokenCount}</div>
          </div>
          <div className="detail-line">
            <div className="left">
              <span className="logo logo-failed"></span>
              <span className="type">{`${t('credential.noAttributeCredential')}(${t('credential.noPriced')})`}</span>
            </div>
            <div className="value">{dataObj.unPriceddataTokenCount}</div>
          </div>
        </div>
        <div id="credential"></div>
      </div>
    </div >
  )
}

export default RecordCard
