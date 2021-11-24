import { FC, useState } from "react";
import { useTranslation } from 'react-i18next'
import {
  Button, Form, Input
} from 'antd'
import { WarningFilled } from '@ant-design/icons'

const StepThree: FC<any> = (props) => {
  const { t, i18n } = useTranslation(),
    [status, setStatus] = useState(false)
  return <>
    <p className="title center">
      {t('DidApplication.SetYourStepThreeTitle')}
    </p>
    <div className="metis-internet-status center">
      <p>
        <span className="status-lable">{t('DidApplication.MetisInternerStatu')}:</span>

        {status ?
          <span className="error">{t('DidApplication.MetisInternerStatuError')}</span> :
          <span className="success">{t('DidApplication.MetisInternerStatuSuccess')}</span>}
      </p>
      {status ? <p className="operation-tips-error">
        <WarningFilled />

        {t('DidApplication.MetisInternerOperationError')}
      </p> :
        <p className="operation-tips-success">
          {t('DidApplication.MetisInternerOperation')}
        </p>}
    </div>
    <div className="center">
      <Button type="primary" className="but">
        {t('DidApplication.MetisInternerOperationSubmit')}
      </Button>
      <Button className="but" onClick={_ => console.log(1)}>
        {t('DidApplication.MetisInternerOperationLater')}
      </Button>
    </div>
  </>
}

export default StepThree