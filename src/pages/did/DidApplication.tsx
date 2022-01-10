import { FC, useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  Form,
  Steps
} from 'antd'
import { BaseInfoContext } from '@/layout/index'
import './scss/did.scss'
import { StepOne } from './components/StepOne'
import { StepTwo } from './components/StepTwo'
import StepThree from './components/StepThree'


const mapDispatchToProps = (dispatch: any) => ({
  setIsReg: (data) => {
    dispatch({
      type: 'SET_ISREG',
      data
    })
  }
})


const DidApplication: FC<any> = (props) => {
  const { t } = useTranslation(),
    { Step } = Steps,
    [current, setCurrent] = useState(0)
  const { status } = props?.location?.state || { status: 2 }
  const baseInfo = useContext(BaseInfoContext)


  useEffect(() => {
    setCurrent(status)
    // console.log(props);
    if (status < 1) {
      props.setIsReg(false)
      console.log(11);
    } else {
      props.setIsReg(false)
      console.log(22);

    }
  }, [status])

  // historyChange()


  return (
    <div className="layout-box did-box">
      <div className="didAppication-step">
        <Steps current={current} labelPlacement="vertical">
          {/* {[t('UserCenter.ProcessStepOne'), t('UserCenter.ProcessStepTwo'), t('UserCenter.ProcessStepThree'),].map((_, i) => <Step key={i} title={_} onClick={_ => setCurrent(i)} />)} */}
          {[t('UserCenter.ProcessStepOne'), t('UserCenter.ProcessStepTwo'), t('UserCenter.ProcessStepThree'),].map((_, i) => <Step key={i} title={_} />)}
        </Steps>
      </div>
      <div className="form-box">
        <Form
          layout={'horizontal'}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}>
          {
            current === 0 ?
              <StepOne baseInfo={baseInfo} setCurrent={setCurrent} />
              :
              current === 1 ?
                <StepTwo baseInfo={baseInfo} setCurrent={setCurrent} />
                :
                current > 1 ? <StepThree baseInfo={baseInfo} /> : ''
          }
        </Form>
      </div>
    </div>
  )
}
export default connect((state: any) => ({ state }), mapDispatchToProps)(DidApplication)
