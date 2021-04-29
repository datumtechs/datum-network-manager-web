/* eslint-disable react/no-array-index-key */
import React, { FC, Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import layoutRoutes, { IRoute } from '../router/index'
import useLogin from '../hooks/useLogin'
// import { Layout } from '../layout/index'



// 此页功能为最外层的过滤 权限的判定 路由转发
const App: FC = () => {
  const login = React.lazy(() => import('../pages/Login').then(({ Login }) => ({ default: Login })))
  const isLogin = useLogin();
  console.log(isLogin);

  // const renderRoute = (route: IRoute) => {
  //   const { component: Component } = route;
  //   return (
  //     <Route
  //       key={route.path}
  //       exact={route.path !== '*'}
  //       path={route.path}
  //       render={props => (
  //         <Auth {...props} route={route}>
  //           <Component {...props} />
  //         </Auth>
  //       )}
  //     ></Route>
  //   );
  // }
  return (
    <Suspense fallback={<Spin size="large" className="global-loading" />}>

      {/* <Router>
        {isLogin ? <Route /> : <Route path="/login" component={login} />}
      </Router> */}
      <Router>
        {
          isLogin ?
            layoutRoutes.map((route: IRoute, key: number) => (
              <Route
                key={route.path + key}
                path={route.path}
                render={props => <route.component {...props} routes={route.children} />}
              />)) : <Route path="/login" component={login} />
        }
      </Router>
    </Suspense >
  )
}

export default App