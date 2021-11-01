
import axios from "../../utils/request"

interface IPObj {
  ip: string,
  port: string,
}

const nodeApi = {
  // 连接测试
  connectNode(data: IPObj): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/node/corenode/connectNode?ip=${data.ip}&port=${data.port}`,
      url: `/api/v1/carrier/connectNode?ip=${data.ip}&port=${data.port}`,
      data
    })
  },
  // 加入 
  // 申请准入网络
  applyJoinNetwork(): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/node/corenode/applyJoinNetwork`,
      url: `/api/v1/carrier/applyJoinNetwork`,
    })
  },
  // 注销网络
  withDrawNetwork(): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/node/corenode/cancelJoinNetwork`,
      url: `/api/v1/carrier/cancelJoinNetwork`,
    })
  },

  // 查询种子节点列表
  querySeedNodeList(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/seednode/querySeedNodeList`,
      data
    })
  },

  // 种子节点名称是否可用
  checkSeedNodeName(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/seednode/checkSeedNodeName`,
      data
    })
  },

  // 新增种子节点
  addSeedNode(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/seednode/addSeedNode`,
      data
    })
  },
}


export default nodeApi;