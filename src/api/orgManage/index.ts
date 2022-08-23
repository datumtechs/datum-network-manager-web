import axios from "../../utils/request"


const orgManage = {
  // 普通 成员 主页内容
  getOrgManageHome(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/generalOrganization/home`,
    })
  },
  //普通  申请列表
  getgenerAlapplyList(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/generalOrganization/applyList`,
      data
    })
  },
  //普通证书下载
  postDownload(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/generalOrganization/download`,
      data,
      transformResponse:(res,headers)=>{
        const obj = {
          data:res,
          name:headers['content-disposition']
        }
        return obj
      }
    })
  },
  //普通证书使用
  useCertificate(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/generalOrganization/use`,
      data
    })
  },

   //普通上传资料
   uploadmMaterial(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/generalOrganization/uploadmMaterial`,
      data
    })
  },

   //普通 申请认证
   postApply(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/generalOrganization/apply`,
      data
    })
  },

   //普通 申请详情
   getApplyDetails(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/generalOrganization/applyDetail`,
      data
    })
  },
  

  //委员会 主页内容
  getAuthorityHome(): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/home`,
    })
  },
  //委员会列表
  getAuthorityList(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/list`,
      data
    })
  },
  //提名委员会时上传图片
  getAuthorityUpload(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/upload`,
      data
    })
  },
  //提名踢出
  kickOut(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/kickOut`,
      data
    })
  },
  //提名成员
  nominate(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/nominate`,
      data
    })
  },

  ///退出委员会
  postExitOrg(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/exit`,
      data
    })
  },

  //我的待办列表
  getToDoList(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/todoList`,
      data
    })
  },
  //我的已办列表
  getDoneList(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/doneList`,
      data
    })
  },
  //我的提案列表
  getMyProposalList(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/myProposalList`,
      data
    })
  },
  //可提名委员会列表
  getNominateMember(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/getNominateMember`,
      data
    })
  },

  //我的待办详情
  gettodoDetail(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/todoDetail`,
      data
    })
  },

  //我的提案详情
  getproposalDetail(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/proposalDetail`,
      data
    })
  },
  //我的已办详情
  getdoneDetail(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/doneDetail`,
      data
    })
  },

  //处理我的待办
  processTodo(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/processTodo`,
      data
    })
  },

  //撤回提案
  revokeProposal(data?:any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/authority/revokeProposal`,
      data
    })
  },


}

export default orgManage