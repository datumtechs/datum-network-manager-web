import React from 'react'

const login = React.lazy(() => import('../pages/Login/index').then(_ => _))
const layout = React.lazy(() => import('../layout/index').then(_ => _))
const Overview = React.lazy(() => import('../pages/overview/index').then(_ => ({ default: _.Overview })))
const NodeMgt = React.lazy(() => import('../pages/nodeMgt/index').then(_ => ({ default: _.NodeMgt })))
// const Resource = React.lazy(() => import('../pages/resource/index').then(_ => ({ default: _.Resource })))
const MyData = React.lazy(() => import('../pages/myData/index').then(_ => ({ default: _.MyData })))
const DataMgt = React.lazy(() => import('../pages/myData/DataMgt/DataMgt').then(_ => ({ default: _.DataMgt })))

// const MetaDataDetail = React.lazy(() => import('../pages/resource/DataCenter/MetaDataDetail').then(_ => ({ default: _.MetaDataDetail })))

const DataAddition = React.lazy(() =>
  import('../pages/myData/DataAddition/index').then(_ => ({ default: _.DataAddition })),
)
const MyDataDetail = React.lazy(() =>
  import('../pages/myData/DataMgt/components/MyDataDetail').then(_ => ({ default: _.MyDataDetail })),
)
const DataAuthorization = React.lazy(() =>
  import('../pages/myData/DataAuthorization').then(_ => ({ default: _.DataAuthorization })),
)

const DispatchConfig = React.lazy(() => import('../pages/nodeMgt/DispatchConfig').then(_ => _))
const DataNodeMgt = React.lazy(() =>
  import('../pages/nodeMgt/DataNodeMgt/DataNodeMgt').then(_ => ({ default: _.DataNodeMgt })),
)
const EditNodeMgt = React.lazy(() =>
  import('../pages/nodeMgt/DataNodeMgt/EditNodeMgt').then(_ => ({ default: _.EditNodeMgt })),
)
const ComputeNodeMgt = React.lazy(() =>
  import('../pages/nodeMgt/ComputeNodeMgt/ComputeNodeMgt').then(_ => ({ default: _.ComputeNodeMgt })),
)
const EditComputeNode = React.lazy(() =>
  import('../pages/nodeMgt/ComputeNodeMgt/EditComputeNode').then(_ => ({ default: _.EditComputeNode })),
)
const ComputeNodeDetail = React.lazy(() =>
  import('../pages/nodeMgt/ComputeNodeMgt/ComputeNodeDetail').then(_ => ({ default: _.ComputeNodeDetail })),
)
const Tasks = React.lazy(() => import('../pages/tasks/index').then(_ => ({ default: _.Tasks })))
const TaskDetail = React.lazy(() => import('../pages/tasks/TaskDetail').then(_ => ({ default: _.TaskDetail })))
const TaskEvent = React.lazy(() => import('../pages/tasks/TaskEvent').then(_ => ({ default: _.TaskEvent })))
const DidApplication = React.lazy(() =>
  import('../pages/did/DidApplication').then(_ => ({ default: _.DidApplication })),
)

const DataCenter = React.lazy(() => import('../pages/DataCenter/DataCenter').then(_ => ({ default: _.DataCenter })))
const ComputationCenter = React.lazy(() =>
  import('../pages/ComputationCenter/ComputationCenter').then(_ => ({ default: _.ComputationCenter })),
)

// const did = React.lazy(() => import('../pages/did/index').then(_ => ({ default: _.did })))

export interface IRouteMeta {
  title: string
  icon: string
  exact: boolean
  show?: boolean
}
export interface IRouteBase {
  name?: string
  label?: string
  path: string
  component?: any
  meta: IRouteMeta
  redirect?: string
  breadcrumbName: string
  isOpen?: boolean
}

export interface IRoute extends IRouteBase {
  children?: IRoute[]
}

