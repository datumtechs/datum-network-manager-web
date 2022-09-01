import { message } from 'antd'
import Big from 'big.js'
import i18n from '@/i18n/config'

const EXCEPTION_MAP: string[] = ["4001", "4100", "4200", "4900", "4901", "-32700", "-32600", "-32601", "-32602", "32603"]

export const Complement = '000000000000000000'
export const imgURls = 'http://testdownload.datumtechs.com/datum/image/3.svg'

export const filterAmount = (str: string): string => {
  if (!str) return ''
  let newStr: any = `${new Big(str).div(new Big(10).pow(18)).toFixed(10)}`
  newStr = newStr.substring(0, newStr.length - 2)
  return newStr.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
}

export const filterIntegerAmount = (str: string): string => {
  if (!str) return ''
  return `${new Big(str).div(new Big(10).pow(18)).toFixed(0)}`
}


const sizeChange = (input:number,Company:string)=>{
  if (!input) return `0B`
  let size = "";
  if (input < 0.1 * 1024) {                            // 小于0.1KB，则转化成B
    size = `${input.toFixed(2)}${Company}`
  } else if (input < 0.1 * 1024 * 1024) {            // 小于0.1MB，则转化成KB
    size = `${(input / 1024).toFixed(2)}K${Company}`
  } else if (input < 0.1 * 1024 * 1024 * 1024) {        // 小于0.1GB，则转化成MB
    size = `${(input / (1024 * 1024)).toFixed(2)}M${Company}`
  } else {                                            // 其他转化成GB
    size = `${(input / (1024 * 1024 * 1024)).toFixed(2)}G${Company}`
  }

  const sizeStr = `${size}`;                        // 转成字符串
  const index = sizeStr.indexOf(".");                    // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2)            // 获取小数点后两位的值
  if (dou === "00") {                                // 判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}

export const changeSizeFn = (input: number): string => {
   return sizeChange(input,"B")
}


export const newChangeSizeFn = (input: number): string => {
  return sizeChange(input,"b")
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
    unit = 'Kb'
  } else {
    size = `${(input / (1024 * 1024)).toFixed(2)}`
    unit = 'Mb'
  }
  return { size, unit };
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
  // eslint-disable-next-line compat/compat
  const hostName = location.hostname
  return hostListExtends.includes(hostName)
}

export const filterWeb3Code = (code: any): string => {
  let text = code
  if (!code) return 'unknown'
  if (!EXCEPTION_MAP.includes(code.toString())) {
    text = 'unknown'
  }
  return text
}

export const copy = (text) => {
  // 有兼容性 暂时先这样
  try {
    const input: any = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.value = text
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input)
    message.success(i18n.t('common.copySuccess'))
  } catch (e) {
    message.error(i18n.t('common.copyFailed'))
  }
}

