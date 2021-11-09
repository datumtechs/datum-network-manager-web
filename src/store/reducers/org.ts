import { SET_ORG_INFO } from '../actionType/index'

interface orgInfo {
  carrierConnStatus: string,
  carrierConnTime: string,
  carrierIP: string,
  carrierNodeId: string,
  carrierPort: string,
  carrierStatus: string,
  identityId: string,
  name: string,
  recUpdateTime: string,
}

interface ReduxState {
  orgInfo: orgInfo
}

interface loginAction {
  type: string
  data: orgInfo,
}

const initData = {
  orgInfo: {
    carrierConnStatus: "", // 连接状态 enabled：可用, disabled:不可用
    carrierConnTime: "", // 服务连接时间
    carrierIP: "", // 调度服务IP地址
    carrierNodeId: "", // 机构调度服务node id，入网后可以获取到
    carrierPort: "", // 调度服务端口号
    carrierStatus: "", // 调度服务的状态：active: 活跃; leave: 离开网络; join: 加入网络 unuseful: 不可用
    identityId: "", // 机构身份标识ID
    name: "", // 机构名称
    recUpdateTime: "", // 最后更新时间
  }
}

const org = (state: ReduxState = initData, action: loginAction) => {
  switch (action.type) {
    case SET_ORG_INFO:
      return {
        orgInfo: {
          ...action.data,
          carrierConnStatus: action.data.carrierConnStatus, // 连接状态 enabled：可用, disabled:不可用
          carrierConnTime: action.data.carrierConnTime, // 服务连接时间
          carrierIP: action.data.carrierIP, // 调度服务IP地址
          carrierNodeId: action.data.carrierNodeId, // 机构调度服务node id，入网后可以获取到
          carrierPort: action.data.carrierPort, // 调度服务端口号
          carrierStatus: action.data.carrierStatus, // 调度服务的状态：active: 活跃; leave: 离开网络; join: 加入网络 unuseful: 不可用
          identityId: action.data.identityId, // 机构身份标识ID
          name: action.data.name, // 机构名称
          recUpdateTime: action.data.recUpdateTime, // 最后更
        }
      }
    default:
      return state
  }
}


export default org
