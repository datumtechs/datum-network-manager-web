/* eslint-disable react/jsx-key */
import { Suspense, useEffect } from 'react'
import { Route, Redirect, useHistory, Switch } from 'react-router-dom'
import { Spin } from 'antd'
import Header from './components/Header'
import { IRoute } from '../router/index'
import useLogin from '../hooks/useLogin'
// import Auth from './Auth'

import './css/layout.scss'
// import { getPageTitle, systemRouteList } from '../router/utils';
export const Layout = (props: any) => {
  const isLogin = useLogin()
  const history = useHistory()

  useEffect(() => {
    if (isLogin) {
      console.log('inside')
    } else {
      history.push('/login')
    }
  }, [isLogin])

  return (
    <div className="main-container">
      <Header list={props.routes} className="header-container" />
      <div className="main-box">
        <Suspense fallback={<Spin size="large" className="layout__loading" />}>
          <Switch>
            {props.routes.map((route: IRoute) => (
              // 第一层
              <Route
                path={route.path}
                key={route.path}
                exact={route.meta.exact}
                render={prop => (
                  // <Auth {...pr} route={route}>
                  <route.component {...prop} routes={route.children} />
                  // </Auth>
                )}
              />
            ))}
            <Redirect from="/*" exact to="/overview" push />
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}
