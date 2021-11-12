import React, { FC, useState } from 'react'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { formatDuring } from '@utils/utils'

const StepIcon: FC<any> = (props: any) => {
  return <div className={`step-icon ${props.scolor}`}></div>
}
const fmtTime = time => {
  return time ? dayjs(time).format('HH:mm:ss') : ''
}
const LastStep: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const { status, endAt, startAt } = props
  console.log(dayjs(endAt).valueOf(), dayjs(startAt).valueOf());
  return (
    <>
      <p>
        {status === 2 ? t('task.step.computing') : ''}
        {status === 3 ? t('task.step.computationFailed') : ''}
      </p>
      {status === 4 ? (
        <p>
          {t('task.step.timeSpent')}: &nbsp;{formatDuring(dayjs(endAt).valueOf() - dayjs(startAt).valueOf())}
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
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 3],
  ])
  const { status = 'running', createAt, startAt, endAt, duration } = props.data
  // console.log(status, 'status,status,status');

  const { Step } = Steps
  const { t } = useTranslation()

  return (
    <Steps
      size="small"
      labelPlacement="vertical"
      current={status ? stepMap.get(status) : stepMap.get(1)}
      className="task-step"
    >
      <Step title={fmtTime(createAt)} icon={<StepIcon scolor="active" />} description={t('task.step.start')} />
      <Step
        title={fmtTime(startAt)}
        icon={<StepIcon scolor="active" />}
        description={t('task.step.beginCompute')}
      />
      <Step
        title={fmtTime(endAt)}
        className={status === 3 ? 'step-error' : ''}
        icon={<StepIcon scolor={status === 4 ? 'active' : ''} />}
        description={<LastStep status={status} startAt={startAt} endAt={endAt} />}
      />
    </Steps>
  )
}

export default EventStep
