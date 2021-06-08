const routeList = [
  {
    name: 'overview',
    breadcrumbName: 'menu.systemOverview',
    path: '/overview',
  },
  {
    name: 'nodeMgt',
    breadcrumbName: 'menu.nodeMgt',
    path: '/nodeMgt',
    children: [
      {
        name: 'dispatchConfig',
        breadcrumbName: 'menu.dispatchConfig',
        path: '/dispatchConfig',
      },
      {
        name: 'dataNodeMgt',
        breadcrumbName: 'menu.dataNodeMgt',
        path: '/dataNodeMgt',
      },
      {
        name: 'computeNodeMgt',
        breadcrumbName: 'menu.computeNodeMgt',
        path: '/computeNodeMgt',
      },
    ],
  },
  {
    name: 'resourceCenter',
    breadcrumbName: 'menu.resourceCenter',
    path: '/resource',
    children: [
      {
        name: 'myData',
        breadcrumbName: 'menu.myData',
        path: '/myData',
      },
      {
        name: 'wholeData',
        breadcrumbName: 'menu.wholeData',
        path: '/wholeData',
      },
      {
        name: 'wholeCalculation',
        breadcrumbName: 'menu.wholeCalculation',
        path: '/wholeCalculation',
      },
    ],
  },
  {
    name: 'computeTask',
    breadcrumbName: 'menu.computeTask',
    path: '/tasks',
  }
]



export default routeList