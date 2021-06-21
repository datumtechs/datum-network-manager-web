import React, { FC } from 'react'
import { Space, Button, Descriptions } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import ProviderTable from './components/ProviderTable'
import ComputingTable from './components/ComputingTable'
import EventStep from './components/EventStep'
import './scss/index.scss'

export const TaskDetail: FC<any> = () => {
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
      <div className="info-box">
        <Descriptions column={1} title={t('task.initialInfo')} >
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('task.timeRequire')}>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('task.computeRequire')}>
            {/* TODO 根据不同角色显示不同的资源 算力提供方：显示计算节点信息 数据提供方：显示数据信息 */}
            <div>
              <p>
                <span>CPU:</span>
                <span></span>
              </p>
              <p>
                <span>{t('task.memory')}:</span>
                <span></span>
              </p>
              <p>
                <span>{t('task.bandWidth')}:</span>
                <span></span>
              </p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="info-box">
        <Descriptions column={1} title={`${t('task.myCapacity')}`} >
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('overview.computeNode')}>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('task.sourceFile')}>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="info-box">
        <Descriptions column={1} title={t('task.partiesInformation')}  >
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('computeNodeMgt.sponsor')}>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('computeNodeMgt.receiver')}>
            <div>
              <p>1. 1111111111111</p>
              <p>2. 2222222222222</p>
              <p>3. 333333333333</p>
            </div>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ padding: "0 20px" }} label={t('task.algorithmProvider')}>Zhou Maomao</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="info-box">
        <div className="title-label">{t('task.dataProvider')}</div>
        <ProviderTable />
      </div>
      <div className="info-box">
        <div className="title-label">{t('task.conputationProvider')}</div>
        <ComputingTable />
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
