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
        props.InfoCompleteness(2, 1)
        noConnect()
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
    <div className="Datum-internet-status center">
      <p>
        <span className="status-lable">{t('DidApplication.DatumInternerStatu')}:</span>
        {props?.baseInfo?.carrierConnStatus !== 'enabled' ?
          <span className="error">{t('DidApplication.DatumInternerStatuError')}</span> :
          <span className="success">{t('DidApplication.DatumInternerStatuSuccess')}</span>}
      </p>
      {props?.baseInfo?.carrierConnStatus !== 'enabled' ? <p className="operation-tips-error">
        <WarningFilled />

        {t('DidApplication.DatumInternerOperationError')}
      </p> :
        <p className="operation-tips-success">
          {t('DidApplication.DatumInternerOperation')}
        </p>}
    </div>
    <div className="center">
      <Button type="primary" className="but" onClick={connect}>
        {t('DidApplication.DatumInternerOperationSubmit')}
      </Button>
      <Button className="but" onClick={noConnect}>
        {t('DidApplication.DatumInternerOperationLater')}
      </Button>
    </div>
  </>
}

export default StepThree