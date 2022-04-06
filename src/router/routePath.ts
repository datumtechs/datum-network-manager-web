import React from 'react'

function handDefault(item, mode?) {
  if (item.default) {
    return item
  }

  return {
    default: typeof item == 'string' ? mode[item] : Object.values(item)[0]
  }
}


export const routerParams = {
  login: import('@/pages/Login/index').then(handDefault),
  layout: import('@/layout/index').then(handDefault),
  Overview: import('@/pages/overview/index').then(handDefault),
  NodeMgt: import('@/pages/nodeMgt/index').then(handDefault),
  MyData: import('@/pages/myData/index').then(handDefault),
  DataMgt: import('@/pages/myData/DataMgt/DataMgt').then(handDefault),


  MyDetailTask: import('@/pages/myData/DataMgt/components/MyDetailTask').then(handDefault),
  MyDataAddtion: import('@/pages/myData/DataAddition/MyDataAddtion').then(handDefault),
  NewDataAddtion: import('@/pages/myData/DataMgt/components/NewDataAddtion').then(handDefault),
  AuthInfo: import('@/pages/myData/DataAuthorization/AuthInfo').then(handDefault),
  MyDataDetail: import('@/pages/myData/DataMgt/components/MyDataDetail').then(handDefault),


  DataAuthorization: import('@/pages/myData/DataAuthorization/DataAuthorization').then(handDefault),
  DispatchConfig: import('@/pages/nodeMgt/DispatchConfig').then(handDefault),
  DataNodeMgt: import('@/pages/nodeMgt/DataNodeMgt/DataNodeMgt').then(handDefault),
  EditNodeMgt: import('@/pages/nodeMgt/DataNodeMgt/EditNodeMgt').then(handDefault),
  ComputeNodeMgt: import('@/pages/nodeMgt/ComputeNodeMgt/ComputeNodeMgt').then(handDefault),


  EditComputeNode: import('@/pages/nodeMgt/ComputeNodeMgt/EditComputeNode').then(handDefault),
  ComputeNodeDetail: import('@/pages/nodeMgt/ComputeNodeMgt/ComputeNodeDetail').then(handDefault),
  Tasks: import('@/pages/tasks/index').then(handDefault),
  TaskDetail: import('@/pages/tasks/TaskDetail').then(handDefault),
  TaskEvent: import('@/pages/tasks/TaskEvent').then(handDefault),


  DidApplication: import('@/pages/did/DidApplication').then(handDefault),
  SeedNodeMgt: import('@/pages/nodeMgt/SeedNode/SeedNodeMgt').then(handDefault),
  AddSeedNode: import('@/pages/nodeMgt/SeedNode/AddSeedNode').then(handDefault),
  DataDetail: import('@/components/DataDetail').then(handDefault.bind(this, 'DataDetail')),//处理文件到处多个节点问题

  MetisIdentity: import('@/pages/userCenter/MetisIdentity').then(handDefault),
  Profile: import('@/pages/userCenter/Profile').then(handDefault),
  UpdateAdmin: import('@/pages/userCenter/UpdateAdmin').then(handDefault),

  Voucher: import('@/pages/voucher').then(handDefault),
  TemplateVouvher: import('@pages/voucher/Template').then(handDefault),
  NoAttributeVoucher: import('@pages/voucher/NoAttribute').then(handDefault),
  VoucherDetauls: import('@pages/voucher/components/Detail').then(handDefault),
  PriceSet: import('@pages/voucher/components/PriceSet').then(handDefault),
  CredentialInfo: import('@pages/voucher/components/CredentialInfo').then(handDefault),

  MyTemplate: import('@pages/MyTemplate').then(handDefault),

}

export function handLazy(item) {
  return React.lazy(() => routerParams[item])
}