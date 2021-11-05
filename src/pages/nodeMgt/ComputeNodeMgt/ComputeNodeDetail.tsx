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
import { fileSizeChange, changeSizeObj } from '../../../utils/utils'

echarts.use([TooltipComponent, TitleComponent, LineChart, GridComponent, CanvasRenderer, LegendComponent])
export const ComputeNodeDetail: FC<any> = (props: any) => {
  // 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
  type Option = echarts.ComposeOption<
    LineSeriesOption | TitleComponentOption | GridComponentOption | LegendComponentOption
  >
  let myChart: any = null

  // const [xAxis, xAxisSet] = useState([])
  const { location } = props
  const { id, name, identityId } = location.state
  const { t } = useTranslation()
  const [selectTab, SetSelectTab] = useState('1')
  const [curTitle, curTitleSet] = useState('')
  const [cpuPar, cpuParSet] = useState<string | number>(0)
  const [memoryPar, memoryParSet] = useState<string | number>(0)
  const [bandwithPar, bandwidthParSet] = useState<string | number>(0)
  const [curPercent, curPercentSet] = useState<number>(0)
  const [infoTips, infoTipsSet] = useState<string>('')
  const [timeType, timeTypeSet] = useState<number>(1)


  const daysList = [
    { id: 0, value: 1, label: t('common.pass24') }
  ]

  const getDaysByNumber = (days) => {
    // 此处换行不要删除 echars 会自动解析
    return `${dayjs(days).subtract(0, 'day').format('MM-DD')}
${dayjs(days).subtract(0, 'hour').format('hh:mm')}`;
  }

  const option: any = {
    color: ['#3C3588'],
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        let v
        if (selectTab === '1') {
          v = `${params[0].data}${t('overview.core')}`
        }
        if (selectTab === '2') {
          v = `${fileSizeChange(params[0].data)}`
        }
        if (selectTab === '3') {
          v = `${fileSizeChange(params[0].data)}P/S`
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
      data: [], // oneDayXAxis,
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
            return `${fileSizeChange(value)}P/S`
          }
        },
      },
    },

    grid: {
      left: 0,
      top: 40,
      right: 0,
      bottom: 0,
      containLabel: true,
    },
    series: [
      {
        type: 'line',
        stack: '总量',
        data: [],
        smooth: true,
      }
    ]
  }
  const initCharts = () => {
    if (!myChart) {
      myChart = echarts.init(document.getElementById('lineChart') as HTMLElement)
    }

    myChart?.setOption(option, true)
  }

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


  const { details } = useComputeNodeDetails(id)

  useEffect(() => {
    cpuParSet(isNaN(details?.usedCore / details?.core) ? '0' : ((details?.usedCore / details?.core) * 100).toFixed(2))
    memoryParSet(
      isNaN(details?.usedMemory / details?.memory) ? '0' : ((details?.usedMemory / details?.memory) * 100).toFixed(2),
    )
    bandwidthParSet(
      isNaN(details?.usedBandwidth / details?.bandwidth)
        ? '0'
        : ((details?.usedBandwidth / details?.bandwidth) * 100).toFixed(2),
    )
    // console.log(111);
  }, [details])


  useEffect(() => {
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


  const filterData = (data) => {
    const timeList: any = []
    option.series[0].data = data.reverse().map(v => {
      getDaysByNumber(v.snapshotTime)
      timeList.push(getDaysByNumber(v.snapshotTime))
      let num = v.corePct
      if (selectTab === '2') {
        num = v.memoryPct
      } else if (selectTab === '3') {
        num = v.bandwidthPct
      }
      return num || 0
    })
    option.xAxis.data = timeList
  }

  const queryData = () => {
    computeNodeApi
      .queryPowerNodeUseHistory({// 24小时算力情况
        powerNodeId: id,
      })
      .then(res => {
        if (res.status === 0) {
          filterData(res.data)
          initCharts()
        }
      })
      .catch(error => {
        initCharts()
      })
  }

  useEffect(() => {
    queryData()
  }, [selectTab, i18n.language])


  return (
    <div className="layout-gray-box">
      <div className="title-box">
        <p className="title-name">
          <span>{t('computeNodeMgt.nodeName')}:&nbsp;&nbsp;</span>
          <span>{name}</span>
        </p>
        <p className="title-id">
          <span>ID:&nbsp;&nbsp;</span>
          <span>{id}</span>
        </p>
      </div>
      <div className="charts-box">
        <div className="node-info">
          <div className="btn-group">
            <Space size={30}>
              <Button
                className="node-info-btn"
                type={selectTab === '1' ? 'primary' : 'default'}
                onClick={() => SetSelectTab('1')}
              >
                {t('node.totalCpu')}:&nbsp;{details?.core}
                {details?.core ? t('overview.core') : ''}
              </Button>
              <Button
                className="node-info-btn"
                type={selectTab === '2' ? 'primary' : 'default'}
                onClick={() => SetSelectTab('2')}
              >
                {t('node.totalMemory')}:&nbsp;{changeSizeObj(details?.memory).size}
                {details?.memory ? changeSizeObj(details?.memory).unit : ''}
              </Button>
              <Button
                className="node-info-btn"
                type={selectTab === '3' ? 'primary' : 'default'}
                onClick={() => SetSelectTab('3')}
              >
                {t('node.totalBandwidth')}:&nbsp;{changeSizeObj(details?.bandwidth).size}
                {details?.bandwidth ? changeSizeObj(details?.bandwidth).unit : ''}
              </Button>
            </Space>
          </div>
          <div className="time-group">
            <Space size={64}>
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
          <div className="status">
            {infoTips}
          </div>
          <div className="charts">
            <Progress type="circle" percent={curPercent} width={140} strokeWidth={8} strokeColor="#3c3588" />
          </div>
        </div>
      </div>
      {/* {JSON.stringify(details?.core)} */}
      <ComputeDetailTable id={id} identityId={identityId}
        bandwidth={details?.bandwidth}
        memory={details?.memory}
        core={details?.core}
      />
    </div>
  )
}
