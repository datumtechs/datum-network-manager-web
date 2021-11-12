import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { IRoute } from '@/router'

export const NodeMgt: FC<any> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route: IRoute) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.meta.exact}
          render={prop => <route.component {...prop} routes={route.children ?? route.children} />}
        ></Route>
      ))}
      <Redirect from="/nodeMgt" exact to="/nodeMgt/dispatchConfig" push />
      {/* <Route path="/nodeMgt/dispatchConfig" component={dispatchConfig}></Route> */}
    </Switch>
  )
}

export default NodeMgt
