import React, { FC, useEffect, useState } from 'react'
import { Space, Button, Descriptions } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import ProviderTable from './components/ProviderTable'
import ComputingTable from './components/ComputingTable'
import { taskApi } from '../../api/index'
import EventStep from './components/EventStep'
import UseTimeChange from '../../hooks/useTimeChange'
import './scss/index.scss'
import { fileSizeChange } from '../../utils/utils'

export const TaskDetail: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const { id } = props.location.state
  const linkReturn = () => {
    history.go(-1)
  }
  const linkToEvent = () => {
    history.push({
      pathname: '/tasks/TaskEvent',
      state: {
        id,
      },
    })
  }
  const [baseInfo, setBaseInfo] = useState({
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
              <span>ID: &nbsp;</span>
              <span>{baseInfo.taskId}</span>
            </p>
          </div>
          <div className="right">
            <EventStep data={baseInfo} />
          </div>
        </div>
      </div>
      <div className="info-box" style={{ width: '50%' }}>
        <Descriptions labelStyle={{ width: '50%' }} column={1} title={t('task.initialInfo')} bordered>
          <Descriptions.Item labelStyle={{ padding: '0 20px', width: '100px' }} label={t('task.timeRequire')}>
            {/* {baseInfo.duration} */}
            {UseTimeChange(baseInfo.duration)}
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('task.computeRequire')}>
            {/* TODO 根据不同角色显示不同的资源 算力提供方：显示计算节点信息 数据提供方：显示数据信息 */}
            <div>
              <p>
                <span>{t('overview.cpu')}&nbsp;:&nbsp;</span>
                <span>{baseInfo.costCore}</span>
              </p>
              <p>
                <span>{t('overview.memory')}&nbsp;:&nbsp;</span>
                <span>{fileSizeChange(baseInfo.costMemory)}</span>
              </p>
              <p>
                <span>{t('overview.bandwidth')}&nbsp;:&nbsp;</span>
                <span>{fileSizeChange(baseInfo.costBandwidth)}PS</span>
              </p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="info-box">
        <Descriptions column={2} title={`${t('task.myCapacity')} : ${t(`task.role.${baseInfo.role}`)}`}>
          {/* TODO 此处按照要求不展示具体信息 */}
          {/* {baseInfo.role === 3 &&
            baseInfo.powerSupplier.map(item => {
              return (
                <>
                  <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('overview.computeNode')}>
                    {item.nodeName}
                  </Descriptions.Item>
                  <Descriptions.Item labelStyle={{ padding: '0 20px' }} label="ID">
                    {item.nodeIdentityId}
                  </Descriptions.Item>
                </>
              )
            })}
          {baseInfo.role === 2 &&
            baseInfo.dataSupplier.map(item => {
              return (
                <>
                  <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('task.sourceFile')}>
                    {item.metaDataName}
                  </Descriptions.Item>
                  <Descriptions.Item labelStyle={{ padding: '0 20px' }} label="ID">
                    {item.metaDataId}
                  </Descriptions.Item>
                </>
              )
            })} */}
        </Descriptions>
      </div>
      <div className="info-box" style={{ width: '50%' }}>
        <Descriptions column={1} title={t('task.partiesInformation')} bordered>
          <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('task.sponsor')}>
            <span className="node-name">{baseInfo.owner.nodeName}</span>
            <span>
              {t('task.identity')}: {baseInfo.owner.nodeIdentityId}
            </span>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('task.receiver')}>
            <ul>
              {baseInfo.receivers.map((item, index) => {
                return (
                  <li key={item.nodeIdentityId}>
                    <span className="node-name">{item.nodeName}</span>
                    <span>
                      {t('task.identity')}: {item.nodeIdentityId}
                    </span>
                  </li>
                )
              })}
            </ul>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: '0 20px' }} label={t('task.algorithmProvider')}>
            <span className="node-name">{baseInfo.algoSupplier.nodeName}</span>
            <span>
              {t('task.identity')}: {baseInfo.algoSupplier.nodeIdentityId}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="info-box">
        <div className="title-label">{t('task.dataProvider')}</div>
        <ProviderTable tableData={baseInfo.dataSupplier} />
      </div>
      <div className="info-box">
        <div className="title-label">{t('task.conputationProvider')}</div>
        <ComputingTable tableData={baseInfo.powerSupplier} />
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
    </div>
  )
}
