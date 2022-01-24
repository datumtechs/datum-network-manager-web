import i18n from '@/i18n/config'
import { message } from 'antd'


export const changeSizeFn = (input: number): string => {
  if (!input) return '0B'
  let size = "";
  if (input < 0.1 * 1024) {                            // 小于0.1KB，则转化成B
    size = `${input.toFixed(2)}B`
  } else if (input < 0.1 * 1024 * 1024) {            // 小于0.1MB，则转化成KB
    size = `${(input / 1024).toFixed(2)}KB`
  } else if (input < 0.1 * 1024 * 1024 * 1024) {        // 小于0.1GB，则转化成MB
    size = `${(input / (1024 * 1024)).toFixed(2)}MB`
  } else {                                            // 其他转化成GB
    size = `${(input / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  const sizeStr = `${size}`;                        // 转成字符串
  const index = sizeStr.indexOf(".");                    // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2)            // 获取小数点后两位的值
  if (dou === "00") {                                // 判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}

export const changeSizeObj = (input: number): any => {
  if (!input) return { size: 0, unit: '' };
  let size: string
  let unit: string
  if (input < 0.1 * 1024) {                            // 小于0.1KB，则转化成B
    size = `${input.toFixed(2)}`
    unit = 'B'
  } else if (input < 0.1 * 1024 * 1024) {            // 小于0.1MB，则转化成KB
    size = `${(input / 1024).toFixed(2)}`
    unit = 'KB'
  } else if (input < 0.1 * 1024 * 1024 * 1024) {        // 小于0.1GB，则转化成MB
    size = `${(input / (1024 * 1024)).toFixed(2)}`
    unit = 'MB'
  } else {                                            // 其他转化成GB
    size = `${(input / (1024 * 1024 * 1024)).toFixed(2)}`
    unit = 'GB'
  }

  return { size, unit };
}

export const BandwidthSizeObj = (input: number): any => {
  if (!input) return { size: 0, unit: '' };
  let size: string
  let unit: string
  if (input < 0.1 * 1024) {
    size = `${input.toFixed(2)}`
    unit = 'B'
  } else if (input < 0.1 * 1024 * 1024) {
    size = `${(input / 1024).toFixed(2)}`
    unit = 'KB'
    // } else if (input > 100 * 1024 * 1024) {
    //   size = `${(input / (1024 * 1024 * 1024)).toFixed(2)}`
    //   unit = 'GB'
  } else {
    size = `${(input / (1024 * 1024)).toFixed(2)}`
    unit = 'MB'
  }
  return { size, unit };
}



const isZeroEnd = (input) => {
  const sizeStr = `${input}`
  const index = sizeStr.indexOf('.')
  const double = sizeStr.substr(index + 1, 2)
  if (double === '00') { // 判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return sizeStr
}

export const thousandMark = (input) => {
  return input.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export const fileSizeChange = (input: any) => {
  if (input === null || input === undefined || input === "") return `0.00 B`
  let size = ''
  if (input < 0.1 * 1024) { // 小于0.1KB，则转化成B
    size = `${input.toFixed(2)} B`
  } else if (input < 0.1 * 1024 * 1024) { // 小于0.1MB，则转化成KB
    size = `${(input / 1024).toFixed(2)} KB`
  } else if (input < 0.1 * 1024 * 1024 * 1024) { // 小于0.1GB，则转化成MB
    size = `${(input / (1024 * 1024)).toFixed(2)} MB`
  } else { // 其他转化成GB
    size = `${(input / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }
  return size
}

const _isZero = (time) => {
  if (time.toString().length < 2) {
    return `0${time}`
  }
  return time
}

export const formatDuring = time => {
  let hours = parseInt(`${time / (1000 * 60 * 60)}`, 10)
  const minutes = parseInt(`${(time % (1000 * 60 * 60)) / (1000 * 60)}`, 10)
  const seconds = parseInt(`${(time % (1000 * 60)) / 1000}`, 10)
  const day = parseInt(`${hours / 24}`, 10)
  if (day) {
    hours = parseInt(`${+hours % 24}`, 10)
    return `${day}${i18n.language === 'zh' ? '天' : 'Day'} ${_isZero(hours)}:${_isZero(minutes)}:${_isZero(seconds)}`
  }
  return `${_isZero(hours)}:${_isZero(minutes)}:${_isZero(seconds)}`
}


export const buttonDisabled = () => {
  const hostListExtends = ['192.168.10.146', '192.168.10.147', '192.168.10.148']
  const hostName = location.hostname
  return hostListExtends.includes(hostName)
}


export const StatusCodeProcessing = (code) => {
  switch (code) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 1001:
    case 1002:
    case 1003:
    case 1004:
    // case 1005:
    case 1006:
    case 1007:
    case 1008:
    case 1009:
    case 1010:
    case 1011:
    case 1012:
    case 1013:
    case 1014:
    case 1015:
    case 1016:
    case 1017:
    case 1018:
    case 1019:
    case 1020:
    case 1021:
    case 1022:
    case 1023:
    case 1024:
    case 1025:
    case 1026:
    case 1027:
    case 1028:
    case 1029:
    case 1030:
    case 1031:
    case 1032:
    case 1033:
    case 1034:
    case 1035:
    case 1036:
    case 1037:
      const tipsText = i18n.t(`httpStatus.status${code}`)
      message.error(tipsText);
      break;
    default:
      console.log("不操作");
      break;
  }
}