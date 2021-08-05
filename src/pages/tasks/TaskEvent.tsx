import React, { FC, useState, useEffect } from 'react'
import { Space, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import EventTable from './components/EventTable'
import EventStep from './components/EventStep'
import './scss/index.scss'
import { taskApi } from '../../api/index'

export const TaskEvent: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { id } = props.location.state
  const history = useHistory()
  const linkReturn = () => {
    history.go(-1)
  }
  const linkToDetail = () => {
    history.push({
      pathname: '/tasks/taskDetail',
      state: {
        id,
      },
    })
  }

  const [baseInfo, setBaseInfo] = useState({
    createAt: '',
    startAt: '',
    status: '',
    endAt: '',
    taskId: '',
    taskName: '',
    duration: '',
    id: 0,
  })

  useEffect(() => {
    taskApi.querytaskInfo(id).then(res => {
      if (res.status === 0 && res.data) {
        setBaseInfo(res.data)
      }
    })
  }, [])
  return (
    <div className="layout-box">
      <div className="progress-box">
        <div className="progress">
          <div className="left">
            <p className="name">
              <span>{t('task.taskName')}:&nbsp;</span>
              <span>{baseInfo.taskName}</span>
            </p>
            <p className="id">
              <span>ID:&nbsp;</span>
              <span>{baseInfo.taskId}</span>
            </p>
          </div>
          <div className="right">
            <EventStep data={baseInfo} />
          </div>
        </div>
      </div>
      <div className="event-table-box">
        <EventTable id={id} />
      </div>
      <div className="btn-box">
        <Space size={40}>
          <Button className={`${i18n.language === 'en' ? 'btn-en' : 'btn'}`} size="large" onClick={linkReturn}>
            {t('common.return')}
          </Button>
          <Button
            className={`${i18n.language === 'en' ? 'btn-en' : 'btn'}`}
            size="large"
            type="primary"
            onClick={linkToDetail}
          >
            {t('task.viewDetail')}
          </Button>
        </Space>
      </div>
    </div>
  )
}
