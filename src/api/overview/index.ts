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
      url: `/api/v1/system/index/localPowerUsage`,
    })
  },

  // 查询计算任务概况
  queryMyCalculateTaskStats(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/queryMyCalculateTaskStats`,
    })
  },

  // 查询我发布的数据
  localDataFileStatsTrendMonthly(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/system/index/localDataFileStatsTrendMonthly`,
    })
  },

  // 查询我发布的算力
  localPowerStatsTrendMonthly(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/system/index/localPowerStatsTrendMonthly`,
    })
  },


  // 查询全网数据或算力环比
  queryWholeNetDateRatio(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/queryWholeNetDateRatio`,
    })
  },


  // 查询全网算力走势
  globalPowerStatsTrendMonthly(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/globalPowerStatsTrendMonthly`,
    })
  },

  // 查询全网数据走势
  globalDataFileStatsTrendMonthly(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/globalDataFileStatsTrendMonthly`,
    })
  },

  // 待授权列表
  queryWaitAuthDataList(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/system/index/queryWaitAuthDataList`,
    })
  },

  // 查询发布数据 /api/v1/system/index/listGlobalPowerStatsTrend

  // 全网走势 /api/v1/system/index/listGlobalDataFileStatsTrend

}


export default overviewApi;