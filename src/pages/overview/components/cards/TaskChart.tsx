/* eslint-disable react/no-string-refs */
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
// import useWinWidth from '@hooks/useWinWidth'
import { overviewApi } from '@api'

const TaskChart: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  // const { width } = useWinWidth()
  const [pendingNum, pendingNumSet] = useState<string | number>('')
  const [runningNum, runningNumSet] = useState<string | number>('')
  const [failedNum, failedNumSet] = useState<string | number>('')
  const [successNum, successNumSet] = useState<string | number>('')
  const statusMap = new Map<string, number>([])

  // 1:pending等在中、2:running计算中、3:failed失败、4:success成功
  const getValue = (type) => {
    if (statusMap.get(type)) {
      return Number(statusMap.get(type))
    }
    return 0
  }

  const initChart = () => {
    const option = {
      color: ['#63C7BB', '#657ACD', '#F167A8', '#F29201',],
      grid: { left: '10%', top: '10%', right: '10%', bottom: '10%' },
      title: {
        zlevel: 0,
        text: ``,
        subtext: `${t('task.tasks')}`,
        top: '41%',
        left: '48%',
        textAlign: 'center',
        textVerticalAlign: 'middle',
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
          radius: ['50%', '80%'],
          avoidLabelOverlap: false,
          // itemStyle: {
          //   // borderRadius: 20,
          //   // borderColor: '#fff',
          //   // borderWidth: 5,
          // },
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 0, name: t('task.success') },
            { value: 0, name: t('task.pending') },
            { value: 0, name: t('task.failed') },
            { value: 0, name: t('task.computing') },
          ],
        },
      ],
    }
    const chart = echarts.init(document.getElementById('taskChart'))
    overviewApi.queryMyCalculateTaskStats().then(res => {
      if (res.status === 0 && res.data) {
        res.data.forEach(data => {
          if (+data.status == 1) {
            statusMap.set('pending', data.statusCount)
          }
          if (+data.status == 2) {
            statusMap.set('running', data.statusCount)
          }
          if (+data.status == 3) {
            statusMap.set('failed', data.statusCount)
          }
          if (+data.status == 4) {
            statusMap.set('success', data.statusCount)
          }
        })

        option.series[0].data[0].value = getValue('success')
        option.series[0].data[1].value = getValue('pending')
        option.series[0].data[2].value = getValue('failed')
        option.series[0].data[3].value = getValue('running')

        successNumSet(getValue('success'))
        pendingNumSet(getValue('pending'))
        failedNumSet(getValue('failed'))
        runningNumSet(getValue('running'))

        option.title.text = `${Number(getValue('pending')) + Number(getValue('running')) + Number(getValue('failed')) + Number(getValue('success'))}`
        chart.setOption(option)
        chart.resize()
      }
    })
  }


  useEffect(() => {
    initChart()
  }, [i18n.language])

  useEffect(() => {
    initChart()
  }, [])


  return (
    <div className="overview-tasks item">
      <div className="data-name">{t('overview.myTask')}</div>
      <div className="overview-tasks-content">

        <div className="overview-tasks-detail">
          <div className="detail-line">
            <div className="left">
              <span className="logo logo-success"></span>
              <span className="type">{t('task.success')}</span>
            </div>
            <div className="value">{successNum}</div>
          </div>
          <div className="detail-line">
            <div className="left">
              <span className="logo logo-pending"></span>
              <span className="type">{t('task.pending')}</span>
            </div>
            <div className="value">{pendingNum}</div>
          </div>
          <div className="detail-line">
            <div className="left">
              <span className="logo logo-failed"></span>
              <span className="type">{t('task.failed')}</span>
            </div>
            <div className="value">{failedNum}</div>
          </div>
          <div className="detail-line">
            <div className="left">
              <span className="logo logo-computing"></span>
              <span className="type">{t('task.computing')}</span>
            </div>
            <div className="value">{runningNum}</div>
          </div>
        </div>
        <div className="taskChart-box">
          <div id="taskChart"></div>
        </div>
      </div>
    </div>
  )
}

export default TaskChart
