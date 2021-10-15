import axios from '../../utils/request'
/*
示例:代码中使用import api from "@/api/index"
调用 api.startChainFn({
    参数
}).then(res=>{
    do something
})
*/

interface pageObject {
  pageNumber: number
  pageSize: number
  keyword?: string
}

const resourceApi = {
  queryMydata(data: pageObject): Promise<any> {
    return axios({
      method: 'GET',
      url: `/api/v1/resource/mydata/metaDataList?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
    })
  },
  // 查看详情
  queryMetaDataDetail(data): Promise<any> {
    return axios({
      method: 'GET',
      url: `/api/v1/resource/mydata/metaDataInfo?id=${data}`,
    })
  },
  // 上架
  metaDataAction(data: any): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/mydata/actionMetaData`,
      data,
    })
  },
  // 下载
  downloadMeta(data: any): Promise<any> {
    return axios({
      method: 'GET',
      url: `/api/v1/resource/mydata/download?id=${data.id}`,
      responseType: 'blob'
    })
  },

  // 修改保存
  updateMetaData(data: any): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/mydata/updateMetaData`,
      data,
    })
  },

  // 根据关键字查询
  queryMydataByKeyword(data: any): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/mydata/metaDataListByKeyWord`,
      data,
    })
  },

  // 上传内容
  uploadCsv({ data, fn }): Promise<any> {
    return axios({
      method: 'POST',
      url: '/api/v1/resource/mydata/uploadFile',
      data,
      onUploadProgress: fn,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).catch(err => {
      console.log(err, 'errrrrrrrrrrrrrr');
    })
  },

  addLocalMetaData(data: any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/resource/mydata/addLocalMetaData`,
      data
    })
  },

  checkResourceName(data: any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/resource/mydata/checkResourceName?resourceName=${data.resourceName}`,
    })
  },

  // 数据中心 - 数据详情  DC=datacenter
  queryDCMetaDataInfo(data: string): Promise<any> {
    return axios({
      method: 'GET',
      url: `/api/v1/resource/datacenter/metaDataInfo?metaDataId=${data}`,
    })
  },

  // 数据中心 - 查询数据列表
  queryDCMetaDataList(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/datacenter/metaDataList`,
      data,
    })
  },

  // 数据中心 - 数据列表关键字查询
  queryDCMetaDataListByKeyWord(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/datacenter/metaDataListByKeyWord`,
      data,
    })
  },

  // 算力中心 - 查询数据列表
  queryPCMetaDataList(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/powercenter/powerList`,
      data,
    })
  },

  // 算力中心 - 数据列表关键字查询
  queryPCMetaDataListByKeyWord(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/powercenter/powerListByKeyWord`,
      data,
    })
  },

  // 数据参与的任务信息列表
  queryDataJoinTaskList(data: any): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/resource/mydata/queryDataJoinTaskList`,
      data,
    })
  },

  // 全网算力或者数据走势
  queryWholeNetDateOrPower(data: any): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/system/index/queryWholeNetDateOrPower`,
      data,
    })
  },

}

export default resourceApi
