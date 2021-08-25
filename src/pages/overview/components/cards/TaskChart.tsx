import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

const TaskChart: FC<any> = (props: any) => {
  const { t } = useTranslation()
  useEffect(() => {
    const chart = echarts.init(document.getElementById('taskChart'))
    const option = {
      color: ['#63C7BB', '#F167A8', '#F29201', '#657ACD'],
      grid: { left: '0%', top: '10%', right: '10%', bottom: '10%' },
      title: {
        zlevel: 0,
        text: `a1a1a1`,
        subtext: `${t('task.tasks')}`,
        top: '50%',
        left: '50%',
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
          radius: ['73%', '85%'],
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
            { value: 1048, name: t('task.success') },
            { value: 735, name: t('task.computing') },
            { value: 580, name: t('task.pending') },
            { value: 484, name: t('task.failed') },
          ],
        },
      ],
    }
    chart.setOption(option)
  }, [])
  return (
    <div className="overview-tasks item">
      <div className="overview-tasks-title">{t('overview.myTask')}</div>
      <div className="taskChart-box">
        <div id="taskChart"></div>
      </div>
      <div className="overview-tasks-detail">
        <div className="detail-line">
          <div className="left">
            <span className="logo logo-success"></span>
            <span className="type">{t('task.success')}</span>
          </div>
          <div className="value">600</div>
        </div>
        <div className="detail-line">
          <div className="left">
            <span className="logo logo-pending"></span>
            <span className="type">{t('task.pending')}</span>
          </div>
          <div className="value">90</div>
        </div>
        <div className="detail-line">
          <div className="left">
            <span className="logo logo-failed"></span>
            <span className="type">{t('task.failed')}</span>
          </div>
          <div className="value">10</div>
        </div>
        <div className="detail-line">
          <div className="left">
            <span className="logo logo-computing"></span>
            <span className="type">{t('task.computing')}</span>
          </div>
          <div className="value">300</div>
        </div>
      </div>
    </div>
  )
}

export default TaskChart
