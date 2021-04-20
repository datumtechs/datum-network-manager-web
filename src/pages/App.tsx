import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import layoutRoutes from '../router/index'
import { IRoute } from '../router/index'
import Auth from '../layout/Auth'

export default function App() {


  const renderRoute = (route: IRoute) => {
    const { component: Component } = route;
    return (
      <Route
        key={route.path}
        exact={route.path !== '*'}
        path={route.path}
        render={props => (
          <Auth {...props} route={route}>
            <Component {...props} />
          </Auth>
        )}
      ></Route>
    );
  }
  return (
    <Suspense fallback={<Spin size="large" className="global-loading" />}>
      <Router>
        <Switch>
          {
            layoutRoutes.map((route: IRoute) => (
              // console.log(route)
              // if(route.children){

              // }
              <Route exact key={route.path} path={route.path}></Route>
            ))
          }
        </Switch>
      </Router>
    </Suspense >
  )
}
