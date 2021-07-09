import React, { FC, useState, useEffect } from 'react'
import * as echarts from 'echarts/core'
import {
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import 'echarts/lib/component/grid'
import { CanvasRenderer } from 'echarts/renderers'
import { useTranslation } from 'react-i18next'
import { Button, Space, Progress } from 'antd'
import Bread from '../../../layout/components/Bread'
import ComputeDetailTable from './components/ComputeDetailTable'

echarts.use([LineChart, GridComponent, CanvasRenderer, LegendComponent])
export const ComputeNodeDetail: FC<any> = () => {
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
        text: '渐变堆叠面积图',
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

  const { t } = useTranslation()
  const [selectTab, SetSelectTab] = useState('cpu')
  // 按照selectTab的改变 请求api 获取数据
  useEffect(() => initCharts(), [selectTab])
  return (
    <div className="layout-box gray-box">
      <div className="bread-box">
        <Bread />
      </div>
      <div className="charts-box">
        <div className="node-info">
          <div className="title">
            <span>{t('computeNodeMgt.nodeName')}:</span>
            <span> XXXXXXXXXXXXXXXXXXXXXXXXXX</span>
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
                {t('overview.bandWidth')}
              </Button>
            </Space>
          </div>
          <div></div>
          <div id="lineChart"></div>
        </div>
        <div className="cpu-info">
          {/* TODO 此处需要根据切换来进行改变 */}
          <div className="title">
            <span>CPU:</span>
          </div>
          <div className="status">CPU of the node has been occupied：</div>
          <div className="charts">
            <Progress type="circle" percent={75} width={140} strokeWidth={8} strokeColor="#3c3588" />
          </div>
        </div>
      </div>
      <div className="white-bg">
        <ComputeDetailTable />
      </div>
    </div>
  )
}
