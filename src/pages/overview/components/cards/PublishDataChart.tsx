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
import useWinWidth from '@hooks/useWinWidth'
import { overviewApi } from '@api'
import { changeSizeObj } from '@utils/utils'



const PublishDataChart: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()
  const [curSwitch, curSwitchSet] = useState('data')
  const { bgColor } = props
  const getMonthsByNumber = (month: number) => {
    const newDays: string[] = []
    for (let i = 0; i < month; i++) {
      const mmm = dayjs().subtract(i, 'month')
      newDays.unshift(i18n.language === 'en' ? mmm.format('MMM') : `${mmm.format('MM')}${t('common.month')}`)
    }
    return newDays
  }

  const switchData = type => curSwitchSet(type)

  const seriesCom = [
    {
      name: t(`overview.memory`),
      type: 'bar',
      legendHoverLink: true,
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        width: '8px'
      },
      data: []
    },
    {
      name: t(`overview.cpu`),
      type: 'bar',
      legendHoverLink: true,
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        width: curSwitch === 'data' ? '' : 8
      },
      data: []
    },
    {
      name: t(`overview.bandwidth`),
      type: 'bar',
      legendHoverLink: true,
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        width: '8px'
      },
      data: []
    },
  ]



  const option: any = {
    grid: {
      left: 0,
      top: curSwitch !== 'data' ? 40 : 10,
      right: 0,
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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
      backgroundColor: '#3C3588',
      padding: 0,
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
      },
    },
    legend: {
      left: 0,
      top: 0,
      itemGap: 10,
      icon: 'circle',
      itemWidth: 8,
      show: curSwitch !== 'data',
      data: curSwitch === 'data' ? [t(`overview.memory`)] : [t(`overview.memory`), t(`overview.cpu`), , t(`overview.bandwidth`)],
      textStyle: {
        fontSize: 12
      }
    },
    color: curSwitch === 'data' ? [bgColor.memory] : [...Object.values(bgColor)],
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
    const chart = echarts.init(document.getElementById('publishData'))
    overviewApi.localPowerStatsTrendMonthly({ type: 1 }).then((res) => {
      const newOption = { ...option }
      newOption.series = []
      if (res.status === 0 && res.data) {
        newOption.series[0] = { ...seriesCom[0] }
        newOption.series[0].data = res.data.map(_ => _.incrementMemoryValue)
        if (curSwitch !== 'data') {
          newOption.series[1] = { ...seriesCom[1] }
          newOption.series[1].data = res.data.map(_ => _.incrementCoreValue)
          newOption.series[2] = { ...seriesCom[2] }
          newOption.series[2].data = res.data.map(_ => _.incrementBandwidthValue)
        }

        chart.setOption(newOption, {
          replaceMerge: ['series']
        })
        chart.resize()
      }
    })
  }, [width, i18n.language, curSwitch])



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
