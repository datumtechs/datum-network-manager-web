import React, { FC, useState, useEffect, useCallback } from 'react'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import 'echarts/lib/component/grid'
import { CanvasRenderer } from 'echarts/renderers'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Button, Space, Progress } from 'antd'
import Bread from '../../../layout/components/Bread'
import ComputeDetailTable from './components/ComputeDetailTable'
import useComputeNodeDetails from '../../../hooks/useComputeNodeDetails'
import i18n from '../../../i18n/config'
import { computeNodeApi } from '../../../api/index'
import { fileSizeChange } from '../../../utils/utils'

echarts.use([TooltipComponent, TitleComponent, LineChart, GridComponent, CanvasRenderer, LegendComponent])
export const ComputeNodeDetail: FC<any> = (props: any) => {
  // 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
  type Option = echarts.ComposeOption<
    LineSeriesOption | TitleComponentOption | GridComponentOption | LegendComponentOption
  >
  let myChart: any = null

  const [xAxis, xAxisSet] = useState([])
  const { location } = props
  const { id } = location.state
  const { t } = useTranslation()
  const [selectTab, SetSelectTab] = useState('1')
  const [curTitle, curTitleSet] = useState('')
  const [cpuPar, cpuParSet] = useState<string | number>(0)
  const [memoryPar, memoryParSet] = useState<string | number>(0)
  const [bandwithPar, bandwidthParSet] = useState<string | number>(0)
  const [curPercent, curPercentSet] = useState<number>(0)
  const [infoTips, infoTipsSet] = useState<string>('')
  const [timeType, timeTypeSet] = useState<number>(1)
  const [curYAxis, curYAxisSet] = useState([])

  const getOneDayHours = (unit: string = `${t('common.hour')}`) => {
    const newHour: string[] = []
    for (let i = 0; i < 24; i++) {
      // newHour.unshift(`${dayjs().subtract(i, 'hour').hour()}`)
      newHour.unshift(`${dayjs().subtract(i, 'hour').format('HH')}${t('common.hour')}`)
    }
    return newHour
  }
  const [oneDayXAxis, oneDayYAxisSet] = useState<string[]>(getOneDayHours())
  const getDaysByNumber = (days: number, unit: string = `${t('common.day')}`) => {
    const newDays: string[] = []
    for (let i = 0; i < days; i++) {
      newDays.unshift(`${dayjs().subtract(i, 'day').format('MM-DD')}`)
    }
    return newDays
  }

  const daysList = [
    { id: 0, value: 1, label: t('common.pass24') },
    { id: 1, value: 7, label: t('common.pass7') },
    { id: 2, value: 15, label: t('common.pass15') },
    { id: 3, value: 30, label: t('common.pass30') },
  ]

  const option: any = {
    color: ['#3C3588'],
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      // axisPointer: {
      //   type: 'cross',
      //   label: {
      //     backgroundColor: '#6a7985',
      //   },
      // },
      formatter: params => {
        console.log(params, 'paramsparamsparamsparams')
        let v
        if (selectTab === '1') {
          v = `${params[0].data}${t('overview.core')}`
        }
        if (selectTab === '2') {
          v = `${fileSizeChange(params[0].data)}`
        }
        if (selectTab === '3') {
          v = `${fileSizeChange(params[0].data)}PS`
        }
        const str = `<div>
        <p>${params[0].axisValue}</p</>
        <p>${v}</p</>
        </div>`
        return str
      },
    },
    xAxis: {
      type: 'category',
      data: oneDayXAxis, // x轴日期
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: value => {
          if (selectTab === '1') {
            return `${value}${t('overview.core')}`
          }
          if (selectTab === '2') {
            return `${fileSizeChange(value)}`
          }
          if (selectTab === '3') {
            return `${fileSizeChange(value)}PS`
          }
        },
      },
    },
    // legend: {
    //   align: 'auto',
    //   itemGap: 50,
    //   selectedMode: 'single',
    //   textStyle: {
    //     fontSize: 12,
    //     color: '#3C3588',
    //   },
    //   icon: 'none',
    //   left: 0,
    //   top: 15,
    //   data: ['Past 24 hours', 'Past 7 days', 'Past 15 days', 'Past 30 days'],
    //   inactiveColor: '#5D5C65',
    //   // selected: {
    //   //   'Past 24 hours': true,
    //   //   'Past 7 days': false,
    //   //   'Past 15 days': false,
    //   //   'Past 30 days': false,
    //   // },
    // },
    grid: {
      left: 0,
      top: 40,
      right: 0,
      bottom: 0,
      containLabel: true,
    },
    series: [
      {
        name: 'Past 24 hours',
        type: 'line',
        stack: '总量',
        data: [],
        smooth: true,
      },
      {
        name: 'Past 7 days',
        type: 'line',
        stack: '总量',
        data: [],
        smooth: true,
      },
      {
        name: 'Past 15 days',
        type: 'line',
        stack: '总量',
        data: [],
        smooth: true,
      },
      {
        name: 'Past 30 days',
        type: 'line',
        stack: '总量',
        data: [],
        smooth: true,
      },
    ],
  }
  const initCharts = () => {
    if (!myChart) {
      myChart = echarts.init(document.getElementById('lineChart') as HTMLElement)
    }

    myChart?.setOption(option, true)
    // myChart.on('legendselectchanged', param => {
    //   switch (param.name) {
    //     case 'Past 24 hours':
    //       timeTypeSet(1)
    //       break
    //     case 'Past 7 days':
    //       timeTypeSet(7)
    //       break
    //     case 'Past 15 days':
    //       timeTypeSet(15)
    //       break
    //     case 'Past 30 days':
    //       timeTypeSet(30)
    //       break
    //     default:
    //       break
    //   }
    // })
  }

  // const { details } = useComputeNodeDetails(id)
  const { details } = useComputeNodeDetails(id)

  // 按照selectTab的改变 请求api 获取数据
  // useEffect(() => initCharts(), [selectTab])

  useEffect(() => {
    cpuParSet(isNaN(details?.usedCore / details?.core) ? '0' : (details?.usedCore / details?.core).toFixed(2))
    memoryParSet(
      isNaN(details?.usedMemory / details?.memory) ? '0' : (details?.usedMemory / details?.memory).toFixed(2),
    )
    bandwidthParSet(
      isNaN(details?.usedBandwidth / details?.bandwidth)
        ? '0'
        : (details?.usedBandwidth / details?.bandwidth).toFixed(2),
    )
  }, [details])

  useEffect(() => {
    if (selectTab === '1') {
      return curTitleSet(`${t(`overview.cpu`)}`)
    }
    if (selectTab === '2') {
      return curTitleSet(`${t(`overview.memory`)}`)
    }
    if (selectTab === '3') {
      return curTitleSet(`${t(`overview.bandwidth`)}`)
    }
  }, [selectTab, i18n.language])

  useEffect(() => {
    console.log('selectTab', selectTab)

    if (selectTab === '1') {
      curPercentSet(Number(cpuPar))
    } else if (selectTab === '2') {
      curPercentSet(Number(memoryPar))
    } else if (selectTab === '3') {
      curPercentSet(Number(bandwithPar))
    }
  }, [selectTab, cpuPar, memoryPar, bandwithPar])

  useEffect(() => {
    if (i18n.language === 'en') {
      infoTipsSet(`${curTitle} ${t('node.hasOccupied')}`)
    } else {
      infoTipsSet(`此节点的${curTitle}占用情况`)
    }
  }, [i18n.language, curTitle])

  const mapTimeType = type => {
    if (type === 1) {
      return 0
    }
    if (type === 7) {
      return 1
    }
    if (type === 15) {
      return 2
    }
    if (type === 30) {
      return 3
    }
    return 0
  }

  const queryData = () => {
    computeNodeApi
      .queryPowerNodeUseHistory({
        powerNodeId: id,
        resourceType: selectTab,
        timeType,
      })
      .then(res => {
        if (res.status === 0) {
          // option.series[mapTimeType(timeType)].data = res.data // [2]['data'] = res.data
          if (selectTab === '2' || selectTab === '3') {
            console.log(res.data, 'res.data,res.data')
          }
          option.series[mapTimeType(timeType)].data = res.data
          initCharts()
        }
      })
      .catch(error => {
        initCharts()
      })
  }
  useEffect(() => {
    queryData()
  }, [selectTab, oneDayXAxis, i18n.language])

  useEffect(() => {
    if (timeType === 1) {
      oneDayYAxisSet(getOneDayHours())
    } else {
      oneDayYAxisSet(getDaysByNumber(timeType))
    }
  }, [timeType])

  return (
    <div className="layout-box gray-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="charts-box">
        <div className="node-info">
          <div className="title">
            <span>{t('computeNodeMgt.nodeName')}:</span>
            <span></span>
          </div>
          <div className="btn-group">
            <Space size={30}>
              <Button type={selectTab === '1' ? 'primary' : 'default'} onClick={() => SetSelectTab('1')}>
                CPU
              </Button>
              <Button type={selectTab === '2' ? 'primary' : 'default'} onClick={() => SetSelectTab('2')}>
                {t('overview.memory')}
              </Button>
              <Button type={selectTab === '3' ? 'primary' : 'default'} onClick={() => SetSelectTab('3')}>
                {t('overview.bandwidth')}
              </Button>
            </Space>
          </div>
          {/*
          'Past 24 hours': true,
          'Past 7 days': false,
          'Past 15 days': false,
          'Past 30 days': false, 
           */}
          <div className="time-group">
            <Space size={64}>
              {/* <span className="pointer">{t('common.pass24')}</span>
              <span className="pointer">{t('common.pass7')}</span>
              <span className="pointer">{t('common.pass15')}</span>
              <span className="pointer">{t('common.pass30')}</span> */}
              {daysList.map(item => (
                <span
                  className={['pointer', timeType === item.value ? 'active' : ''].join(' ')}
                  key={item.id}
                  onClick={() => timeTypeSet(item.value)}
                >
                  {item.label}
                </span>
              ))}
            </Space>
          </div>
          <div id="lineChart"></div>
        </div>
        <div className="cpu-info">
          {/* TODO 此处需要根据切换来进行改变 */}
          <div className="title">
            <span>{curTitle}:</span>
          </div>
          <div className="status">
            {infoTips}
            {/* {i18n.language === 'en' ? `${curTitle} ${t('node.hasOccupied')}` : `此节点的${curTitle}占用情况`} */}
          </div>
          <div className="charts">
            <Progress type="circle" percent={curPercent} width={140} strokeWidth={8} strokeColor="#3c3588" />
          </div>
        </div>
      </div>
      <div className="white-bg">
        <ComputeDetailTable id={id} bandwidth={details?.bandwidth} memory={details?.memory} core={details?.core} />
      </div>
    </div>
  )
}
