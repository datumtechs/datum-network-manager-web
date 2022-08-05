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



  // 未发布无属性凭证的元数据
  queryUnPublishData(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/data/listMetaDataUnPublishDataTokenByKeyword`,
      data
    })
  },

   // 查询未发布有属性凭证的元数据
   queryaUnPublishAttribut(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/data/listMetaDataUnPublishAttributeDataTokenByKeyword`,
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



  // 修改凭证状态 无属性
  updateDataTokenStatus(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/updateStatus`,
      data
    })
  },




  // 查询有属性凭证  列表
  queryAttributeList(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/attributeDataToken/page`,
      data
    })
  },


  // 查询有属性凭证  配置 查询工厂合约配置
  queryPublishConfig(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/attributeDataToken/getPublishConfig`,
      data
    })
  },

  //有属性凭证 创建
  postAttributeTransaction(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/attributeDataToken/publish`,
      data
    })
  },

  // 查询状态根据id获取dataToken状态  有属性
  queryAttributeTokenStatus(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/attributeDataToken/getAttributeDataTokenStatus`,
      data
    })
  },

  // 凭证库存列表
  queryAttributeInventoryList(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/v1/attributeDataToken/getDataTokenInventoryPage`,
      data
    })
  },
  // 无属性凭证绑定
  bindMetaData(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/dataToken/bindMetaData`,
      data
    })
  },
  // 属性凭证绑定
  attrbindMetaData(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/attributeDataToken/bindMetaData`,
      data
    })
  },

}