import React, { FC } from 'react'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'

const EventStep: FC<any> = () => {
  const { Step } = Steps
  // const { t } = useTranslation()
  return (
    <div>
      <Steps size="small" current={1}>
        <Step title="Finished" />
        <Step title="In Progress" />
        <Step title="Waiting" />
      </Steps>
      ,
    </div>
  )
}

export default EventStep
