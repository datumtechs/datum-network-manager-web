import { FC, useState } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Form, Input, message
} from 'antd'
import { nodeApi } from '@api/index'
import { WarningFilled } from '@ant-design/icons'

const StepThree: FC<any> = (props) => {
  const { t, i18n } = useTranslation()

  const connect = () => {
    nodeApi.applyJoinNetwork().then(res => {
      if (res.status === 0) {
        message.success(`${t('tip.joinNetworkSuccess')}`)
        noConnect()
      } else {
        message.error(`${t('tip.joinNetworkFailed')}`)
      }
    })
  }
  const noConnect = () => {
    location.href = "/overview"
  }

  return <>
    <p className="title center">
      {t('DidApplication.SetYourStepThreeTitle')}
    </p>
    <div className="metis-internet-status center">
      <p>
        <span className="status-lable">{t('DidApplication.MetisInternerStatu')}:</span>

        {!props?.baseInfo?.carrierStatus ?
          <span className="error">{t('DidApplication.MetisInternerStatuError')}</span> :
          <span className="success">{t('DidApplication.MetisInternerStatuSuccess')}</span>}
      </p>
      {!props?.baseInfo?.carrierStatus ? <p className="operation-tips-error">
        <WarningFilled />

        {t('DidApplication.MetisInternerOperationError')}
      </p> :
        <p className="operation-tips-success">
          {t('DidApplication.MetisInternerOperation')}
        </p>}
    </div>
    <div className="center">
      <Button type="primary" className="but" onClick={connect}>
        {t('DidApplication.MetisInternerOperationSubmit')}
      </Button>
      <Button className="but" onClick={noConnect}>
        {t('DidApplication.MetisInternerOperationLater')}
      </Button>
    </div>
  </>
}

export default StepThree