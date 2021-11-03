import { FC, useEffect, useState } from 'react'
import { Space, Button, Descriptions, Tooltip, Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import ProviderTable from './components/ProviderTable'
import ComputingTable from './components/ComputingTable'
import { taskApi } from '../../api/index'
import EventStep from './components/EventStep'
import UseTimeChange from '../../hooks/useTimeChange'
import './scss/index.scss'
import { fileSizeChange, formatDuring } from '../../utils/utils'
import useCapacity from '../../hooks/useCapacity'

export const TaskDetail: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const history = useHistory()

  const { state: { taskId = '', taskName = '' } } = props.location
  const linkReturn = () => {
    history.go(-1)
  }
  const linkToEvent = () => {
    history.push({
      pathname: '/tasks/TaskEvent',
      state: {
        taskId,
        taskName
      },
    })
  }
  const [baseInfo, setBaseInfo] = useState<any>({
    algoSupplier: {
      carrierNodeId: '',
      nodeIdentityId: '',
      nodeName: '',
    },
    costBandwidth: 0,
    costCore: 0,
    costMemory: 0,
    createAt: '',
    dataSupplier: [
      {
        carrierNodeId: '',
        metaDataId: '',
        metaDataName: '',
        nodeIdentityId: '',
        nodeName: '',
      },
    ],
    duration: '',
    endAt: '',
    id: 0,
    owner: {
      carrierNodeId: '',
      nodeIdentityId: '',
      nodeName: '',
    },
    powerSupplier: [
      {
        carrierNodeId: '',
        nodeIdentityId: '',
        nodeName: '',
        usedBandwidth: '',
        usedCore: '',
        usedMemory: '',
      },
    ],
    receivers: [
      {
        carrierNodeId: '',
        nodeIdentityId: '',
        nodeName: '',
      },
    ],
    reviewed: false,
    role: 0,
    startAt: '',
    status: '',
    taskId: '',
    taskName: '',
  })
  useEffect(() => {
    taskApi.querytaskInfo(taskId).then(res => {
      if (res.status === 0 && res.data) {
        setBaseInfo(res.data)
      }
    })
  }, [])
  return (
    <div className="layout-box">
      <div className="add-data-box">
        <div className="task-progress-box">
          <div className="task-progress-left-box">
            <div className="top-title-box">
              <p className="title">{t('task.taskName')}:&nbsp;&nbsp;</p>
              < p > {taskName}</p>
            </div>
            <div className="top-title-box">
              <p className="title">ID:&nbsp;&nbsp;</p>
              <p>{taskId}</p>
            </div>
          </div>
          <div className="progress-box">
            <div className="progress">
              <EventStep data={baseInfo} />
            </div>
          </div>
        </div>
        <div className="sub-info-box" >
          <div className="sub-title-box">{t('task.initialInfo')}</div>
          <Form labelAlign="left" className="pl12"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 14 }}>
            <Form.Item label={t('task.initialAccount')}>
              <div className="value-text">{baseInfo.applyUser}</div>
            </Form.Item>
            <Form.Item label={t('task.timeRequire')}>
              <div className="value-text">{formatDuring(baseInfo.duration)}</div>
            </Form.Item>
            <Form.Item label={t('task.computeRequire')}>
              <p className="value-text">
                <span>{t('overview.cpu')}&nbsp;: &nbsp; </span>
                <span>
                  {baseInfo.costCore} &nbsp; {t('overview.core')}
                </span>
              </p>
              <p className="value-text">
                <span>{t('overview.memory')}&nbsp;: &nbsp; </span>
                <span >{fileSizeChange(baseInfo.costMemory)}</span>
              </p>
              <p className="value-text">
                <span>{t('overview.bandwidth')}&nbsp;: &nbsp; </span>
                <span >{fileSizeChange(baseInfo.costBandwidth)}P/S</span>
              </p>
            </Form.Item>
          </Form>
        </div>
        <div className="sub-info-box">
          <div className="sub-title-box">{t('task.partiesInformation')}</div>
          <Form labelAlign="left" className="pl12"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 14 }}>
            <Form.Item label={t('task.myCapacity')}>
              <div className="value-text">{useCapacity(baseInfo.role)}</div>
            </Form.Item>
          </Form>
        </div>
        <div className="sub-info-box">
          <div className="title-label">{t('task.sponsor')}</div>
          <ProviderTable type="sponsor" tableData={baseInfo.dataSupplier} />
        </div>
        <div className="sub-info-box">
          <div className="title-label">{t('task.receiver')}</div>
          <ProviderTable type="receiver" tableData={baseInfo.dataSupplier} />
        </div>
        <div className="sub-info-box">
          <div className="title-label">{t('task.powerProvider')}</div>
          <ComputingTable tableData={baseInfo.powerSupplier} />
        </div>
        <div className="sub-info-box">
          <div className="title-label">{t('task.dataProvider')}</div>
          <ProviderTable type="dataSupplier" tableData={baseInfo.dataSupplier} />
        </div>
        <div className="sub-info-box">
          <div className="title-label">{t('task.algorithmProvider')}</div>
          <ProviderTable type="algorithmProvider" tableData={baseInfo.dataSupplier} />
        </div>
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
            onClick={linkToEvent}
          >
            {t('task.viewEvent')}
          </Button>
        </Space>
      </div>
    </div >
  )
}
