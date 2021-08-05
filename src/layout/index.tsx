/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
import { Suspense, useEffect, createContext, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, useHistory, Switch, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import Header from './components/Header'
import { IRoute } from '../router/index'
import useLogin from '../hooks/useLogin'
import Auth from './Auth'
import useDid from '../hooks/useHasDid'
import './scss/layout.scss'
import { BaseInfo } from '../entity/index'
import { loginApi } from '../api/index'
import useInterval from '../hooks/useInterval'
import { tableInterVal } from '../constant/index'

export const BaseInfoContext = createContext<any>({
  carrierConnStatus: '',
  carrierConnTime: '',
  carrierIp: '',
  carrierNodeId: '',
  carrierPort: '',
  carrierStatus: '',
  identityId: '',
  name: '',
  recUpdateTime: '',
  status: '',
})

// import { getPageTitle, systemRouteList } from '../router/utils';
const Layout = (props: any) => {
  const history = useHistory()
  const [isLoading, isLoadingSet] = useState<boolean>(false)
  const [info, setInfo] = useState<BaseInfo>({
    carrierConnStatus: '',
    carrierConnTime: '',
    carrierIp: '',
    carrierNodeId: '',
    carrierPort: '',
    carrierStatus: '',
    identityId: '',
    name: '',
    recUpdateTime: '',
  })
  const { pathname } = useLocation()
  const fetchData = async () => {
    isLoadingSet(true)
    const result = await loginApi.queryBaseInfo()
    isLoadingSet(false)
    setInfo(result?.data)
    if (result && !result.data?.identityId) {
      history.push('/didApplication')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useInterval(() => {
    fetchData()
  }, tableInterVal)
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   fetchData()
  // }, [])

  return (
    <BaseInfoContext.Provider value={info}>
      <div className="main-container">
        <Header list={props.routes} className="header-container" />
        <div className="main-box">
          <div className={pathname === '/overview' ? 'wrapper-box' : 'main-wrapper-box '}>
            {isLoading ? (
              <div className="layout__loading">
                <Spin size="large" />
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="layout__loading">
                    <Spin size="large" />
                  </div>
                }
              >
                <Switch>
                  {props.routes.map((route: IRoute) => (
                    <Route
                      path={route.path}
                      key={route.path}
                      exact={route.meta.exact}
                      render={prop => (
                        <Auth {...props} route={route}>
                          <route.component {...prop} routes={route.children} />
                        </Auth>
                      )}
                    />
                  ))}
                  <Redirect from="/*" exact to="/overview" push />
                  {/* {info?.identityId ? (
                      <Redirect from="/*" exact to="/overview" push />
                    ) : (
                      <Redirect from="/*" to="/didApplication" push />
                    )} */}
                </Switch>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </BaseInfoContext.Provider>
  )
}

export default connect((state: any) => ({ state }))(Layout)
