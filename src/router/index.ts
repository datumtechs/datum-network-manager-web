import React from 'react'

const loadComponent = (path: string) => {
  return React.lazy(() => import(path).then(({ name }) => ({ default: name })))
}

const overview = React.lazy(() => import('../pages/overview/index').then(({ overview }) => ({ default: overview })))
const nodeMgt = React.lazy(() => import('../pages/nodeMgt/index').then(({ nodeMgt }) => ({ default: nodeMgt })))
const resource = React.lazy(() => import('../pages/resource/index').then(({ resource }) => ({ default: resource })))
// const overview = loadComponent('../pages/overview/index')
// const nodeMgt = loadComponent('../pages/nodeMgt/index')
// const resource = loadComponent('../pages/resource/index')

export interface IRouteMeta {
  title: string
  icon: string
}
export interface IRouteBase {
  name: string
  path: string
  component?: any
  meta: IRouteMeta
}

export interface IRoute extends IRouteBase {
  children?: IRoute[]
}

const routes: Array<IRoute> = [
  { name: 'System Overview', path: '/overview', component: overview, meta: { title: '', icon: '' }, children: [] },
  { name: 'Node Management', path: '/management', component: nodeMgt, meta: { title: '', icon: '' }, children: [] },
  { name: 'Resource Center', path: '/resource', component: resource, meta: { title: '', icon: '' }, children: [] }
  // { name: 'Computing Tasks', path: '/tasks', component: '', meta: { title: '', icon: '' }, children: [] },
  // { name: 'DID & Credentials', path: '/did', component: '', meta: { title: '', icon: '' }, children: [] }
]

export default routes
