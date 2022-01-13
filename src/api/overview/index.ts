import axios from "../../utils/request"

const overviewApi = {
  // // 首页计算节点列表
  // queryNodelist(): Promise<any> {
  //   return axios({
  //     method: "GET",
  //     url: `/api/v1/system/index/nodeList`,
  //   })
  // },
  // 首页信息统计信息
  // overviewData(): Promise<any> {
  //   return axios({
  //     method: "GET",
  //     url: `/api/v1/system/index/overview`,
  //   })
  // },

  // 查询总计算资源占用情况 /metis-admin/api/v1/system/index/queryUsedTotalResource
  // 查询本地计算资源占用情况
  queryUsedTotalResource(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/overview/localPowerUsage`,
    })
  },

  // 查询计算任务概况  // 查询我的计算任务概况
  queryMyCalculateTaskStats(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/index/queryMyCalculateTaskStats`,
      url: `/api/v1/overview/myTaskOverview`,
    })
  },

  // 查询我发布的数据
  localDataFileStatsTrendMonthly(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/index/localDataFileStatsTrendMonthly`,
      url: `/api/v1/overview/localDataFileStatsTrendMonthly`,
    })
  },

  // 查询我发布的算力
  localPowerStatsTrendMonthly(params?): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/system/index/localPowerStatsTrendMonthly`,
      url: `/api/v1/overview/localPowerStatsTrendMonthly`,
      params
    })
  },


  // 查询全网数据或算力环比
  queryWholeNetDateRatio(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/index/queryWholeNetDateRatio`,
      url: `/api/v1/overview/queryWholeNetDateRatio`,
    })
  },


  // 查询全网算力走势
  globalPowerStatsTrendMonthly(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/index/globalPowerStatsTrendMonthly`,
      url: `/api/v1/overview/globalPowerStatsTrendMonthly`,
    })
  },

  // 查询全网数据走势
  globalDataFileStatsTrendMonthly(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/index/globalDataFileStatsTrendMonthly`,
      url: `/api/v1/overview/globalDataFileStatsTrendMonthly`,
    })
  },

  // 待授权列表
  queryWaitAuthDataList(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/index/queryWaitAuthDataList`,
      // url: `/api/v1/overview/queryWaitAuthDataList`,
      url: `/api/v1/overview/listDataAuthReqWaitingForApprove`,
    })
  },

  // 查询发布数据 /api/v1/system/index/listGlobalPowerStatsTrend

  // 全网走势 /api/v1/system/index/listGlobalDataFileStatsTrend

}


export default overviewApi;