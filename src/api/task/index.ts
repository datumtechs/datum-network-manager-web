import axios from "../../utils/request"
import { taskQueryObj } from '../../entity/index'

const taskApi = {
  // 获取节点参与任务列表
  taskListByQuery(data: taskQueryObj): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/task/mytask/listMyTask`,
      url: `/api/v1/task/listMyTask`,
      data
    })
  },

  // 获取计算任务详情  参与的任务情况统计
  taskDetailsByQuery(data: taskQueryObj): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/task/mytask/myTaskStatistics`,
      url: `/api/v1/task/myTaskStatistics`,
      data
    })
  },

  // 获取任务详情
  querytaskInfo(taskId: string): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/task/mytask/taskInfo?taskId=${taskId}`,
      url: `/api/v1/task/taskInfo?taskId=${taskId}`,
    })
  },

  // 获取任务事件日志列表
  querytaskEventList(taskId: string): Promise<any> {
    return axios({
      method: "GET",
      // url: `/api/v1/task/mytask/taskEventList?taskId=${taskId}`,
      url: `/api/v1/task/listTaskEvent?taskId=${taskId}`,
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