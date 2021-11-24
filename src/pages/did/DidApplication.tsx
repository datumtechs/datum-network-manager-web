import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Form,
  Steps
} from 'antd'
import './scss/did.scss'
import { StepOne } from './components/StepOne'
import { StepTwo } from './components/StepTwo'
import StepThree from './components/StepThree'

export const DidApplication: FC<any> = () => {
  const { t } = useTranslation(),
    { Step } = Steps,
    [current, setCurrent] = useState(0)

  return (
    <div className="layout-box did-box">
      <div className="didAppication-step">
        <Steps current={current} labelPlacement="vertical">
          {[t('UserCenter.ProcessStepOne'), t('UserCenter.ProcessStepTwo'), t('UserCenter.ProcessStepThree'),].map((_, i) => <Step key={i} title={_} onClick={_ => setCurrent(i)} />)}
        </Steps>
      </div>
      <div className="form-box">
        <Form
          layout={'horizontal'}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}>
          {
            current === 0 ?
              <StepOne />
              :
              current === 1 ?
                <StepTwo setCurrent={setCurrent} />
                :
                current === 2 ? <StepThree /> : ''
          }
        </Form>
      </div>
    </div>
  )
}