const routes: Array<IRoute> = [
  {
    name: 'login',
    breadcrumbName: '',
    label: 'login',
    path: '/login',
    component: login,
    meta: { exact: true, title: '', icon: '', show: false },
  },
  // {
  //   name: 'menu.dispatchConfig',
  //   path: '/nodeMgt/dispatchConfig',
  //   component: dispatchConfig,
  //   meta: { exact: true, title: '', icon: '' },
  // },
  {
    path: '/',
    component: layout,
    meta: { exact: false, title: '', icon: '', show: false },
    breadcrumbName: '',
    children: [
      {
        name: 'overview',
        label: 'menu.systemOverview',
        breadcrumbName: 'menu.systemOverview',
        path: '/overview',
        component: Overview,
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'didApplication',
        label: 'menu.didApplication',
        breadcrumbName: 'menu.didApplication',
        path: '/didApplication',
        component: DidApplication,
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'nodeMgt',
        label: 'menu.nodeMgt',
        breadcrumbName: 'menu.nodeMgt',
        path: '/nodeMgt',
        component: NodeMgt,
        meta: { exact: false, title: '', icon: '', show: true },
        isOpen: false,
        children: [
          {
            name: 'dispatchConfig',
            label: 'menu.dispatchConfig',
            breadcrumbName: 'menu.dispatchConfig',
            path: '/nodeMgt/dispatchConfig',
            component: DispatchConfig,
            meta: { exact: true, title: '/nodeMgt/dispatchConfig', icon: '', show: true },
          },
          {
            name: 'dataNodeMgt',
            label: 'menu.dataNodeMgt',
            breadcrumbName: 'menu.dataNodeMgt',
            path: '/nodeMgt/dataNodeMgt',
            component: DataNodeMgt,
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'editDataNodeMgt',
            label: 'menu.editDataNode',
            breadcrumbName: 'menu.editDataNode',
            path: '/nodeMgt/dataNodeMgt/editDataNode',
            component: EditNodeMgt,
            meta: {
              exact: true,
              title: '',
              icon: '',
              show: false,
            },
          },
          {
            name: 'addDataNodeMgt',
            label: 'menu.addDataNode',
            breadcrumbName: 'menu.addDataNode',
            path: '/nodeMgt/dataNodeMgt/addDataNode',
            component: EditNodeMgt,
            meta: {
              exact: true,
              title: '',
              icon: '',
              show: false,
            },
          },
          {
            name: 'computeNodeMgt',
            label: 'menu.computeNodeMgt',
            breadcrumbName: 'menu.computeNodeMgt',
            path: '/nodeMgt/computeNodeMgt',
            component: ComputeNodeMgt,
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'editComputeNodeMgt',
            label: 'menu.editDataNode',
            breadcrumbName: 'menu.editDataNode',
            path: '/nodeMgt/computeNodeMgt/editComputeNode',
            component: EditComputeNode,
            meta: {
              exact: true,
              title: '',
              icon: '',
              show: false,
            },
          },
          {
            name: 'addComputeNodeMgt',
            label: 'menu.addDataNode',
            breadcrumbName: 'menu.addDataNode',
            path: '/nodeMgt/computeNodeMgt/addComputeNode',
            component: EditComputeNode,
            meta: {
              exact: true,
              title: '',
              icon: '',
              show: false,
            },
          },
          {
            name: 'computeNodeDetail',
            label: 'menu.addDataNode',
            breadcrumbName: 'menu.computeNodeDetail',
            path: '/nodeMgt/computeNodeMgt/computeNodeDetail',
            component: ComputeNodeDetail,
            meta: {
              exact: true,
              title: '',
              icon: '',
              show: false,
            },
          },
        ],
      },
      {
        name: 'myData',
        label: 'menu.myData',
        breadcrumbName: 'menu.myData',
        path: '/myData',
        component: MyData,
        meta: { exact: false, title: '', icon: '', show: true },
        isOpen: false,
        children: [
          // {
          //   name: 'myData',
          //   label: 'menu.myData',
          //   breadcrumbName: 'menu.myData',
          //   path: '/resource/myData',
          //   component: MyData,
          //   meta: { exact: true, title: '', icon: '', show: true },
          // },
          {
            name: 'dataMgt',
            label: 'menu.dataMgt',
            breadcrumbName: 'menu.dataMgt',
            path: '/myData/dataMgt',
            component: DataMgt,
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'dataAddition',
            label: 'menu.dataAddition',
            breadcrumbName: 'menu.dataAddition',
            path: '/myData/dataAddition',
            component: DataAddition,
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'dataAuthorization',
            label: 'menu.dataAuthorization',
            breadcrumbName: 'menu.dataAuthorization',
            path: '/myData/dataAuthorization',
            component: DataAuthorization,
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'dataDetail',
            label: 'center.dataDetail',
            breadcrumbName: 'center.dataDetail',
            path: '/myData/dataDetail',
            component: MyDataDetail,
            meta: { exact: true, title: '', icon: '', show: false },
          },
          {
            name: 'infoModify',
            label: 'center.infoModify',
            breadcrumbName: 'center.infoModify',
            path: '/myData/infoModify',
            component: MyDataDetail,
            meta: { exact: true, title: '', icon: '', show: false },
          },
        ],
      },
      {
        name: 'computeTask',
        label: 'menu.computeTask',
        breadcrumbName: 'menu.computeTask',
        path: '/tasks',
        component: Tasks,
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'taskDetail',
        label: 'menu.computeTask',
        breadcrumbName: 'menu.computeTask',
        path: '/tasks/taskDetail',
        component: TaskDetail,
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'TaskEvent',
        label: 'menu.computeTask',
        breadcrumbName: 'menu.computeTask',
        path: '/tasks/TaskEvent',
        component: TaskEvent,
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'DataCenter',
        label: 'menu.dataCenter',
        breadcrumbName: 'menu.dataCenter',
        path: '/dataCenter',
        component: DataCenter,
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'ComputationCenter',
        label: 'menu.computationCenter',
        breadcrumbName: 'menu.computationCenter',
        path: '/computationCenter',
        component: ComputationCenter,
        meta: { exact: true, title: '', icon: '', show: true },
      },
    ],
  },
]

export default routes
