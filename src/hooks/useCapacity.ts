
import { useTranslation } from 'react-i18next'
// 0: 未定义; 1: 发起方; 2: 数据提供方; 3: 计算参与方; 4: 结果提供方
const useCapacity = (status: number | string) => {
  const s = Number(status)
  const { t } = useTranslation()
  switch (s) {
    case 1:
      return t('task.sponsor') // 任务发起方
    case 2:
      return t('task.dataProvider') // 数据提供方
    case 3:
      return t('task.powerProvider') // powerProvider
    case 4:
      return t('task.receiver') // 结果接收方
    case 5:
      return t('task.algorithmProvider')  // 算法提供方
    default:
      break;
  }
}

export default useCapacity