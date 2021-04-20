import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import layoutRoutes from '../router/index'
import { IRoute } from '../router/index'

export default function App() {
  return (
    <Suspense fallback={<Spin size="large" className="global-loading" />}>
      <Router>
        <Switch>
          {
            layoutRoutes.map((route: IRoute) => (
              <Route key={route.path} path={route.path} component={route.component} ></Route>
            ))
          }
        </Switch>
      </Router>
    </Suspense>
  )
}
