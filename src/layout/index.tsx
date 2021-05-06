/* eslint-disable react/jsx-key */
import { Suspense, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { Spin } from 'antd'
import Header from './components/Header'
import { IRoute } from '../router/index'
import useLogin from '../hooks/useLogin'
import Auth from './Auth'

import './css/layout.scss'
// import { getPageTitle, systemRouteList } from '../router/utils';
export const Layout = (props: any) => {
  console.log(props);

  const isLogin = useLogin()
  const history = useHistory()

  useEffect(() => {
    if (isLogin) {
      console.log('inside');
    } else {
      history.push('/login')
    }
  }, [isLogin])

  return (
    <div className="container">
      <Header />
      <div className="main-box">
        <Suspense fallback={<Spin size="large" className="layout__loading" />}>
          {/* <Router> */}
          {/* <Switch> */}
          {props.routes.map((route: IRoute) => {
            console.log(route);
            return (
              <Route path={route.path} key={route.path} exact={route.meta.exact} component={route.component}
                render={pr => (
                  <Auth {...pr} route={route}>
                    <route.component {...pr} />
                  </Auth>)}
              />
            )
          })}
          <Redirect from='/*' exact to="/overview" push />
          {/* </Switch> */}
          {/* </Router> */}
        </Suspense>
      </div>
    </div>
  )
}

