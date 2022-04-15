import axios from "../../utils/request"

export default {
  // 获取模板凭证列别
  queryTemplateVoucher(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/page`,
      data
    })
  },
  // 获取无属性凭证
  queryUnpricedVoucher(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/page`,
      data
    })
  },

  //
  postTransaction(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/publish`,
      data
    })
  },
  postdDataTokenUp(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/up`,
      data
    })
  },

  getPublishConfig(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/getPublishConfig`,
      data
    })
  },

  getUpConfig(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/dataToken/getUpConfig`,
    })
  },




  // 查询dex链接地址
  queryDexWebUrl(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/getDexWebUrl`
    })
  },



  // 查询未发凭证列表
  queryMetaDataByKeyword(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/data/listUnBindLocalMetaDataByKeyword`,
      data
    })
  },

  // 查询状态根据id获取dataToken状态  无属性
  queryDataTokenStatus(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/getDataTokenStatus`,
      data
    })
  },
}