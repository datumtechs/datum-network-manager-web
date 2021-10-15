import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import useWinWidth from '../../../hooks/useWinWidth'
import { resourceApi } from '../../../api'

const DataChart: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()

  const getDaysByNumber = (days: number, unit: string = `${t('common.day')}`) => {
    const newDays: string[] = []
    for (let i = 0; i < days; i++) {
      newDays.unshift(`${dayjs().subtract(i, 'day').format('MM-DD')}`)
    }
    return newDays
  }

  const initData = () => {
    const chart = echarts.init(document.getElementById('globalDataChart'))
    resourceApi.queryWholeNetDateOrPower({ flag: 1 }).then((data) => {
      const option = {
        grid: { left: 70, top: 40, right: 70, bottom: 50 },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: getDaysByNumber(30),
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
            nameTextStyle: { align: 'center' },
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
            data: [820, 932, 901, 934, 1290, 1330, 820, 111, 222, 333, 820, 932, 901, 934, 1290, 1330, 820, 111, 222, 333, 820, 932, 901, 934, 1290, 1330, 820, 111, 222, 333],
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
            symbolSize: 7,
            itemStyle: {
              color: '#FFA505',
            },
            lineStyle: {
              width: 4,
              color: '#FFA505',
            },
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330, 820, 111, 222, 333, 820, 932, 901, 934, 1290, 1330, 820, 111, 222, 333, 820, 932, 901, 934, 1290, 1330, 820, 111, 222, 333],
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
    })
  }

  useEffect(() => {
    initData()
  }, [width, i18n.language])

  return <div className="gray-chart-box">
    <div className="gray-chart-title">{t('overview.dataAmountRosettaNet')}</div>
    <div id="globalDataChart"></div>
  </div>
}

export default DataChart