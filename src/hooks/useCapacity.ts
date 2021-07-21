
import { useTranslation } from 'react-i18next'
// 0: 未定义; 1: 发起方; 2: 数据提供方; 3: 计算参与方; 4: 结果提供方
const useCapacity = (status: number | string) => {
  const s = Number(status)
  const { t } = useTranslation()
  switch (s) {
    case 1:
      return t('computeNodeMgt.sponsor') // 算力未启用(网络已连接);
    case 2:
      return t('task.dataProvider') // 算力已启用（空闲）;
    case 3:
      return t('task.powerOccupied') // 算力已占用(计算服务算力正在被任务占用);
    case 4:
      return t('task.powerOccupied') // 算力已占用(计算服务算力正在被任务占用);
    default:
      break;
  }
}

export default useCapacity