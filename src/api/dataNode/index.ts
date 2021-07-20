import axios from "../../utils/request"
import { DataNode, SearchPageTable } from '../../entity/index'

const dataNodeApi = {
  // 获取数据节点列表
  queryDatanodeList(data: SearchPageTable): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/datanode/listNode`,
      data
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

  // 校验数据名称是否可用
  /**
   * @param data :{ nodeName:string }
   * @returns 
   */
  checkDataNodeName(data): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/datanode/checkDataNodeName`,
      data
    })
  },

  // 修改数据节点
  /**
   * @param data :dataNode
   * @returns 
   */
  updateDataNode(data: DataNode): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/datanode/updateDataNode`,
      data
    })
  },

  // 新增数据节点
  /**
   * @param data :dataNode
   * @returns 
   */
  addDataNode(data: DataNode): Promise<any> {
    return axios({
      method: "POST",
      url: `/api/v1/node/datanode/addDataNode`,
      data
    })
  },

}


export default dataNodeApi;