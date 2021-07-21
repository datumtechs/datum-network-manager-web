import React, { FC, useState, useEffect } from 'react'
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
import { Button, Space, Progress } from 'antd'
import Bread from '../../../layout/components/Bread'
import ComputeDetailTable from './components/ComputeDetailTable'
import useComputeNodeDetails from '../../../hooks/useComputeNodeDetails'
import i18n from '../../../i18n/config'

echarts.use([TooltipComponent, TitleComponent, LineChart, GridComponent, CanvasRenderer, LegendComponent])
export const ComputeNodeDetail: FC<any> = (props: any) => {
  // 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
  type Option = echarts.ComposeOption<
    LineSeriesOption | TitleComponentOption | GridComponentOption | LegendComponentOption
  >
  let myChart: any = null
  const initCharts = () => {
    if (!myChart) {
      myChart = echarts.init(document.getElementById('lineChart') as HTMLElement)
    }
    const option: Option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['1', '4', '7', '10', '13', '16', '19'],
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        align: 'auto',
        itemGap: 50,
        selectedMode: 'single',
        textStyle: {
          fontSize: 12,
          color: '#3C3588',
        },
        icon: 'none',
        left: 0,
        top: 15,
        data: ['Past 24 hours', 'Past 7 days', 'Past 15 days', 'Past 30 days'],
        inactiveColor: '#5D5C65',
      },
      grid: {
        left: 0,
        top: 70,
        right: 0,
        bottom: 0,
        containLabel: true,
      },
      series: [
        {
          name: 'Past 24 hours',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210],
          smooth: true,
        },
        {
          name: 'Past 7 days',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310],
          smooth: true,
        },
        {
          name: 'Past 15 days',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410],
          smooth: true,
        },
        {
          name: 'Past 30 days',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320],
          smooth: true,
        },
      ],
    }
    myChart?.setOption(option, true)
  }
  const { location } = props
  const { id } = location.state
  const { t } = useTranslation()
  const [selectTab, SetSelectTab] = useState('cpu')
  const [curTitle, curTitleSet] = useState('')
  const [cpuPar, cpuParSet] = useState<string | number>(0)
  const [memoryPar, memoryParSet] = useState<string | number>(0)
  const [bandwithPar, bandwidthParSet] = useState<string | number>(0)
  const [curPercent, curPercentSet] = useState<number>(0)
  const [infoTips, infoTipsSet] = useState<string>('')

  // const { details } = useComputeNodeDetails(id)
  const { details } = useComputeNodeDetails(
    'jobNode:0x64e0b86f853f8e4de6e95d24625022e308317860e06ae5d712a9ef6dc2e474c3',
  )

  // 按照selectTab的改变 请求api 获取数据
  useEffect(() => initCharts(), [selectTab])
  useEffect(() => curTitleSet(`${t(`overview.${selectTab}`)}`), [selectTab, i18n.language])

  useEffect(() => {
    cpuParSet(isNaN(details?.usedCore / details?.core) ? '0.00' : (details?.usedCore / details?.core).toFixed(2))
    memoryParSet(
      isNaN(details?.usedMemory / details?.memory) ? '0.00' : (details?.usedMemory / details?.memory).toFixed(2),
    )
    bandwidthParSet(
      isNaN(details?.usedBandwidth / details?.bandwidth)
        ? '0.00'
        : (details?.usedBandwidth / details?.bandwidth).toFixed(2),
    )
  }, [details])

  useEffect(() => {
    if (selectTab === 'cpu') {
      curPercentSet(Number(cpuPar))
    } else if (selectTab === 'memory') {
      curPercentSet(Number(memoryPar))
    } else if (selectTab === 'bandwidth') {
      curPercentSet(Number(bandwithPar))
    }
  }, [selectTab])

  useEffect(() => {
    if (i18n.language === 'en') {
      infoTipsSet(`${curTitle} ${t('node.hasOccupied')}`)
    } else {
      infoTipsSet(`此节点的${curTitle}占用情况`)
    }
  }, [i18n.language, curTitle])
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
              <Button type={selectTab === 'cpu' ? 'primary' : 'default'} onClick={() => SetSelectTab('cpu')}>
                CPU
              </Button>
              <Button type={selectTab === 'memory' ? 'primary' : 'default'} onClick={() => SetSelectTab('memory')}>
                {t('overview.memory')}
              </Button>
              <Button
                type={selectTab === 'bandwidth' ? 'primary' : 'default'}
                onClick={() => SetSelectTab('bandwidth')}
              >
                {t('overview.bandwidth')}
              </Button>
            </Space>
          </div>
          <div></div>
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
