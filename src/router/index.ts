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

export const  basicsRouters = [
 
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
        component: handLazy('DatumIdentity'),
        meta: { exact: true, title: '/userCenter/userInfo', icon: '', show: false },
      },
      {
        name: 'updateAdmin',
        label: 'menu.updateAdmin',
        breadcrumbName: 'menu.updateAdmin',
        path: '/userCenter/updateAdmin',
        component: handLazy('UpdateAdmin'),
        meta: { exact: true, title: '/userCenter/updateAdmin', icon: '', show: false },
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
        name: 'dataNodeMgt',
        label: 'menu.dataNodeMgt',
        breadcrumbName: 'menu.dataNodeMgt',
        path: '/nodeMgt/dataNodeMgt',
        component: handLazy('DataNodeMgt'),
        meta: { exact: true, title: '', icon: '', show: true },
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
        name: 'DataVoucherPublishing',
        label: 'menu.publishDataVoucher',
        breadcrumbName: 'menu.publishDataVoucher',
        path: `/myData/dataVoucherPublishing`,
        component: handLazy('DataVoucherPublishing'),
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'CredentialInfo',
        label: 'menu.CredentialInfo',
        breadcrumbName: 'menu.CredentialInfo',
        path: `/myData/dataVoucherPublishing/CredentialInfo`,
        component: handLazy('CredentialInfo'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'AttributedPublishing',
        label: 'menu.CredentialInfo',
        breadcrumbName: 'menu.CredentialInfo',
        path: `/myData/dataVoucherPublishing/AttributedPublishing`,
        component: handLazy('AttributedPublishing'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'PriceSet',
        label: 'menu.PriceSet',
        breadcrumbName: 'menu.PriceSet',
        path: `/myData/dataVoucherPublishing/PriceSet`,
        component: handLazy('PriceSet'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
     
    ],
  },
  {
    name: 'MetaDataDetail',
    label: 'menu.metaDataDetail',
    breadcrumbName: 'menu.metaDataDetail',
    path: '/dataCenter/metaDataDetail',
    component: handLazy('DataDetail'),
    meta: { exact: true, title: '', icon: '', show: false },
  },
  {
    name: 'Voucher',
    label: 'menu.Voucher',
    breadcrumbName: 'menu.Voucher',
    path: '/voucher',
    component: handLazy('Voucher'),
    meta: { exact: false, title: '', icon: '', show: true },
    isOpen: false,
    children: [
      {
        name: 'NoAttributeVoucher',
        label: 'menu.NoAttributeVoucher',
        breadcrumbName: 'menu.NoAttributeVoucher',
        path: '/voucher/NoAttribute',
        component: handLazy('NoAttributeVoucher'),
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'AttributeCredential',
        label: 'menu.AttributeCredential',
        breadcrumbName: 'menu.AttributeCredential',
        path: '/voucher/AttributeCredential',
        component: handLazy('AttributeCredential'),
        meta: { exact: true, title: '', icon: '', show: true },
      },
      {
        name: 'createCredential',
        label: 'credential.createCredential',
        breadcrumbName: 'credential.createCredential',
        path: '/voucher/AttributeCredential/createCredential',
        component: handLazy('CreateAttriCredential'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'credentialInventory',
        label: 'credential.credentialInventory',
        breadcrumbName: 'credential.credentialInventory',
        path: '/voucher/AttributeCredential/credentialInventory',
        component: handLazy('CredentialInventory'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
      {
        name: 'credentialDetails',
        label: 'credential.credentialDetails',
        breadcrumbName: 'credential.credentialDetails',
        path: '/voucher/AttributeCredential/credentialDetails',
        component: handLazy('CredentialDetails'),
        meta: { exact: true, title: '', icon: '', show: false },
      },
    ]
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
  {
    name: 'OrgManage',
    label: 'menu.orgManage',
    breadcrumbName: 'menu.orgManage',
    path: '/OrgManage',
    component: handLazy('OrgManage'),
    meta: { exact: true, title: '', icon: '', show: true ,class:"word-brack"},
  },
  {
    name: 'NominationCommittee',
    label: 'menu.nominationCommittee',
    breadcrumbName: 'menu.nominationCommittee',
    path: '/OrgManage/nominationCommittee',
    component: handLazy('NominationCommittee'),
    meta: { exact: true, title: '', icon: '', show: false },
  },
  {
    name: 'applyCertification',
    label: 'menu.applyCertification',
    breadcrumbName: 'menu.applyCertification',
    path: '/OrgManage/applyCertification',
    component: handLazy('ApplyCertification'),
    meta: { exact: true, title: '', icon: '', show: false },
  },
  {
    name: 'orgManageApplyDetails',
    label: 'menu.orgManageApplyDetails',
    breadcrumbName: 'menu.orgManageApplyDetails',
    path: '/OrgManage/orgManageApplyDetails',
    component: handLazy('OrgManageApplyDetails'),
    meta: { exact: true, title: '', icon: '', show: false },
  },
 
]


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
      }
    ]
  },
]

export default routes
