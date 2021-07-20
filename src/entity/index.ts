interface BaseInfo {
  carrierConnStatus: string
  carrierConnTime: string | number
  carrierIp: string | number
  carrierNodeId: string | number
  carrierPort: string | number
  carrierStatus: string
  identityId: string | number
  name: string
  recUpdateTime: string | number
}
interface SearchPageTable {
  keyword: string
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
  nodeId: string,
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

export type { BaseInfo, DataNode, SearchPageTable, ComputeNode }