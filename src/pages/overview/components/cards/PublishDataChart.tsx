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

  const option = {
    grid: { left: 30, top: 10, right: 30, bottom: 20 },
    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   data: [t(`overview.cpu`), t(`overview.memory`), t(`overview.bandwidth`)]
    // },
    color: [bgColor.cpu, bgColor.memory, bgColor.bandwidth],
    xAxis: {
      type: 'category',
      data: getMonthsByNumber(12),
    },
    yAxis: {
      show: false
    },
    series: [
      {
        name: t(`overview.cpu`),
        type: 'bar',
        barGap: 0,
        label: {
          show: true,
          fontSize: 12,
          position: 'top',
          offset: [0, -10],
          formatter: (params) => {
            if (!params.value) return ''
            return `${params.value}${t('overview.core')}`
          },
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: t(`overview.memory`),
        type: 'bar',
        label: {
          show: true,
          fontSize: 12,
          position: 'top',
          offset: [0, -10],
          formatter: (params) => {
            if (!params.value) return ''
            return `${params.value}${changeSizeObj(params.value).unit}`
          },
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: t(`overview.bandwidth`),
        type: 'bar',
        // emphasis: {
        //   focus: 'none'
        // },
        label: {
          show: true,
          fontSize: 11,
          position: 'top',
          offset: [0, -10],
          formatter: (params) => {
            if (!params.value) return ''
            return `${params.value}${changeSizeObj(params.value).unit}`
          },
        },
        data: [150, 232, 201, 154, 190]
      },
    ],
  }

  useEffect(() => {
    const chart = echarts.init(document.getElementById('publishData'))
    const dataList: any[] = []
    overviewApi.localPowerStatsTrendMonthly().then((res) => {
      if (res.status === 0 && res.data) {
        option.series[0].data = res.data.map(data => changeSizeObj(data.incrementValue).size)
        chart.setOption(option)
        chart.resize()
      }
    })
    // }

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
