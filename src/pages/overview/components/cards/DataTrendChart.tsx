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
import { overviewApi } from '../../../../api'
import { changeSizeObj } from '../../../../utils/utils'

const TrendChart: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()
  const [curSwitch, curSwitchSet] = useState('data')
  const [MaxTotal, setMaxTotal] = useState(0)

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
  const option = {
    grid: { left: 70, top: 30, right: 10, bottom: 20 },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: getMonthsByNumber(12),
    },
    yAxis: [
      {
        name: (curSwitch === 'data' ? t('overview.totalData') : t('overview.totalMemory')) + (`(${changeSizeObj(MaxTotal).unit || 'B'})` || ""),
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
        name: t('overview.totalData'),
        type: 'line',
        symbolSize: 7,
        itemStyle: {
          color: '#FFA505',
        },
        lineStyle: {
          width: 3,
          color: '#FFA505',
        },
        smooth: true,
        data: [],
        label: {
          formatter: params => {
            console.log(params)
            return t(params.name)
          },
        },
      },
    ],
  }
  useEffect(() => {
    const chart = echarts.init(document.getElementById('totalData'))
    if (curSwitch === 'data') {
      overviewApi.globalDataFileStatsTrendMonthly().then((res) => {
        option.series[0].data = res.data.map(data => data.totalValue)
        const maxdata = Math.max(...option.series[0].data)
        option.yAxis[0].name = `${t('overview.totalData')}(${changeSizeObj(maxdata).unit || 'B'})`
        chart.setOption(option)
        chart.resize()
      })
    } else {
      overviewApi.globalPowerStatsTrendMonthly().then((res) => {
        option.series[0].data = res.data.map(data => data.totalValue)
        const maxdata = Math.max(...option.series[0].data)
        option.yAxis[0].name = `${t('overview.totalMemory')}(${changeSizeObj(maxdata).unit || 'B'})`
        chart.setOption(option)
        chart.resize()
      })
    }
    // overviewApi.globalPowerStatsTrendMonthly(
    // ).then(res => {
    //   if (res.status === 0) {
    //     option.series[0].data = res.data
    //     chart.setOption(option)
    //     chart.resize()
    //   }
    // })

  }, [width, i18n.language, curSwitch])
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
