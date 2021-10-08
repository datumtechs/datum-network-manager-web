interface BaseInfo {
  carrierConnStatus: string
  carrierConnTime: string | number
  carrierIp: string | number
  carrierNodeId: string | number
  carrierPort: string | number
  carrierStatus: string
  identityId: string | number
  name: string
  recUpdateTime: string | number,
}
interface SearchPageTable {
  keyword?: string
  pageNumber: number,
  pageSize: number,
  identityId?: string,
  powerNodeId?: string
}

interface DataNode {
  externalIp: string,
  externalPort: number,
  internalIp: string,
  internalPort: number,
  nodeId?: string,
  nodeName?: string,
}

interface ComputeNode {
  externalIp: string,
  externalPort: number,
  internalIp: string,
  internalPort: number,
  powerNodeName?: string,
  remarks?: string,
  powerNodeId?: string,
}

interface Row {
  core: string,
  memory: string,
  bandwidth: string,
  remarks: string,
}

interface taskQueryObj {
  endTime: number,
  keyWord?: string,
  pageNumber: number,
  pageSize: number,
  role?: number,
  startTime: number,
  status?: string
}

interface TaskObj {
  createAt: string,
  id: string,
  reviewed: boolean,
  role: number,
  status: string,
  taskName: string
}



export type { BaseInfo, DataNode, SearchPageTable, ComputeNode, Row, taskQueryObj, TaskObj }