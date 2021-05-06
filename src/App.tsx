/* eslint-disable react/no-array-index-key */
import React, { FC, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd'
import layoutRoutes, { IRoute } from './router/index'

// import Auth from './layout/Auth'
// import useLogin from '../hooks/useLogin'
// import { Layout } from '../layout/index'

const App: FC = () => (
  <Suspense fallback={<Spin size="large" className="global-loading" />}>
    {/* {
      layoutRoutes.map((route: IRoute, key: number) => (
        <Switch>
          <Route
            key={route.path + key}
            path={route.path}
            render={props =>
              <route.component {...props} routes={route.children} />} />
        </Switch>
      )
    } */}
    <Router>
      <Switch>
        {
          layoutRoutes.map((route: IRoute, key: number) => (
            <Route
              key={route.path + key}
              path={route.path}
              render={props =>
                <route.component {...props} routes={route.children} />
              } />
          ))
        }
      </Switch>
    </Router>
  </Suspense >
)


export default App