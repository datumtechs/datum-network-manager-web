import axios from "../../utils/request"

export default {
  // 获取模板凭证列别
  queryTemplateVoucher(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/task/listMyTask`,
      data
    })
  },
  // 获取无属性凭证
  queryUnpricedVoucher(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/task/listMyTask`,
      data
    })
  },
}