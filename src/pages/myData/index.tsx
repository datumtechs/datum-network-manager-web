import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { IRoute } from '@/router'

export const MyData: FC<any> = ({ routes }) => (
  <Switch>
    {routes.map((route: IRoute) => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.meta.exact}
        render={prop => <route.component {...prop} routes={route.children ?? route.children} />}
      ></Route>
    ))}
    <Redirect from="/myData" exact to="/myData/dataMgt" push />
  </Switch>
)

export default MyData
