import React, { FC, useState } from 'react'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

const StepIcon: FC<any> = (props: any) => {
  return <div className={`step-icon ${props.scolor}`}></div>
}

const EventStep: FC<any> = (props: any) => {
  const stsMap = { pending: 0, running: 1, failed: 2, success: 2 }
  const { status, createAt, startAt, endAt } = props.data
  const { Step } = Steps
  const { t } = useTranslation()
  const fmtTime = time => {
    console.log('time: ', time)
    return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  return (
    <div>
      <Steps size="small" labelPlacement="vertical" current={stsMap[status]} className="task-step">
        <Step title={fmtTime(createAt)} icon={<StepIcon scolor="active" />} />
        <Step title={fmtTime(startAt)} icon={<StepIcon scolor={stsMap[status] > 0 ? 'active' : ''} />} />
        <Step
          title={fmtTime(endAt)}
          icon={<StepIcon scolor={(status === 'failed' && 'fail') || (status === 'success' && 'active')} />}
        />
      </Steps>
    </div>
  )
}

export default EventStep
