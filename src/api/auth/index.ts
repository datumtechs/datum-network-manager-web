import axios from "../../utils/request"

const authApi = {
  // 获取节点参与任务列表
  authDataList(data): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/resource/auth/authDataList`,
      url: `/api/v1/data/listLocalDataAuth`,
      data
    })
  },

  // 获取数据 授权数据数量统计
  authDataStatistics(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/resource/auth/authDataStatistics`,
      url: `/api/v1/data/dataAuthStatistics`,
    })
  },

  // 授权同意、拒绝 
  actionAuthData(data): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/resource/auth/actionAuthData`,
      url: `/api/v1/data/replyDataAuth`,
      data
    })
  },

  // 授权详情 /api/v1/resource/auth/authDataDetail
  authDataDetail(data): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/resource/auth/authDataDetail`,
      url: `/api/v1/data/dataAuthDetail`,
      params: data
    })
  },
}

export default authApi;