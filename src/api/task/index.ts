import axios from "../../utils/request"
import { taskQueryObj } from '../../entity/index'

const taskApi = {
  // 获取节点参与任务列表
  taskListByQuery(data: taskQueryObj): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/task/mytask/taskListByQuery`,
      data
    })
  },

  // 获取任务详情
  querytaskInfo(taskId: string): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/task/mytask/taskInfo?taskId=${taskId}`,
    })
  },

  // 获取任务事件日志列表
  querytaskEventList(taskId: string): Promise<any> {
    return axios({
      method: "GET",
      url: `/api/v1/task/mytask/taskEventList?taskId=${taskId}`,
    })
  },



  // 删除数据节点列表
  /**
   * @param data :{ nodeId:string }
   * @returns 
   */
  deleteDatanode(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/datanode/deleteDataNode`,
      data
    })
  },

}


export default taskApi;