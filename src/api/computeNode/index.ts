import axios from "../../utils/request"
import { ComputeNode, SearchPageTable } from '../../entity/index'

const computeNodeApi = {

  // 内部任务列表
  queryPowerNodeList(data: SearchPageTable): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/node/powernode/queryPowerNodeList`,
      url: `/api/v1/powernode/listPowerNode`,
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
      method: "GET",
      // url: `/api/v1/node/powernode/queryPowerNodeUseHistory`,
      url: `/api/v1/powernode/listLocalPowerLoadSnapshotByPowerNodeId`,
      params: { ...data }
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
      // url: `/api/v1/node/powernode/publishPower`,
      url: `/api/v1/powernode/publishPower`,
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
      // url: `/api/v1/node/powernode/revokePower`,
      url: `/api/v1/powernode/revokePower`,
      data
    })
  },

  // 新增计算节点
  addPowerNode(data: ComputeNode): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/node/powernode/addPowerNode`,
      url: `/api/v1/powernode/addPowerNode`,
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
      // url: `/api/v1/node/powernode/checkPowerNodeName`,
      url: `/api/v1/powernode/checkPowerNodeName`,
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
      // url: `/api/v1/node/powernode/deletePowerNode`,
      url: `/api/v1/powernode/deletePowerNode`,
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
      // url: `/api/v1/node/powernode/queryPowerJoinTaskList`,
      url: `/api/v1/powernode/listPowerNode`,
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
      // url: `/api/v1/node/powernode/queryPowerNodeDetails`,
      url: `/api/v1/powernode/powerNodeDetails`,
      data
    })
  },

  // 修改计算节点
  updatePowerNode(data: ComputeNode): Promise<any> {
    return axios({
      method: "POST",
      // url: `/api/v1/node/powernode/updatePowerNode`,
      url: `/api/v1/powernode/updatePowerNode`,
      data
    })
  },
}


export default computeNodeApi;