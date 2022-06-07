import { FC, useEffect, useState } from 'react'
import { Space, Button, Descriptions, Tooltip, Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { fileSizeChange, formatDuring ,newChangeSizeFn} from '@utils/utils'
import { taskApi } from '@api/index'

import ProviderTable from './components/ProviderTable'
import ComputingTable from './components/ComputingTable'
import EventStep from './components/EventStep'
import './scss/index.scss'
import MyTaskStatusBar from '../myData/DataMgt/components/MyTaskStatusBar'


export const TaskDetail: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const history = useHistory()

  const { state } = props.location
  const { taskId, taskName } = state || { taskId: '', taskName: '' }
  if (!taskId) {
    history.push({
      pathname: '/tasks',
    })
  }

  const linkReturn = () => {
    history.go(-1)
  }
  const linkToEvent = () => {
    history.push({
      pathname: history.location.pathname.replace('taskDetail', 'TaskEvent'),
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
      dynamicFields: {}
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
    ownerList: [],
    receiversList: []
  })
  useEffect(() => {

    taskApi.querytaskInfo(taskId).then(res => {
      if (res.status === 0 && res.data) {
        const obj = { ...res.data }
        obj.ownerList = [{
          dynamicFields: {
            orgName: res.data?.owner?.orgName,
            carrierNodeId: res.data?.owner?.carrierNodeId,
          },
          identityId: res.data?.owner?.identityId,
          partyId: res.data?.ownerPartyId
        }]
        obj.receiversList = obj?.receivers.map(v => {
          return {
            ...v,
            partyId: v?.consumerPartyId,
            identityId: v?.consumerIdentityId,
          }
        })
        obj.algoSupplierList = [{ ...obj.algoSupplier }]

        setBaseInfo(obj)
      }
    })
  }, [])

  const role = obj => {
    return Object.keys(obj).map((v) => {
      if (!obj[v]) return ''
      return <MyTaskStatusBar key={v} role={v} width={150} margin={1} />
    })
  }


  return (
    <div className="layout-box">
      <div className="add-data-box">
        <div className="task-progress-box tesk-details">
          <div className="task-progress-left-box">
            <div className="top-title-box">
              <p className="title">{t('task.taskName')}:&nbsp;&nbsp;</p>
              < p > {taskName}</p>
            </div>
            <div className="top-title-box ">
              <p className="title">ID:&nbsp;&nbsp;</p>
              <p className="tesk-details-id datail-box-content">{taskId}</p>
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
                <span >{fileSizeChange(baseInfo.costBandwidth)}ps</span>
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
              {role(baseInfo?.dynamicFields || {})}
            </Form.Item>
          </Form>
        </div>
        <div className="sub-info-box">
          {/* 任务发起方 */}
          <div className="title-label">{t('task.sponsor')}</div>
          <ProviderTable key="ownerList" type="sponsor" tableData={baseInfo.ownerList} />
        </div>
        <div className="sub-info-box">
          {/* 结果使用方 */}
          <div className="title-label">{t('task.receiver')}</div>
          <ProviderTable key="receiversList" type="receiver" tableData={baseInfo.receiversList} />
        </div>
        <div className="sub-info-box">
          {/* 算力提供方 */}
          <div className="title-label">{t('task.powerProvider')}</div>
          <ComputingTable tableData={baseInfo.powerSupplier} />
        </div>
        <div className="sub-info-box">
          {/* 数据提供方 */}
          <div className="title-label">{t('task.dataProvider')}</div>
          <ProviderTable key="dataSupplier" type="dataSupplier" tableData={baseInfo.dataSupplier} />
        </div>
        <div className="sub-info-box">
          {/* 算法提供方 */}
          <div className="title-label">{t('task.algorithmProvider')}</div>
          <ProviderTable key="algoSupplierList" type="algorithmProvider" tableData={baseInfo.algoSupplierList} />
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
