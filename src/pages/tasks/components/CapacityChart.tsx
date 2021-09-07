import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import { Tooltip, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import useWinWidth from '../../../hooks/useWinWidth'


const CapacityChart: FC<any> = (props: any) => {
  const { capacityFn } = props
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()


  const capaList = [
    { id: 1, label: t('task.sponsor'), color: '#63C7BB', value: 500, par: '50%' },
    { id: 2, label: t('task.receiver'), color: '#F167A8', value: 100, par: '10%' },
    { id: 3, label: t('task.conputationProvider'), color: '#657ACD', value: 100, par: '10%' },
    { id: 4, label: t('task.dataProvider'), color: '#FFA958', value: 100, par: '10%' },
    { id: 5, label: t('task.algorithmProvider'), color: '#F2DB01', value: 100, par: '10%' },
  ]

  const handleClick = (prarms) => {
    if (prarms.componentType === 'title') {
      return capacityFn('title')
    }
    capacityFn(prarms.name)
  }

  useEffect(() => {
    const chart = echarts.init(document.getElementById('capacityChart'))
    const option = {
      color: ['#63C7BB', '#F167A8', '#657ACD', '#FFA958', '#F2DB01'],
      grid: { left: '10%', top: '10%', right: '10%', bottom: '10%' },
      title: {
        triggerEvent: true,
        zlevel: 0,
        text: `${t('task.myCapacity')}`,
        top: '45%',
        left: '48%',
        textAlign: 'center',
        textStyle: {
          color: '#3C3588',
          fontSize: 18,
          rich: {
            value: {
              color: '#303133',
              fontSize: 24,
              lineHeight: 24,
            },
            name: {
              color: '#909399',
              fontSize: 14,
              lineHeight: 35,
            },
          },
        },
        subtextStyle: {
          color: '#5D5C65 ',
          fontSize: 12,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['70%', '85%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: t('task.sponsor') },
            { value: 735, name: t('task.receiver') },
            { value: 580, name: t('task.conputationProvider') },
            { value: 484, name: t('task.dataProvider') },
            { value: 684, name: t('task.algorithmProvider') },
          ],
        },
      ],
    }
    chart.setOption(option)
    chart.resize()
    chart.on('click', handleClick)
  }, [width, i18n.language])
  return <div className="charts-capacity">
    <div id="capacityChart">
    </div>
    <Tooltip placement="topLeft" title={t('tip.capacityChartTip')} className="chart-tip">
      <QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588' }} />
    </Tooltip>
    <div className="chart-list">
      {
        capaList.map(item => {
          return <div key={item.id} className="chart-list-line">
            <span className="label">{item.label}</span>
            <span className="value">{item.value}</span>
            <span className="par">({item.par})</span>
            <div className="chart-icon" style={{ 'backgroundColor': '#fff', 'border': `4px solid ${item.color}` }}></div>
          </div>
        })
      }
    </div>
  </div>
}

export default CapacityChart