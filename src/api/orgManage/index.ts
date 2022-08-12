import axios from "../../utils/request"


const orgManage = {
  // 普通 成员 主页内容
  getOrgManageHome(): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/generalOrganization/home`,
    })
  },

}

export default orgManage