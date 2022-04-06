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

  // 发布合约  工场合约构建
  postTransaction(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/publishe`,
      data
    })
  },

  getPublishConfig(data): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/dataToken/getPublishConfig`,
      data
    })
  },




  // 查询dex链接地址
  queryDexWebUrl(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/getDexWebUrl`
    })
  },
}