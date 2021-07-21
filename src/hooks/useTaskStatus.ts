// 任务状态,pending: 等在中; running: 计算中; failed: 失败; success: 成功
import { useTranslation } from 'react-i18next'

const useStatus = (status: string) => {
  const { t } = useTranslation()
  switch (status) {
    case "pending":
      return t('common.connectFailed')
    case "running":
      return t('common.powerdisable')
    case "failed":
      return t('common.powerenable')
    case "success":
      return t('common.powerOccupied')
    default:
      break;
  }
}

export default useStatus