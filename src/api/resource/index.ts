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
  // queryMydata(data: pageObject): Promise<any> {
  //   return axios({
  //     method: 'GET',
  //     url: `/api/v1/resource/mydata/metaDataList?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
  //     // url: `/api/v1/resource/datacenter/metaDataList?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
  //   })
  // },
  // 查看元数据详情
  queryMetaDataDetail(data): Promise<any> {
    return axios({
      method: 'GET',
      // url: `/api/v1/resource/mydata/metaDataInfo?id=${data}`,
      url: `/api/v1/data/localMetaDataInfo?id=${data}`,
    })
  },
  // 元数据操作：上架、下架和删除
  metaDataAction(data: any): Promise<any> {
    return axios({
      method: 'POST',
      // url: `/api/v1/resource/mydata/actionMetaData`,
      url: `/api/v1/data/localMetaDataOp`,
      data,
    })
  },
  // 下载
  downloadMeta(data: any): Promise<any> {
    return axios({
      method: 'GET',
      // url: `/api/v1/resource/mydata/download?id=${data.id}`,
      url: `/api/v1/data/download?id=${data.id}`,
      responseType: 'blob'
    })
  },

  // 修改保存
  updateMetaData(data: any): Promise<any> {
    return axios({
      method: 'POST',
      // url: `/api/v1/resource/mydata/updateMetaData`,
      url: `/api/v1/data/updateLocalMetaData`,
      data,
    })
  },

  // 根据关键字查询
  queryMydataByKeyword(data: any): Promise<any> {
    return axios({
      method: 'POST',
      url: `/api/v1/data/listLocalMetaDataByKeyword`,
      // url: `/api/v1/data/listLocalMetaDataByKeyword`,
      data,
    })
  },

  // 上传内容
  uploadCsv({ data, fn }): Promise<any> {
    return axios({
      method: 'POST',
      // url: '/api/v1/resource/mydata/uploadFile',
      url: '/api/v1/data/uploadFile',
      data,
      onUploadProgress: fn,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).catch(err => {
      console.log(err, 'errrrrrrrrrrrrrr');
    })
  },

  // 添加数据/另存为新数据
  addLocalMetaData(data: any): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/resource/mydata/addLocalMetaData`,
      url: `/api/v1/data/addLocalMetaData`,
      data
    })
  },

  // 校验元数据资源名称是否合法
  checkResourceName(data: any): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/resource/mydata/checkResourceName?resourceName=${data.resourceName}`,
      url: `/api/v1/data/checkResourceName?resourceName=${data.resourceName}`,
    })
  },

  // // 数据中心 - 数据详情  DC=datacenter
  queryDCMetaDataInfo(data: string): Promise<any> {
    return axios({
      method: 'GET',
      // url: `/api/v1/resource/datacenter/metaDataInfo?metaDataId=${data}`,
      url: `/api/v1/data/globalMetaDataDetail?metaDataId=${data}`,
    })
  },

  // 数据中心 - 查询数据列表
  queryDCMetaDataList(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      // url: `/api/v1/resource/datacenter/metaDataList`,
      url: `/api/v1/data/listGlobalMetaData`,
      data,
    })
  },

  // 数据中心 - 数据列表关键字查询
  queryDCMetaDataListByKeyWord(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      // url: `/api/v1/resource/datacenter/metaDataListByKeyWord`,
      url: `/api/v1/data/listGlobalMetaDataByKeyword`,
      data,
    })
  },

  // 算力中心 - 查询数据列表
  queryPCMetaDataList(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      // url: `/api/v1/resource/powercenter/powerList`,
      url: `/api/v1/power/listGlobalPower`,
      data,
    })
  },

  // 算力中心 - 数据列表关键字查询
  queryPCMetaDataListByKeyWord(data: pageObject): Promise<any> {
    return axios({
      method: 'POST',
      // url: `/api/v1/resource/powercenter/powerListByKeyWord`,
      url: `/api/v1/power/listGlobalPowerByKeyword`,
      data,
    })
  },

  // 数据参与的任务信息列表
  queryDataJoinTaskList(data: any): Promise<any> {
    return axios({
      method: 'POST',
      // url: `/api/v1/resource/mydata/queryDataJoinTaskList`,
      url: `/api/v1/data/listTaskByMetaDataId`,
      data,
    })
  },

  // 全网数据走势
  globalDataFileStatsTrendDaily(): Promise<any> {
    return axios({
      method: 'GET',
      // url: `/api/v1/resource/datacenter/globalDataFileStatsTrendDaily`,
      url: `/api/v1/data/globalDataFileStatsTrendDaily`,
    })
  },

}

export default resourceApi
