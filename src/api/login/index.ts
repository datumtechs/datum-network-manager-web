import axios from "../../utils/request"

const loginApi = {
  // 登录
  loginFn(data): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/system/user/login`,
      url: `/api/v1/user/login`,
      data
    })
  },

  // 申请身份标识
  applyOrgIdentity(data): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/system/user/applyOrgIdentity`,
      url: `/api/v1/user/applyOrgIdentity`,
      data
    })
  },

  // 退出登录状态
  logoutFn(): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/system/user/logout`,
      url: `/api/v1/user/logout`,
    })
  },

  // 获取验证码
  getVerCode(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/user/verificationCode`,
      url: `/api/v1/user/verificationCode`,
    })
  },

  // 查询当前组织信息
  queryBaseInfo(): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/system/queryBaseInfo`,
      url: `/api/v1/user/findLocalOrgInfo`,
    })
  },
}


export default loginApi;