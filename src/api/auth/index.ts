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

  // 获取数据 /api/v1/resource/auth/authDataStatistics
  authDataStatistics(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/resource/auth/authDataStatistics`,
    })
  },

  // 授权同意 /api/v1/resource/auth/actionAuthData
  actionAuthData(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/resource/auth/actionAuthData`,
      data
    })
  },

  // 授权详情 /api/v1/resource/auth/authDataDetail
  authDataDetail(data): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/resource/auth/authDataDetail`,
      params: data
    })
  },
}

export default authApi;