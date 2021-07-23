
import { useTranslation } from 'react-i18next'

const useStatus = (status: number | string) => {
  const { t } = useTranslation()
  switch (status) {
    case "-1":
      return t('common.connectFailed')// 网络连接失败;
    case "0":
      return t('common.powerdisable') // 算力未启用(网络已连接);
    case "1":
      return t('common.powerenable') // 算力已启用（空闲）;
    case "2":
      return t('common.powerOccupied') // 算力已占用(计算服务算力正在被任务占用);
    default:
      break;
  }
}

export default useStatus