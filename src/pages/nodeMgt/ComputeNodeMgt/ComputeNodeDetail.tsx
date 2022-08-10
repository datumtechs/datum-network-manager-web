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
import useComputeNodeDetails from '@hooks/useComputeNodeDetails'
import i18n from '@/i18n/config'
import { computeNodeApi } from '@api/index'
import { fileSizeChange, changeSizeObj, BandwidthSizeObj, newChangeSizeFn } from '@utils/utils'
import ComputeDetailTable from './components/ComputeDetailTable'

echarts.use([TooltipComponent, TitleComponent, LineChart, GridComponent, CanvasRenderer, LegendComponent])
export const ComputeNodeDetail: FC<any> = (props: any) => {
  // 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
  type Option = echarts.ComposeOption<
    LineSeriesOption | TitleComponentOption | GridComponentOption | LegendComponentOption
  >
  let myChart: any = null

  const { location } = props
  const { id, name } = location.state || {}
  const { t } = useTranslation()
  const [selectTab, SetSelectTab] = useState('1')
  const [curTitle, curTitleSet] = useState('')
  const [curPercent, curPercentSet] = useState<number>(0)
  const [infoTips, infoTipsSet] = useState<string>('')

  useEffect(() => {
    if (!id) history.go(-1)
  }, [])
  // const daysList = [
  //   { id: 0, value: 1, label: t('common.pass24') }
  // ]

  const getDaysByNumber = (days) => {
    // 此处换行不要删除 echars 会自动解析
    return `${dayjs(days).subtract(0, 'day').format('MM-DD')}
${dayjs(days).subtract(0, 'hour').format('HH:mm')}`;
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
          v = `${newChangeSizeFn(params[0].data)}ps`
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
            return `${newChangeSizeFn(value)}ps`
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


  const { details } = useComputeNodeDetails(id)

  const queryPowerDetails = () => {
    computeNodeApi.queryCurrentLocalPower({ powerNodeId: id }).then(res => {
      if (res.status === 0 && res.data) {
        if (selectTab === '1') {
          curPercentSet(Number(res.data?.corePct))
        } else if (selectTab === '2') {
          curPercentSet(Number(res.data?.memoryPct))
        } else if (selectTab === '3') {
          curPercentSet(Number(res.data?.bandwidthPct))
        }
      }
    })
  }


  const filterData = (data) => {
    const timeList: any = []
    option.series[0].data = data.reverse().map(v => {
      getDaysByNumber(v.snapshotTime)
      timeList.push(getDaysByNumber(v.snapshotTime))
      let num = v.usedCore
      if (selectTab === '2') {
        num = v.usedMemory
      } else if (selectTab === '3') {
        num = v.usedBandwidth
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
          filterData([...res.data].reverse())
          initCharts()
        }
      })
      .catch(error => {
        initCharts()
      })
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


  useEffect(() => {
    if (i18n.language === 'en') {
      infoTipsSet(`${curTitle} ${t('node.hasOccupied')}`)
    } else {
      infoTipsSet(`此节点的${curTitle}占用情况`)
    }
  }, [i18n.language, curTitle])



  useEffect(() => {
    queryData()
    queryPowerDetails()
  }, [selectTab, i18n.language])


  return (
    <div className="layout-gray-box">
      <div className="title-box" style={{ marginTop: '20px' }}>
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
                {t('node.totalBandwidth')}:&nbsp;{BandwidthSizeObj(details?.bandwidth).size}
                {details?.bandwidth ? BandwidthSizeObj(details?.bandwidth).unit + "ps" : ''}
              </Button>
            </Space>
          </div>
          <div id="lineChart"></div>
        </div>
        <div className="cpu-info">
          <div className="status p-20" style={{ paddingLeft: 0 }}>
            {infoTips}
          </div>
          <div className="charts">
            <Progress type="circle" percent={curPercent} width={140} strokeWidth={8} strokeColor="#3c3588" />
          </div>
        </div>
      </div>
      {/* {JSON.stringify(details?.core)} */}
      <ComputeDetailTable id={id}
        bandwidth={details?.bandwidth}
        memory={details?.memory}
        core={details?.core}
      />
    </div>
  )
}
