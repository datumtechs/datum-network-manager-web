import React from 'react'

const login = React.lazy(() => import('../pages/Login/index').then(({ Login }) => ({ default: Login })))
const layout = React.lazy(() => import('../layout/index').then(_ => ({ default: _.Layout })))
const overview = React.lazy(() => import('../pages/overview/index').then(_ => ({ default: _.overview })))
const NodeMgt = React.lazy(() => import('../pages/nodeMgt/index').then(_ => ({ default: _.NodeMgt })))
const resource = React.lazy(() => import('../pages/resource/index').then(_ => ({ default: _.resource })))
const DispatchConfig = React.lazy(() => import('../pages/nodeMgt/DispatchConfig').then(_ => ({ default: _.DispatchConfig })))
const DataNodeMgt = React.lazy(() => import('../pages/nodeMgt/DataNodeMgt').then(_ => ({ default: _.DataNodeMgt })))
const ComputeNodeMgt = React.lazy(() => import('../pages/nodeMgt/ComputeNodeMgt').then(_ => ({ default: _.ComputeNodeMgt })))
const tasks = React.lazy(() => import('../pages/tasks/index').then(_ => ({ default: _.tasks })))
const DidApplication = React.lazy(() => import('../pages/did/DidApplication').then(_ => ({ default: _.DidApplication })))
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

}

export interface IRoute extends IRouteBase {
  children?: IRoute[]
}

const routes: Array<IRoute> = [
  { name: 'login', breadcrumbName: '', label: 'login', path: '/login', component: login, meta: { exact: true, title: '', icon: '', show: false } },
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
        component: overview,
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'didApplication',
        label: 'menu.didApplication',
        breadcrumbName: 'menu.didApplication',
        path: '/didApplication',
        component: DidApplication,
        meta: { exact: true, title: '', icon: '', show: false }
      },
      {
        name: 'nodeMgt',
        label: 'menu.nodeMgt',
        breadcrumbName: 'menu.nodeMgt',
        path: '/nodeMgt',
        component: NodeMgt,
        meta: { exact: false, title: '', icon: '', show: true },
        children: [
          {
            name: 'dispatchConfig',
            label: 'menu.dispatchConfig',
            breadcrumbName: 'menu.dispatchConfig',
            path: '/nodeMgt/dispatchConfig',
            component: DispatchConfig,
            meta: { exact: true, title: '', icon: '', show: true },
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
            name: 'computeNodeMgt',
            label: 'menu.computeNodeMgt',
            breadcrumbName: 'menu.computeNodeMgt',
            path: '/nodeMgt/computeNodeMgt',
            component: ComputeNodeMgt,
            meta: { exact: true, title: '', icon: '', show: true },
          },
        ],
      },
      {
        name: 'resourceCenter',
        label: 'menu.resourceCenter',
        breadcrumbName: 'menu.resourceCenter',
        path: '/resource',
        component: resource,
        meta: { exact: false, title: '', icon: '', show: true },
        children: [
          {
            name: 'myData',
            label: 'menu.myData',
            breadcrumbName: 'menu.myData',
            path: '/resource/myData',
            component: resource,
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'wholeData',
            label: 'menu.wholeData',
            breadcrumbName: 'menu.wholeData',
            path: '/resource/wholeData',
            component: resource,
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'wholeCalculation',
            label: 'menu.wholeCalculation',
            breadcrumbName: 'menu.wholeCalculation',
            path: '/resource/wholeCalculation',
            component: resource,
            meta: { exact: true, title: '', icon: '', show: true },
          },
        ],
      },
      {
        name: 'computeTask',
        label: 'menu.computeTask',
        breadcrumbName: 'menu.computeTask',
        path: '/tasks',
        component: tasks,
        meta: { exact: true, title: '', icon: '', show: true },
      }
      // {
      //   name: 'DID & Credentials',
      //   path: '/did',
      //   component: did,
      //   meta: { exact: true, title: '', icon: '' },
      //   children: [],
      // },
    ],
  },
]

export default routes
