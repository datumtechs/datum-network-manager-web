import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import useWinWidth from '../../../../hooks/useWinWidth'

const TrendChart: FC<any> = (props: any) => {
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
  const switchData = type => {
    curSwitchSet(type)
    props.setDataSwitch(type)
  }
  useEffect(() => {
    const chart = echarts.init(document.getElementById('totalData'))
    const option = {
      grid: { left: 60, top: 30, right: 10, bottom: 20 },
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'category',
        data: getMonthsByNumber(12),
      },
      yAxis: [
        {
          name: t('overview.totalData'),
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
      ],
      series: [
        {
          name: t('overview.totalData'),
          type: 'line',

          itemStyle: {
            color: '#FFA505',
          },
          lineStyle: {
            width: 3,
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
    <div className="overview-data-amount1 item">
      <div className="overview-data-title">
        <div className="data-name">
          {curSwitch === 'data' ? t('overview.dataAmountRosettaNet') : t('overview.powerRosettaNet')}
        </div>
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
      <div id="totalData"></div>
    </div>
  )
}

const DataTrendChart = connect(
  (state: any) => ({ state }),
  (dispatch: any) => ({
    setDataSwitch: (curSwitch: string) => {
      dispatch({
        type: 'SET_DATASWITCH',
        data: curSwitch,
      })
    },
  }),
)(TrendChart)

export default DataTrendChart
