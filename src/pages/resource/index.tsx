import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { IRoute } from '../../router/index'

export const Resource: FC<any> = ({ routes }) => (
  <Switch>
    {routes.map((route: IRoute) => (
      <Route key={route.path} path={route.path} render={prop => <route.component {...prop} />}></Route>
    ))}
    {/* <Route path="/nodeMgt/dispatchConfig" component={dispatchConfig}></Route> */}
  </Switch>
)

export default Resource
