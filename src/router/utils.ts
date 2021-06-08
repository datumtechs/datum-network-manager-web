import routes, { IRoute } from './index';


function findRoutesByPaths(pathList: string[], routeList: IRoute[], basename?: string): IRoute[] {
  return routeList.filter(
    (child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1,
  );
}
/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由是否需要检查授权, 路由配置的auth优先级比这里高
 */

export function flattenRoute(routeList: IRoute[], deep: boolean, auth: boolean): IRoute[] {
  const result: IRoute[] = [];

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];

    result.push({
      ...route,
      // auth: typeof route.auth !== 'undefined' ? route.auth : auth,
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep, auth));
    }
  }

  return result;
}
function getBusinessRouteList(): IRoute[] {
  const routeList = routes.filter(route => route.path === '/');

  if (routeList.length > 0) {
    return flattenRoute(routeList, true, true);
  }
  return [];
}
export const businessRouteList = getBusinessRouteList();
export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')));
}
/**
 * 只有业务路由会有面包屑
 */
export function getBreadcrumbs(): IRoute[] {
  return findRoutesByPaths(getPagePathList(), businessRouteList);
}









