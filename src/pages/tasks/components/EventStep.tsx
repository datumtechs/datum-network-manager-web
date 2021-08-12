import React, { FC, useState } from 'react'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { formatDuring } from '../../../utils/utils'

const StepIcon: FC<any> = (props: any) => {
  return <div className={`step-icon ${props.scolor}`}></div>
}
const fmtTime = time => {
  return time ? dayjs(time).format('HH:mm:ss') : ''
}
const LastStep: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { status, endAt, startAt } = props

  // const endAt = 1628734150000
  // const startAt = 1627783750000
  console.log(endAt, 'endAt')
  console.log(startAt, 'startAt')

  return (
    <>
      <p>
        {status === 'running' ? t('task.step.computing') : ''}
        {status === 'failed' ? t('task.step.computationFailed') : ''}
      </p>
      {status === 'success' ? (
        <p>
          {t('task.step.timeSpent')}: &nbsp;{formatDuring(endAt - startAt)}
        </p>
      ) : (
        ''
      )}
    </>
  )
}

const EventStep: FC<any> = (props: any) => {
  const stsMap = { pending: 0, running: 1, failed: 2, success: 2 }
  const stepMap = new Map([
    ['running', 2],
    ['pending', 2],
    ['failed', 2],
    ['success', 3],
  ])
  const { status = 'running', createAt, startAt, endAt, duration } = props.data
  const { Step } = Steps
  const { t } = useTranslation()

  return (
    <div>
      <Steps
        size="small"
        labelPlacement="vertical"
        current={status ? stepMap.get(status) : stepMap.get('running')}
        className="task-step"
      >
        <Step title={fmtTime(createAt)} icon={<StepIcon scolor="active" />} description={t('task.step.start')} />
        <Step
          title={fmtTime(startAt)}
          // icon={<StepIcon scolor={stepMap.get(status)[status] > 0 ? 'active' : ''} />}
          icon={<StepIcon scolor="active" />}
          description={t('task.step.beginCompute')}
        />
        <Step
          title={fmtTime(endAt)}
          icon={<StepIcon scolor={(status === 'failed' && 'fail') || (status === 'success' && 'active')} />}
          description={<LastStep status={status} startAt={startAt} endAt={endAt} />}
        />
      </Steps>
    </div>
  )
}

export default EventStep
