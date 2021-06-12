import React, { FC, useState, useEffect } from 'react'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'

const EventStep: FC<any> = (props: any) => {
  const { Step } = Steps
  const { t } = useTranslation()
  const [curStep, setCurStep] = useState(1)
  const [curStatus, setCurStatus] = useState("")
  const initStep = () => {

  }
  return (
    <div>
      <Steps size="small" labelPlacement="vertical" current={curStep}>
        <Step title={t('step.taskStarted')} subTitle="" description="2020-03-13 10:01:23" />
        <Step title={t('step.authFailed')} subTitle="" description="2020-03-13 10:01:23" />
        <Step title={t('step.pending')} subTitle="" description="2020-03-13 10:01:23" />
        <Step title={`${t('step.authCompleted')},${t('step.computeStarted')} `} subTitle="" description="2020-03-13 10:01:23" />
        <Step title={`${t('step.computeSuccess')},${t('step.timeSpent')}`} subTitle="" description="2020-03-13 10:01:23" />
        <Step title={t('step.computing')} subTitle="" description="2020-03-13 10:01:23" />
        <Step title={t('step.computeFailed')} subTitle="" description="2020-03-13 10:01:23" />
      </Steps>
    </div>
  )
}

export default EventStep
