
import React, { FC } from 'react'
import { Space, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import EventTable from './components/EventTable'
import EventStep from './components/EventStep'
import './scss/index.scss'

export const TaskEvent: FC<any> = () => {
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const linkReturn = () => {
    history.go(-1)
  }
  const linkToDetail = () => {
    history.push('/tasks/taskDetail')
  }
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
          <Button className={`${i18n.language === 'en' ? 'btn-en' : 'btn'}`} size="large" onClick={linkReturn}>
            {t('common.return')}
          </Button>
          <Button className={`${i18n.language === 'en' ? 'btn-en' : 'btn'}`} size="large" type="primary" onClick={linkToDetail}>
            {t('task.viewDetail')}
          </Button>
        </Space>
      </div>
    </div>
  )
}
