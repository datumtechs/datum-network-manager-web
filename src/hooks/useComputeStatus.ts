
import { useTranslation } from 'react-i18next'

import errorSvg from '../assets/images/11.icon1.svg'
import warnSvg from '../assets/images/10.icon1.svg'
import freeSvg from '../assets/images/23.icon3.svg'
import enableSvg from '../assets/images/23.icon4.svg'


const useStatus = (connStatus: number | string, powerStatus: number | string) => {
  const { t } = useTranslation()
  const obj = { content: '', img: '' }
  if (connStatus === 0) {
    // 未连接
    obj.content = t('common.connectFailed') // 网络连接失败;
    obj.img = errorSvg
  } else if (connStatus === 1) {
    switch (powerStatus) {
      case 1:
        obj.content = t('common.powerdisable') // 算力未启用(网络已连接);
        obj.img = warnSvg
        break
      case 2:
        obj.content = t('common.powerenable') // 算力已启用（空闲）;
        obj.img = freeSvg
        break
      case 3:
        obj.content = t('common.powerOccupied') // 算力已启用（空闲）;
        obj.img = enableSvg
        break
      case 4:
        obj.content = t('common.powerdisable') // 算力未启用(网络已连接);
        obj.img = warnSvg
        break
      case 5:
        obj.content = t('common.InRelease') // 发布中(网络已连接);
        obj.img = warnSvg
        break
      case 6:
        obj.content = t('common.Withdrawing') // 撤回中(网络已连接);
        obj.img = warnSvg
        break
      default:
        break;
    }
  }
  return obj
}

export default useStatus