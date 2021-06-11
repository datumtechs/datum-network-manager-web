import { Space, Button } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import EventTable from './components/EventTable'
import EventStep from './components/EventStep'
import './scss/index.scss'

export const TaskEvent: FC<any> = () => {
  const { t } = useTranslation()
  return (
    <div className="layout-box">
      <div className="progress-box">
        <div className="progress">
          <div className="left">
            <p className="name">
              <span>{t('task.taskName')}:</span>
              <span>XXXXXXXXXXX</span>
            </p>
            <p className="id">
              <span>ID:</span>
              <span>XXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
            </p>
          </div>
          <div className="right">
            <EventStep />
          </div>
        </div>
      </div>
      <div className="event-table-box">
        <EventTable />
      </div>
      <div className="btn-box">
        <Space size={40}>
          <Button className="btn" size="large">
            {t('common.return')}
          </Button>
          <Button className="btn" size="large" type="primary">
            {t('task.viewEvent')}
          </Button>
        </Space>
      </div>
    </div>
  )
}
