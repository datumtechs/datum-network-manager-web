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
  const { capacityFn, capacityObj } = props
  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()


  const capaList = [
    { id: 1, label: t('task.sponsor'), color: '#63C7BB', value: capacityObj.ownerCount, par: capacityObj.ownerCount ? `${(capacityObj.ownerCount * 100 / capacityObj.totalCount).toFixed(2)}%` : '0.00%' },
    { id: 2, label: t('task.receiver'), color: '#F167A8', value: capacityObj.resultReceiverCount, par: capacityObj.resultReceiverCount ? `${(capacityObj.resultReceiverCount * 100 / capacityObj.totalCount).toFixed(2)}%` : '0.00%' },
    { id: 3, label: t('task.powerProvider'), color: '#F2DB01', value: capacityObj.powerProviderCount, par: capacityObj.powerProviderCount ? `${(capacityObj.powerProviderCount * 100 / capacityObj.totalCount).toFixed(2)}%` : '0.00%' },
    { id: 4, label: t('task.dataProvider'), color: '#FFA958', value: capacityObj.dataProviderCount, par: capacityObj.dataProviderCount ? `${(capacityObj.dataProviderCount * 100 / capacityObj.totalCount).toFixed(2)}%` : '0.00%' },
    { id: 5, label: t('task.algorithmProvider'), color: '#657ACD', value: capacityObj.algoProviderCount, par: capacityObj.algoProviderCount ? `${(capacityObj.algoProviderCount * 100 / capacityObj.totalCount).toFixed(2)}%` : '0.00%' },
  ]

  const handleClick = (prarms) => {
    if (prarms.componentType === 'title') {
      return capacityFn('0')
    }
    capacityFn(prarms.data.type)
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
            { value: capacityObj.ownerCount, name: t('task.sponsor'), type: '1' },// 任务发起方
            { value: capacityObj.resultReceiverCount, name: t('task.receiver'), type: '4' },// 结果使用方
            { value: capacityObj.algoProviderCount, name: t('task.algorithmProvider'), type: '5' },// 算法提供方
            { value: capacityObj.dataProviderCount, name: t('task.dataProvider'), type: '3' },// 数据提供方
            { value: capacityObj.powerProviderCount, name: t('task.powerProvider'), type: '2' }, // 算力提供方
          ],
        },
      ],
    }
    chart.setOption(option)
    chart.resize()
    chart.on('click', handleClick)
  }, [width, i18n.language, capacityObj])
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