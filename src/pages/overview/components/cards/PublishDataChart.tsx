import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import useWinWidth from '../../../../hooks/useWinWidth'

const PublishDataChart: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()
  const [curSwitch, curSwitchSet] = useState('data')

  const getMonthsByNumber = (month: number) => {
    const newDays: string[] = []
    for (let i = 0; i < month; i++) {
      const mmm = dayjs().subtract(i + 1, 'month')
      newDays.unshift(i18n.language === 'en' ? mmm.format('MMM') : `${mmm.format('MM')}${t('common.month')}`)
    }
    return newDays
  }

  const switchData = type => curSwitchSet(type)

  useEffect(() => {
    const chart = echarts.init(document.getElementById('publishData'))
    const option = {
      grid: { left: 50, top: 40, right: 60, bottom: 20 },
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'category',
        data: getMonthsByNumber(12),
      },
      yAxis: [
        {
          name: t('overview.growth'),
          nameTextStyle: { align: 'right' },
          axisLabel: {
            fontSize: 12,
            color: '#8E9EB9',
            formatter: params => params,
          },
          splitLine: {
            lineStyle: {
              color: '#F0F3F6',
              width: 1,
            },
          },

          type: 'value',
          scale: true,
        },
        {
          name: t('overview.totalData'),
          nameTextStyle: { align: 'left' },
          axisLabel: {
            fontSize: 12,
            color: '#8E9EB9',
            formatter: params => params,
          },
          splitLine: {
            lineStyle: {
              color: '#F0F3F6',
              width: 1,
            },
          },
          type: 'value',
          scale: true,
        },
      ],
      series: [
        {
          name: t('overview.growth'),
          type: 'bar',
          yAxisIndex: 0,
          barWidth: '30%',
          itemStyle: {
            color: '#3C3588',
          },
          data: [820, 932, 901, 934, 1290, 1330, 820, 932, 901, 934, 1290, 1330],
          label: {
            formatter: params => {
              console.log(params.name)
              return t(params.name)
            },
          },
        },
        {
          name: t('overview.totalData'),
          type: 'line',
          yAxisIndex: 1,
          itemStyle: {
            color: '#FFA505',
          },
          lineStyle: {
            width: 4,
            color: '#FFA505',
          },
          smooth: true,
          data: [820, 932, 901, 934, 1290, 1330, 820, 932, 901, 934, 1290, 1330],
          label: {
            formatter: params => {
              console.log(params)
              return t(params.name)
            },
          },
        },
      ],
    }
    chart.setOption(option)
    chart.resize()
  }, [width, i18n.language])

  return (
    <div className="publish-data-box">
      <div className="publish-data-title">
        <div className="data-name">{curSwitch === 'data' ? t('overview.myData') : t('overview.myPower')}</div>
        <div className="data-switch">
          <div
            className={`switchBtn pointer ${curSwitch === 'data' ? 'active' : ''}`}
            onClick={() => switchData('data')}
          >
            {t('overview.dataAmount')}
          </div>
          <div
            className={`switchBtn pointer ${curSwitch === 'power' ? 'active' : ''}`}
            onClick={() => switchData('power')}
          >
            {t('overview.computingPower')}
          </div>
        </div>
      </div>
      <div id="publishData"></div>
    </div>
  )
}

export default PublishDataChart
