import axios from "../../utils/request"

const authApi = {
  // 获取节点参与任务列表
  authDataList(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/resource/auth/authDataList`,
      data
    })
  },
}

export default authApi;