export  const useAddressDisplay = (address: string) => {
  if (!address) return ''
  if (!address.startsWith('0x')) return address
  return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

export  const filterTime = (time: any, isStamp?: any) => {
    isStamp = !!isStamp
    if(!time) return '--'
    if (isStamp) time = String(time) + '000'
    return new Date(isStamp ? +time : time).toLocaleString()
}


export const UseCredentialStatus = (status)=>{
    const s = Number(status)
    switch (s) {
      // 0-未发布，1-发布中，2-发布失败，3-发布成功，4-定价中，5-定价失败，
      // 6-定价成功，7-绑定中，8-绑定失败，9-绑定成功
      case 1:
        return i18n.t('credential.Publishing');
      case 2:
        return i18n.t('credential.PublishingFailed');
      case 3:
        return i18n.t('credential.PublishingSuccess');
      case 4:
        return i18n.t('credential.Pricing');
      case 5:
        return i18n.t('credential.PricingFailed');
      case 6:
        return i18n.t('credential.PricingSuccess');
      case 7:
        return i18n.t('credential.Binding');
      case 8:
        return i18n.t('credential.BindingFailed');
      case 9:
        return i18n.t('credential.BindingSuccess');
      default:
        break;
    }
}


export const UseAttrCredentialStatus = (status)=>{
  const s = Number(status)
  switch (s) {
    // 0-未发布，1-发布中，2-发布失败，3-发布成功，4-定价中，5-定价失败，
    // 6-定价成功，7-绑定中，8-绑定失败，9-绑定成功
    case 1:
      return i18n.t('credential.Publishing');
    case 2:
      return i18n.t('credential.PublishingFailed');
    case 3:
      return i18n.t('credential.PublishingSuccess');
    case 4:
      return i18n.t('credential.Binding');
    case 5:
      return i18n.t('credential.BindingFailed');
    case 6:
      return i18n.t('credential.BindingSuccess');
    default:
      break;
  }
}

export const useApplicationStatus = (status)=>{//processStatus
  const s = Number(status)
  switch (s) {
    //0-申请中，1-申请通过，2-申请失败
    // 证书状态：0-无效，1-有效，2-待生效
    case 0:
      return i18n.t('orgManage.ApplicationFailed');
    case 1:
      return i18n.t('orgManage.ApplicationPassed');
    case 2:
      return i18n.t('orgManage.InApplication');
    default:
      return '--';
  }
}

export const useProcessStatus =  (status)=>{
  const s = Number(status)
    //0-未处理，1-同意，2-不同意
  switch (s) {
    case 0:
      return i18n.t('common.Untreated');
    case 1:
      return i18n.t('common.agree');
    case 2:
      return i18n.t('common.noAgree');
    default:
      return '--';
  }
}

export const useToDoContentStatus = (status)=>{
    // 1-申请认证，101-提名加入提案，102-提名踢出提案
  const s = Number(status)
  switch (s) {
    case 1:
      return i18n.t('menu.applyCertification');
    case 101:
      return i18n.t('orgManage.nominationToJoinProposal');
    case 102:
      return i18n.t('orgManage.nominateKickOutProposal');
    default:
      return '--';
  }
}

export const useProposalStatus = (status)=>{
  const s = Number(status)
    // 1-增加委员会成员; 2-剔除委员会成员; 3-委员会成员退出
  switch (s) {
    case 1:
      return i18n.t('orgManage.ApplicationInCommittee');
    case 2:
      return i18n.t('orgManage.ApplicationDisqualificationCommittee');
    case 3:
      return i18n.t('orgManage.withdrawCommittee');
    default:
      break;
  }
}
export const useToDoContenttype = (row)=>{
  switch (row.type) {
    case 1:
      return i18n.language == 'zh' ? `${row?.dynamicFields?.applyOrgName} 向 ${row?.dynamicFields?.specifyOrgName || row?.dynamicFields?.approveOrgName} 申请认证` :
        `${row?.dynamicFields?.applyOrgName} applies to ${row?.dynamicFields?.specifyOrgName || row?.dynamicFields?.approveOrgName} for certification`
    case 101:
      return i18n.language == 'zh' ? `${row?.dynamicFields?.applyOrgName} 提名 ${row?.dynamicFields?.specifyOrgName || row?.dynamicFields?.approveOrgName} 加入提案` :
        `${row?.dynamicFields?.applyOrgName} nominated  ${row?.dynamicFields?.specifyOrgName || row?.dynamicFields?.approveOrgName} to join the proposal`;
    case 102:
      return i18n.language == 'zh' ? `${row?.dynamicFields?.applyOrgName} 提名 ${row?.dynamicFields?.specifyOrgName || row?.dynamicFields?.approveOrgName} 退出提案` :
        `${row?.dynamicFields?.applyOrgName} nominated  ${row?.dynamicFields?.specifyOrgName || row?.dynamicFields?.approveOrgName} withdrawing proposal`;;
    default: return '-';
  }
}
        // 1-增加委员会成员; 2-剔除委员会成员; 3-委员会成员退出

export const useProposalType = (row)=>{
    switch (row.type) {
      case 1:
        return i18n.language == 'zh' ? `提名${row?.dynamicFields?.candidateName} 加入委员会` :
          `nominated ${row?.dynamicFields?.candidateName}  Join the Committee`
      case 2:
        return i18n.language == 'zh' ? `提名${row?.dynamicFields?.candidateName} 退出委员会` :
          `nominated ${row?.dynamicFields?.candidateName}  Withdrawal from the Committee`
      case 3:
        return i18n.language == 'zh' ? `${row?.dynamicFields?.candidateName} 退出委员会` :
          `${row?.dynamicFields?.candidateName}  Withdrawal from the Committe`
      default: return '-';
    }
}


export const useProposalProgressStatus = (status)=>{
  const s = Number(status)
  switch (s) {
    // 0-投票未开始；1-投票开始；2-投票结束；3-投票通过；    brak://2-投票结束，但是还未通过；
    // 4-投票未通过；5-退出中；6-已退出；7-撤销中；8-已撤销
    case 0:
      return i18n.t('orgManage.VotingNoTarted');
    case 1:
      return i18n.t('orgManage.VotingBegins');
    case 2:
      return i18n.t('orgManage.OverButNoPassed');
    case 3:
      return i18n.t('orgManage.passedVote');
    case 4:
      return i18n.t('orgManage.votingFailed');
    case 5:
      return i18n.t('orgManage.exiting');
    case 6:
      return i18n.t('orgManage.exited');
    case 7:
      return i18n.t('orgManage.revoking');
    case 8:
      return i18n.t('orgManage.revoked');
    default:
      return ''
  }
}

export const useHandlingOpinionsStatus =  (status)=>{
  const s = Number(status)
  switch (s) {
     //成功 失败 已撤回 --
    case 0:
    case 1:
    case 2:
    case 5:
    case 7:
      return '--';
    case 4:
      return i18n.t('common.noAgree');
    case 3:
    case 6:
      return i18n.t('common.agree');
      case 8:
        return i18n.t('common.Withdrawn');
    default:
      return '--'
  }
}






export const StatusCodeProcessing = (code) => {
  switch (code) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 500:
    case 1001:
    case 1002:
    case 1003:
    case 1004:
    // case 1005:
    // eslint-disable-next-line no-fallthrough
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
    case 1038:
    case 1039:
    case 1040:
    case 1041:
    case 1042:
    case 1043:
    case 1044:
    case 1045:
    case 1046:
    case 1047:
    case 1048:
    case 1049:
    case 1050:
    case 1051:
    case 1052:
    case 1053:
    case 1054:
    case 1055:
    case 1056:
    case 1057:
    case 1058:
    case 1059:
    case 1060:
    case 1061:
    case 1062:
    case 1063:
    case 1064:
    case 1065:
    case 1066:
    case 1067:
    case 1068:
    case 1069:
    case 1070:
    case 1071:
    case 1072:
    case 1073:
    case 1074:
    case 1075:
    case 1076:
    case 2000:
    case 2001:
    case 2002:
    case 2003:
    case 2004:

      // eslint-disable-next-line no-case-declarations
      const tipsText = i18n.t(`httpStatus.status${code}`)
      message.error(tipsText);
      break;
    default:
      break;
  }
}