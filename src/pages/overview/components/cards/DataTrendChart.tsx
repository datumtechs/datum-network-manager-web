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
import useWinWidth from '@hooks/useWinWidth'
import { overviewApi } from '@api'
import { changeSizeObj } from '@utils/utils'

const TrendChart: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()
  const [curSwitch, curSwitchSet] = useState('data'),
    { bgColor } = props,
    [maxTotal, setMaxTotal] = useState(0)

  const getMonthsByNumber = (month: number) => {
    const newDays: string[] = []
    for (let i = 0; i < month; i++) {
      const mmm = dayjs().subtract(i, 'month')
      newDays.unshift(i18n.language === 'en' ? mmm.format('MMM') : `${mmm.format('MM')}${t('common.month')}`)
    }
    return newDays
  }
  const switchData = type => {
    curSwitchSet(type)
    props.setDataSwitch(type)
  }

  const seriesCom = [
    {
      name: t(`overview.cpu`),
      type: 'line',
      symbolSize: 7,
      smooth: true,
      data: [],
    },
    {
      name: t(`overview.memory`),
      type: 'line',
      symbolSize: 7,
      smooth: true,
      data: [],
    },
    {
      name: t(`overview.bandwidth`),
      type: 'line',
      symbolSize: 7,
      smooth: true,
      data: [],
    },
  ]



  const option: any = {
    grid: {
      left: 0,
      top: 40,
      right: 0,
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#3C3588',
      padding: 0,
      axisPointer: {
        type: 'line',
        label: {
          formatter(params) {
            return ' '
          },

        }
      },
      position: function () {
        const params: any = Array.from(arguments) || {}
        const obj = { top: 10 };
        const num = params[0][0] - params[4]['contentSize'][0] / 2
        obj['left'] = num < params[4]['contentSize'][0] / 2 ? 10 : num;
        return obj;
      },
      formatter(params) {
        if (!params.length) return '';
        let dom = ''
        params.forEach(v => {
          if (+v?.value) {
            dom += `<p><span class="public-chart-tip-icon" style="background:${v?.color};margin-right:5px"></span>
            ${changeSizeObj(v?.value).size}${v?.value ? changeSizeObj(+v?.value).unit : ''}</p>`
          }
        })
        if (!dom.length) dom = params[0].name
        return `<div class="public-chart-tip-wrap">${dom}</div>`
      }
    },
    legend: {
      left: 0,
      top: 0,
      itemGap: 10,
      icon: 'circle',
      itemWidth: 8,
      data: curSwitch === 'data' ? [t(`overview.cpu`)] : [t(`overview.cpu`), t(`overview.memory`), t(`overview.bandwidth`)],
      textStyle: {
        fontSize: 12
      }
    },
    color: curSwitch === 'data' ? [bgColor.cpu] : [...Object.values(bgColor)],
    xAxis: {
      type: 'category',
      data: getMonthsByNumber(12),
    },
    yAxis: {
      show: true,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [],
  }
  useEffect(() => {
    const chart = echarts.init(document.getElementById('totalData'))
    const newOption = { ...option }
    newOption.series = []
    if (curSwitch === 'data') {
      overviewApi.globalDataFileStatsTrendMonthly().then((res) => {
        if (res.status === 0 && res.data) {
          newOption.series[0] = { ...seriesCom[0] }
          newOption.series[0].data = res.data.map(_ => _.totalValue)
          if (curSwitch !== 'data') {
            newOption.series[1] = { ...seriesCom[1] }
            newOption.series[1].data = res.data.map(_ => _.totalValue)
            newOption.series[2] = { ...seriesCom[2] }
            newOption.series[2].data = res.data.map(_ => _.totalValue)
          }
          console.log(newOption);

          chart.setOption(newOption, {
            replaceMerge: ['series']
          })
          chart.resize()
        }
      })
    } else {
      overviewApi.globalPowerStatsTrendMonthly().then((res) => {
        if (res.status === 0 && res.data) {
          newOption.series[0] = { ...seriesCom[0] }
          newOption.series[0].data = res.data.map(_ => _.totalValue)
          if (curSwitch !== 'data') {
            newOption.series[1] = { ...seriesCom[1] }
            newOption.series[1].data = res.data.map(_ => _.totalValue)
            newOption.series[2] = { ...seriesCom[2] }
            newOption.series[2].data = res.data.map(_ => _.totalValue)
          }
          chart.setOption(newOption, {
            replaceMerge: ['series']
          })
          chart.resize()
        }
      })
    }

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
