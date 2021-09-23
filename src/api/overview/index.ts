import axios from "../../utils/request"

const overviewApi = {
  // 首页计算节点列表
  queryNodelist(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/nodeList`,
    })
  },
  // 首页信息统计信息
  overviewData(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/overview`,
    })
  },

  // 查询总计算资源占用情况 /metis-admin/api/v1/system/index/queryUsedTotalResource
  queryUsedTotalResource(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/queryUsedTotalResource`,
    })
  },

}


export default overviewApi;