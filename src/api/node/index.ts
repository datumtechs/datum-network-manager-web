
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
      url: `/api/v1/node/corenode/connectNode`,
      data
    })
  },
  // 加入
  applyJoinNetwork(data: IPObj): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/corenode/applyJoinNetwork`,
      data
    })
  },
  // 注销
  withDrawNetwork(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/corenode/cancelJoinNetwork`,
    })
  },
}


export default nodeApi;