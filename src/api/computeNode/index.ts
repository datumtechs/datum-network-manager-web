import axios from "../../utils/request"
import { ComputeNode, SearchPageTable } from '../../entity/index'

const computeNodeApi = {

  // 内部任务列表
  queryPowerNodeList(data: SearchPageTable): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/queryPowerNodeList`,
      data
    })
  },

  // 查询计算节点历史记录
  /**
  * @param data :{ powerNodeId:string }
  * @returns 
  */
  queryPowerNodeUseHistory(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/queryPowerNodeUseHistory`,
      data
    })
  },

  // 启用算力
  /**
  * @param data :{ powerNodeId:string,status:string }
  * @returns 
  */
  publishPower(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/publishPower`,
      data
    })
  },

  // 停用算力
  /**
    * @param data :{ powerNodeId:string,status:string }
    * @returns 
    */
  revokePower(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/revokePower`,
      data
    })
  },

  // 新增计算节点
  addPowerNode(data: ComputeNode): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/addPowerNode`,
      data
    })
  },

  // 校验数据名称是否可用
  /**
   * @param data :{ "powerNodeName": string }
   * @returns 
   */
  checkPowerNodeName(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/checkPowerNodeName`,
      data
    })
  },

  // 删除节点
  /**
   * @param data :{ "powerNodeId": string }
   * @returns 
   */
  deletePowerNode(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/deletePowerNode`,
      data
    })
  },

  // 查询内部任务列表
  /**
   * @param data :{ "powerNodeId": string }
   * @returns 
   */
  queryPowerJoinTaskList(data: any): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/queryPowerJoinTaskList`,
      data
    })
  },

  // 查询计算节点详情
  /**
   * @param data :{ "powerNodeId": string }
   * @returns 
   */
  queryPowerNodeDetails(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/queryPowerNodeDetails`,
      data
    })
  },

  // 修改计算节点
  updatePowerNode(data: ComputeNode): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/powernode/updatePowerNode`,
      data
    })
  },
}


export default computeNodeApi;