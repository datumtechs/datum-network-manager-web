
import { useTranslation } from 'react-i18next'

import errorSvg from '../assets/images/11.icon1.svg'
import warnSvg from '../assets/images/10.icon1.svg'
import freeSvg from '../assets/images/23.icon3.svg'
import enableSvg from '../assets/images/23.icon4.svg'


const useStatus = (status: number | string) => {
  const { t } = useTranslation()
  const obj = { content: '', img: '' }
  switch (status) {
    case "-1":
      obj.content = t('common.connectFailed') // 网络连接失败;
      obj.img = errorSvg
      break
    case "0":
      obj.content = t('common.powerdisable') // 算力未启用(网络已连接);
      obj.img = warnSvg
      break
    case "1":
      obj.content = t('common.powerenable') // 算力已启用（空闲）;
      obj.img = freeSvg
      break
    case "2":
      obj.content = t('common.powerOccupied') // 算力已启用（空闲）;
      obj.img = enableSvg
      break
    default:
      break;
  }
  return obj
}

export default useStatus