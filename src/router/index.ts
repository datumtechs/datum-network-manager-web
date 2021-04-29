import React from 'react'

const login = React.lazy(() => import('../pages/Login').then(({ Login }) => ({ default: Login })))
const layout = React.lazy(() => import('../layout/index').then(_ => ({ default: _.Layout })))
const overview = React.lazy(() => import('../pages/overview/index').then(_ => ({ default: _.overview })))
const nodeMgt = React.lazy(() => import('../pages/nodeMgt/index').then(_ => ({ default: _.nodeMgt })))
const resource = React.lazy(() => import('../pages/resource/index').then(_ => ({ default: _.resource })))
const tasks = React.lazy(() => import('../pages/tasks/index').then(_ => ({ default: _.tasks })))
const did = React.lazy(() => import('../pages/did/index').then(_ => ({ default: _.did })))

export interface IRouteMeta {
  title: string
  icon: string
  exact: boolean
}
export interface IRouteBase {
  name?: string
  path: string
  component?: any
  meta: IRouteMeta
  redirect?: string
}

export interface IRoute extends IRouteBase {
  children?: IRoute[]
}

const routes: Array<IRoute> = [
  { name: 'Login', path: '/login', component: login, meta: { exact: true, title: '', icon: '' } },
  {
    path: '/',
    component: layout,
    meta: { exact: true, title: '', icon: '' },
    children: [
      {
        name: 'System Overview',
        path: '/overview',
        component: overview,
        meta: { exact: true, title: '', icon: '' },
        children: [],
      },
      {
        name: 'Node Management',
        path: '/nodeMgt',
        component: nodeMgt,
        meta: { exact: true, title: '', icon: '' },
        children: [],
      },
      {
        name: 'Resource Center',
        path: '/resource',
        component: resource,
        meta: { exact: true, title: '', icon: '' },
        children: [],
      },
      {
        name: 'Computing Tasks',
        path: '/tasks',
        component: tasks,
        meta: { exact: true, title: '', icon: '' },
        children: [],
      },
      {
        name: 'DID & Credentials',
        path: '/did',
        component: did,
        meta: { exact: true, title: '', icon: '' },
        children: [],
      },
    ],
  },
]

export default routes
