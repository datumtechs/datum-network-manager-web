
import { useTranslation } from 'react-i18next'

const useStatus = (status: number | string) => {
  const s = Number(status)
  const { t } = useTranslation()
  switch (s) {
    case 0:
      return t('common.connectSuccess')// 网络连接成功;
    case -1:
      return t('common.connectFailed') // 网络连接失败
    default:
      break;
  }
}

export default useStatus