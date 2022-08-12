import { FC, useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { BaseInfoContext } from '@/layout/index'
import { useHistory } from 'react-router-dom'
import './scss/did.scss'
import StepOne from './components/StepOne'
import { StepTwo } from './components/StepTwo'
import StepThree from './components/StepThree'
import Recharge from './components/Recharge'
import {
  Form,
  Steps
} from 'antd'


const mapDispatchToProps = (dispatch: any) => ({
  setIsReg: (data) => {
    dispatch({
      type: 'SET_ISREG',
      data
    })
  },
  InfoCompleteness: (data) => {
    dispatch({
      type: 'INFO_COMPLETENESS',
      data
    })
  }
})


const DidApplication: FC<any> = (props) => {
  const { t } = useTranslation(),
    { Step } = Steps,
    [current, setCurrent] = useState(props?.state?.InfoCompleteness?.orgInfoCompletionLevel)
  const NetworkStatus = props?.location?.state?.NetworkStatus || 0
  const baseInfo = useContext(BaseInfoContext)
  const history = useHistory()
  const [observeBalance, setObserveBalance] = useState('0')

  useEffect(() => {
    if (!baseInfo.identityId && current <= 2) {
      props.setIsReg(false)
    } else {
      props.setIsReg(true)
    }
    isLink(current)

    if (props?.state?.InfoCompleteness?.connectNetworkStatus) {
      history.push('/')
    }
  }, [])

  useEffect(() => {
    getBalance()
  }, [baseInfo])

  const isLink = async (num) => {
    if (NetworkStatus) {
      history.push('/userCenter/userInfo')
      return
    }
    setCurrent(num)
  }

  const getBalance = async () => {
    const { wallet } = props.state.wallet || {}
    const { web3 } = wallet
    if (!baseInfo?.observerProxyWalletAddress) return
    const balance = await web3.eth.getBalance(baseInfo?.observerProxyWalletAddress)
    setObserveBalance(balance)
  }


  const setInfoCompleteness = (orgInfoCompletionLevel,
    connectNetworkStatus) => {
    props.InfoCompleteness({
      orgInfoCompletionLevel,
      connectNetworkStatus
    })
  }


  return (
    <div className="layout-box p-20 did-box" style={{ minHeight: "730px" }}>
      <div className="didAppication-step">
        <Steps initial={1} current={current} labelPlacement="vertical" onChange={setCurrent}>
          {[t('UserCenter.ProcessStepOne'), t('UserCenter.ProcessStepTwo'), t('UserCenter.ProcessStepThree'), t('UserCenter.ProcessStepFour')].map((_, i) => <Step key={i} title={_} />)}
        </Steps>
      </div>
      <div className="form-box">
        <Form
          layout={'horizontal'}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}>
          {
            current == 1 ?
              <StepOne baseInfo={baseInfo} setCurrent={isLink} InfoCompleteness={setInfoCompleteness} />
              :
              current == 2 ?
                <Recharge baseInfo={baseInfo} state={props.state} observeBalance={observeBalance} setCurrent={isLink} getBalance={getBalance} InfoCompleteness={setInfoCompleteness} /> :
                current == 3 ?
                  <StepTwo baseInfo={baseInfo} setCurrent={isLink} InfoCompleteness={setInfoCompleteness} />
                  :
                  current == 4 ? <StepThree baseInfo={baseInfo} InfoCompleteness={setInfoCompleteness} /> : ''
          }
        </Form>
      </div>
    </div>
  )
}
export default connect((state: any) => ({ state }), mapDispatchToProps)(DidApplication)
