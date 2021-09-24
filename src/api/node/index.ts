
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
      url: `/api/v1/node/corenode/connectNode?ip=${data.ip}&port=${data.port}`,
      data
    })
  },
  // 加入
  applyJoinNetwork(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/corenode/applyJoinNetwork`,
    })
  },
  // 注销
  withDrawNetwork(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/corenode/cancelJoinNetwork`,
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

}


export default nodeApi;