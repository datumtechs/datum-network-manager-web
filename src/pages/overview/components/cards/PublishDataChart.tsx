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
import { changeSizeObj, BandwidthSizeObj } from '@utils/utils'
import { connect } from 'react-redux'



const PublishDataChart: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()
  const [curSwitch, curSwitchSet] = useState('data')
  const { bgColor } = props
  const { loginInfo } = props?.state?.loginInfo
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

  const _yAxis = [
    {
      type: 'value',
      max: 10,
      axisLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    {
      type: 'value',
      max: 8,
      axisLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    {
      type: 'value',
      max: 200,
      axisLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
  ]

  const option: any = {
    grid: {
      left: 0,
      top: curSwitch !== 'data' ? 30 : 10,
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
        // debugger
        params.forEach((v, index) => {
          if (+v?.value) {
            dom += `<p><span class="public-chart-tip-icon" style="background:${v?.color};margin-right:5px"></span>
            ${v?.value}${v?.value && index != 1 ? index == 2 ? BandwidthSizeObj(+v.data.backupsData).unit + 'ps' : changeSizeObj(+v.data.backupsData).unit : t('overview.core')}</p>`
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
    yAxis: {},
    series: [],
  }

  useEffect(() => {
    const chart = echarts.init(document.getElementById('publishData'))
    if (curSwitch !== 'data') {
      overviewApi.localPowerStatsTrendMonthly({ type: 1 }).then((res) => {
        const newOption = { ...option }
        newOption.series = []
        if (res.status === 0 && res.data) {
          const list1: any[] = [], list2: any[] = [], list3: any[] = []
          newOption.yAxis = _yAxis
          newOption.series[0] = { ...seriesCom[0] }
          newOption.series[0].data = res.data.map(_ => {
            const item = +changeSizeObj(_.incrementMemoryValue).size
            list1.push(item)
            return {
              value: item,
              backupsData: _.incrementMemoryValue
            }
          })
          newOption.yAxis[0].max = Math.max(...list1)

          newOption.series[1] = { ...seriesCom[1] }
          newOption.series[1].data = res.data.map(_ => {
            const item = +changeSizeObj(_.incrementCoreValue).size
            list2.push(item)
            return {
              value: item,
              backupsData: _.incrementCoreValue
            }
          })
          newOption.yAxis[1].max = Math.max(...list2)

          newOption.series[2] = { ...seriesCom[2] }
          newOption.series[2].data = res.data.map(_ => {
            const item = +BandwidthSizeObj(_.incrementBandwidthValue).size
            list3.push(item)
            return {
              value: item,
              backupsData: _.incrementBandwidthValue
            }
          })
          newOption.yAxis[2].max = Math.max(...list3)
          chart.setOption(newOption, {
            replaceMerge: ['series']
          })
          chart.resize()
        }
      })
    } else {
      overviewApi.localDataFileStatsTrendMonthly().then((res) => {
        const newOption = { ...option }
        newOption.series = []
        if (res.status === 0 && res.data) {
          newOption.yAxis = {
            show: true,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
          newOption.series[0] = { ...seriesCom[0] }
          newOption.series[0].data = res.data.map(_ => _.incrementValue)
          newOption.series[0].data = res.data.map(_ => { return { value: +changeSizeObj(_.incrementValue).size, backupsData: _.incrementValue } })
          chart.setOption(newOption, {
            replaceMerge: ['series']
          })
          chart.resize()
        }
      })
    }


  }, [width, i18n.language, curSwitch])



  return (
    <div className="publish-data-box">
      <div className="publish-data-title">
        <div className="data-name">{curSwitch === 'data' ? t('overview.myData') : t('overview.myPower')}</div>

        {
          loginInfo?.isAdmin ?
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
            </div> :
            <div className="data-switch" style={{ backgroundColor: '#fff' }}>
            </div>
        }
      </div>
      <div id="publishData"></div>
    </div>
  )
}

export default connect((state: any) => ({ state }))(PublishDataChart) 
