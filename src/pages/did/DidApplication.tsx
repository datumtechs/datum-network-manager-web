import { FC, useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  Form,
  Steps
} from 'antd'
import { BaseInfoContext } from '@/layout/index'
import { useHistory } from 'react-router-dom'
import './scss/did.scss'
import StepOne from './components/StepOne'
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
  const status = props?.location?.state?.status || 0
  const NetworkStatus = props?.location?.state?.NetworkStatus || 0
  const baseInfo = useContext(BaseInfoContext)
  const history = useHistory()

  useEffect(() => {
    if (!baseInfo.identityId && !status) {
      props.setIsReg(true)
      isLink(0)
    } else {
      isLink(1)
      props.setIsReg(false)
    }
  }, [])

  const isLink = (num) => {
    if (NetworkStatus) {
      history.push('/userCenter/userInfo')
      return
    }
    setCurrent(num)
  }


  return (
    <div className="layout-box did-box">
      <div className="didAppication-step">
        <Steps current={current} labelPlacement="vertical">
          {[t('UserCenter.ProcessStepOne'), t('UserCenter.ProcessStepTwo'), t('UserCenter.ProcessStepThree'),].map((_, i) => <Step key={i} title={_} />)}
        </Steps>
      </div>
      <div className="form-box">
        <Form
          layout={'horizontal'}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}>
          {
            current == 0 ?
              <StepOne baseInfo={baseInfo} setCurrent={isLink} />
              :
              current == 1 ?
                <StepTwo baseInfo={baseInfo} setCurrent={isLink} />
                :
                current > 1 ? <StepThree baseInfo={baseInfo} /> : ''
          }
        </Form>
      </div>
    </div>
  )
}
export default connect((state: any) => ({ state }), mapDispatchToProps)(DidApplication)
