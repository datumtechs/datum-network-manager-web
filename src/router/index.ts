import React from 'react'

const login = React.lazy(() => import('../pages/Login').then(({ Login }) => ({ default: Login })))
const layout = React.lazy(() => import('../layout/index').then(({ Layout }) => ({ default: Layout })))
// const overview = React.lazy(() => import('../pages/overview/index').then(({ overview }) => ({ default: overview })))
// const nodeMgt = React.lazy(() => import('../pages/nodeMgt/index').then(({ nodeMgt }) => ({ default: nodeMgt })))
// const resource = React.lazy(() => import('../pages/resource/index').then(({ resource }) => ({ default: resource })))
// const tasks = React.lazy(() => import('../pages/tasks/index').then(({ tasks }) => ({ default: tasks })))
// const did = React.lazy(() => import('../pages/did/index').then(({ did }) => ({ default: did })))
// const overview = loadComponent('../pages/overview/index')
// const nodeMgt = loadComponent('../pages/nodeMgt/index')
// const resource = loadComponent('../pages/resource/index')

export interface IRouteMeta {
  title: string
  icon: string
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
  { name: 'Login', path: '/login', component: login, meta: { title: '', icon: '' } },
  {
    path: '/',
    component: layout,
    redirect: '/overview',
    meta: { title: '', icon: '' },
    children: [
      // { name: 'System Overview', path: '/overview', component: overview, meta: { title: '', icon: '' }, children: [] },
      // { name: 'Node Management', path: '/management', component: nodeMgt, meta: { title: '', icon: '' }, children: [] },
      // { name: 'Resource Center', path: '/resource', component: resource, meta: { title: '', icon: '' }, children: [] },
      // { name: 'Computing Tasks', path: '/tasks', component: tasks, meta: { title: '', icon: '' }, children: [] },
      // { name: 'DID & Credentials', path: '/did', component: did, meta: { title: '', icon: '' }, children: [] }
    ],
  },
]

export default routes
