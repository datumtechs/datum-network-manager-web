import { handLazy } from './routePath'

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
    component: handLazy('login'),
    meta: { exact: true, title: '', icon: '', show: false },
  },
  {
    path: '/',
    component: handLazy('layout'),
    meta: { exact: false, title: '', icon: '', show: false },
    breadcrumbName: '',
    children: [
      {
        name: 'overview',
        label: 'menu.systemOverview',
        breadcrumbName: 'menu.systemOverview',
        path: '/overview',
        component: handLazy('Overview'),
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'didApplication',
        label: 'menu.didApplication',
        breadcrumbName: 'menu.didApplication',
        path: '/didApplication',
        component: handLazy('DidApplication'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'userCenter',
        label: 'menu.userCenter',
        breadcrumbName: 'menu.userCenter',
        path: '/userCenter',
        component: handLazy('NodeMgt'),
        meta: { exact: false, title: '', icon: '', show: false },
        isOpen: false,
        children: [
          {
            name: 'Profile',
            label: 'menu.Profile',
            breadcrumbName: 'menu.Profile',
            path: '/userCenter/Profile',
            component: handLazy('Profile'),
            meta: { exact: true, title: '/userCenter/Profile', icon: '', show: false },
          },
          {
            name: 'userInfo',
            label: 'menu.userInfo',
            breadcrumbName: 'menu.userInfo',
            path: '/userCenter/userInfo',
            component: handLazy('MetisIdentity'),
            meta: { exact: true, title: '/userCenter/userInfo', icon: '', show: false },
          },
        ]
      },
      {
        name: 'nodeMgt',
        label: 'menu.nodeMgt',
        breadcrumbName: 'menu.nodeMgt',
        path: '/nodeMgt',
        component: handLazy('NodeMgt'),
        meta: { exact: false, title: '', icon: '', show: true },
        isOpen: false,
        children: [
          {

            name: 'seedNodeMgt',
            label: 'menu.seedNodeMgt',
            breadcrumbName: 'menu.seedNodeMgt',
            path: '/nodeMgt/SeedNodeMgt',
            component: handLazy('SeedNodeMgt'),
            meta: { exact: true, title: '/nodeMgt/SeedNodeMgt', icon: '', show: true },
          },
          {

            name: 'addSeedNode',
            label: 'menu.addSeedNode',
            breadcrumbName: 'menu.addSeedNode',
            path: '/nodeMgt/SeedNodeMgt/addSeedNode',
            component: handLazy('AddSeedNode'),
            meta: { exact: true, title: '', icon: '', show: false },
          },
          {
            name: 'dispatchConfig',
            label: 'menu.dispatchConfig',
            breadcrumbName: 'menu.dispatchConfig',
            path: '/nodeMgt/dispatchConfig',
            component: handLazy('DispatchConfig'),
            meta: { exact: true, title: '/nodeMgt/dispatchConfig', icon: '', show: false },
          },
          {
            name: 'dataNodeMgt',
            label: 'menu.dataNodeMgt',
            breadcrumbName: 'menu.dataNodeMgt',
            path: '/nodeMgt/dataNodeMgt',
            component: handLazy('DataNodeMgt'),
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'editDataNodeMgt',
            label: 'menu.editDataNode',
            breadcrumbName: 'menu.editDataNode',
            path: '/nodeMgt/dataNodeMgt/editDataNode',
            component: handLazy('EditNodeMgt'),
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
            component: handLazy('EditNodeMgt'),
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
            component: handLazy('ComputeNodeMgt'),
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'editComputeNodeMgt',
            label: 'menu.editDataNode',
            breadcrumbName: 'menu.editDataNode',
            path: '/nodeMgt/computeNodeMgt/editComputeNode',
            component: handLazy('EditComputeNode'),
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
            breadcrumbName: 'menu.addComputeNodeMgt',
            path: '/nodeMgt/computeNodeMgt/addComputeNode',
            component: handLazy('EditComputeNode'),
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
            component: handLazy('ComputeNodeDetail'),
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
        component: handLazy('MyData'),
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
            component: handLazy('DataMgt'),
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'newDataAddtion',
            label: 'myData.newDataAddtion',
            breadcrumbName: 'myData.newDataAddtion',
            path: '/myData/dataMgt/saveNewData',
            component: handLazy('NewDataAddtion'),
            meta: { exact: true, title: '', icon: '', show: false },
          },
          {
            name: 'dataDetail',
            label: 'center.dataDetail',
            breadcrumbName: 'center.dataDetail',
            path: '/myData/dataMgt/dataDetail',
            component: handLazy('DataDetail'),
            // component: DataDetail,
            meta: { exact: true, title: '', icon: '', show: false },
          },
          {
            name: 'dataDetailTask',
            label: 'menu.dataDetailTask',
            breadcrumbName: 'menu.dataDetailTask',
            path: '/myData/dataMgt/dataDetail/dataDetailTask',
            component: handLazy('MyDetailTask'),
            meta: { exact: true, title: '', icon: '', show: false },
          },

          {
            name: 'taskDetail',
            label: 'menu.taskDetail',
            breadcrumbName: 'menu.taskDetail',
            path: '/myData/dataMgt/dataDetail/dataDetailTask/taskDetail',
            component: handLazy('TaskDetail'),
            meta: { exact: true, title: '', icon: '', show: false },
          },
          {
            name: 'TaskEvent',
            label: 'menu.taskEvents',
            breadcrumbName: 'menu.taskEvents',
            path: '/myData/dataMgt/dataDetail/dataDetailTask/TaskEvent',
            component: handLazy('TaskEvent'),
            meta: { exact: true, title: '', icon: '', show: false },
          },


          {
            name: 'dataAddition',
            label: 'menu.dataAddition',
            breadcrumbName: 'menu.dataAddition',
            path: '/myData/dataAddition',
            component: handLazy('MyDataAddtion'),
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'dataAuthorization',
            label: 'menu.dataAuthorization',
            breadcrumbName: 'menu.dataAuthorization',
            path: '/myData/dataAuthorization',
            component: handLazy('DataAuthorization'),
            meta: { exact: true, title: '', icon: '', show: true },
          },
          {
            name: 'authInfo',
            label: 'menu.viewAuthInfo',
            breadcrumbName: 'menu.viewAuthInfo',
            path: '/myData/dataAuthorization/authInfo',
            component: handLazy('AuthInfo'),
            meta: { exact: true, title: '', icon: '', show: false },
          },
          {
            name: 'infoModify',
            label: 'center.infoModify',
            breadcrumbName: 'center.infoModify',
            path: '/myData/infoModify',
            component: handLazy('MyDataDetail'),
            meta: { exact: true, title: '', icon: '', show: false },
          },
        ],
      },
      {
        name: 'computeTask',
        label: 'menu.computeTask',
        breadcrumbName: 'menu.computeTask',
        path: '/tasks',
        component: handLazy('Tasks'),
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'taskDetail',
        label: 'menu.taskDetail',
        breadcrumbName: 'menu.taskDetail',
        path: '/tasks/taskDetail',
        component: handLazy('TaskDetail'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'TaskEvent',
        label: 'menu.taskEvents',
        breadcrumbName: 'menu.taskEvents',
        path: '/tasks/TaskEvent',
        component: handLazy('TaskEvent'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      // 全网数据暂时隐藏 2021 11 02 李发攀
      // {
      //   name: 'DataCenter',
      //   label: 'menu.dataCenter',
      //   breadcrumbName: 'menu.dataCenter',
      //   path: '/dataCenter',
      //   component: DataCenter,
      //   meta: { exact: true, title: '', icon: '', show: true },
      // },
      {
        name: 'MetaDataDetail',
        label: 'menu.metaDataDetail',
        breadcrumbName: 'menu.metaDataDetail',
        path: '/dataCenter/metaDataDetail',
        component: handLazy('DataDetail'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      // 全网算力暂时隐藏 2021 11 02 李发攀
      // {
      //   name: 'ComputationCenter',
      //   label: 'menu.computationCenter',
      //   breadcrumbName: 'menu.computationCenter',
      //   path: '/computationCenter',
      //   component: ComputationCenter,
      //   meta: { exact: true, title: '', icon: '', show: true },
      // },
    ],
  },
]

export default routes
