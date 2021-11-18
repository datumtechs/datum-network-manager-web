import { FC, useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import useWinWidth from '@hooks/useWinWidth'
import { ThemeContext } from '@com/ThemeContext'


const StatusChart: FC<any> = (props: any) => {
  const { statusFn, statusObj } = props
  const { color } = useContext(ThemeContext);

  const { t, i18n } = useTranslation()
  const { width } = useWinWidth()
  // const [statusList, statusListSet] = useState([])

  const statusList = [
    { id: 1, label: t('task.success'), color: color.success, value: statusObj.successCount, par: statusObj.successCount ? `${(statusObj.successCount * 100 / statusObj.totalCount).toFixed(2)}%` : '0.00%' },
    { id: 2, label: t('task.failed'), color: color.failed, value: statusObj.failedCount, par: statusObj.failedCount ? `${(statusObj.failedCount * 100 / statusObj.totalCount).toFixed(2)}%` : '0.00%' },
    { id: 3, label: t('task.pending'), color: color.pending, value: statusObj.pendingCount, par: statusObj.pendingCount ? `${(statusObj.pendingCount * 100 / statusObj.totalCount).toFixed(2)}%` : '0.00%' },
    { id: 4, label: t('task.computing'), color: color.running, value: statusObj.runningCount, par: statusObj.runningCount ? `${(statusObj.runningCount * 100 / statusObj.totalCount).toFixed(2)}%` : '0.00%' },
  ]

  const handleClick = (prarms) => {
    if (prarms.componentType === 'title') {
      return statusFn(0)
    }
    statusFn(prarms?.data?.type)
  }

  useEffect(() => {
    const chart = echarts.init(document.getElementById('statusChart'))
    const option = {
      color: [color.success, color.failed, color.pending, color.running,],
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
            { value: statusObj.successCount, name: t('task.success'), type: '4' },
            { value: statusObj.failedCount, name: t('task.failed'), type: '3' },
            { value: statusObj.pendingCount, name: t('task.pending'), type: '1' },
            { value: statusObj.runningCount, name: t('task.computing'), type: '2' },
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