
import { useTranslation } from 'react-i18next'

const UseCredentialStatus = (status: number | string) => {
  const s = Number(status)
  const { t } = useTranslation()
  switch (s) {
    // 0-未发布，1-发布中，2-发布失败，3-发布成功，4-定价中，5-定价失败，
    // 6-定价成功，7-绑定中，8-绑定失败，9-绑定成功
    case 1:
      return t('credential.Publishing');
    case 2:
      return t('credential.PublishingFailed');
    case 3:
      return t('credential.PublishingSuccess');
    case 4:
      return t('credential.Pricing');
    case 5:
      return t('credential.PricingFailed');
    case 6:
      return t('credential.PricingSuccess');
    case 7:
      return t('credential.Binding');
    case 8:
      return t('credential.BindingFailed');
    case 9:
      return t('credential.BindingSuccess');
    default:
      break;
  }
}

export default UseCredentialStatus