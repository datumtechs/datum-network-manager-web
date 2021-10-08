import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import useWinWidth from '../../../hooks/useWinWidth'



const StatusChart: FC<any> = (props: any) => {
  const { statusFn, statusObj } = props

  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()
  // const [statusList, statusListSet] = useState([])

  const statusList = [
    { id: 1, label: t('task.success'), color: '#63C7BB', value: statusObj.taskSuccessCount, par: statusObj.taskSuccessCount ? `${(statusObj.taskSuccessCount * 100 / statusObj.totalTaskCount).toFixed(2)}%` : '0.00%' },
    { id: 2, label: t('task.failed'), color: '#F167A8', value: statusObj.taskFailedCount, par: statusObj.taskFailedCount ? `${(statusObj.taskFailedCount * 100 / statusObj.totalTaskCount).toFixed(2)}%` : '0.00%' },
    { id: 3, label: t('task.pending'), color: '#657ACD', value: statusObj.taskPendingCount, par: statusObj.taskPendingCount ? `${(statusObj.taskPendingCount * 100 / statusObj.totalTaskCount).toFixed(2)}%` : '0.00%' },
    { id: 4, label: t('task.computing'), color: '#FFA958', value: statusObj.taskRunningCount, par: statusObj.taskPendingCount ? `${(statusObj.taskRunningCount * 100 / statusObj.totalTaskCount).toFixed(2)}%` : '0.00%' },
  ]

  const handleClick = (prarms) => {
    if (prarms.componentType === 'title') {
      return statusFn('title')
    }
    statusFn(prarms.name)
  }

  useEffect(() => {
    // statusListSet()
  }, [])


  useEffect(() => {
    const chart = echarts.init(document.getElementById('statusChart'))
    const option = {
      color: ['#63C7BB', '#F167A8', '#657ACD', '#F29201'],
      grid: { left: '10%', top: '10%', right: '10%', bottom: '10%' },
      title: {
        triggerEvent: true,
        zlevel: 0,
        text: `${t('task.status')}`,
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
            { value: statusObj.taskSuccessCount, name: t('task.success') },
            { value: statusObj.taskFailedCount, name: t('task.failed') },
            { value: statusObj.taskPendingCount, name: t('task.pending') },
            { value: statusObj.taskRunningCount, name: t('task.computing') },
          ],
        },
      ],
    }
    chart.setOption(option)
    chart.resize()
    chart.on('click', handleClick)
  }, [width, i18n.language, statusObj])
  return <div className="charts-status">
    <div id="statusChart">
    </div>
    <Tooltip placement="topLeft" title={t('tip.statusChartTip')} className="chart-tip">
      <QuestionCircleOutlined style={{ 'fontSize': '20px', 'color': '#3C3588' }} />
    </Tooltip>
    <div className="chart-list">
      {
        statusList.map(item => {
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

export default StatusChart