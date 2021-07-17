/* eslint-disable react/jsx-key */
import { Suspense, useEffect, createContext } from 'react'
import { Route, Redirect, useHistory, Switch } from 'react-router-dom'
import { Spin } from 'antd'
import Header from './components/Header'
import { IRoute } from '../router/index'
import useLogin from '../hooks/useLogin'
import useBaseInfo from '../hooks/useBaseInfo'
import Auth from './Auth'
import useDid from '../hooks/useHasDid'
import './scss/layout.scss'
import { BaseInfo } from '../entity/index'

export const BaseInfoContext = createContext<BaseInfo>({
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

// import { getPageTitle, systemRouteList } from '../router/utils';
const Layout = (props: any) => {
  const isLogin = useLogin()
  const history = useHistory()
  const hasDid = useDid()
  const baseInfo = useBaseInfo()
  console.log('baseInfo=============>', baseInfo)

  // 计算是否登录
  useEffect(() => {
    if (isLogin) {
      console.log('inside')
    } else {
      history.push('/login')
    }
  }, [isLogin])

  // 计算基本信息
  // useEffect(() => {
  //   loginApi.queryBaseInfo().then(re => {
  //     console.log('baseInfo============>', re.data)
  //     if (re.status === 0 && re.data) {
  //       props.saveOrg(re.data)
  //       history.push('/')
  //       // if (res.data.identityId) {
  //       //   history.push('/')
  //       // } else {
  //       //   // 不存在id 则跳转到id页
  //       // }
  //     } else {
  //       // props.saveOrg(re.data)
  //       history.push('/didApplication')
  //     }
  //   })
  // }, [])

  return (
    <BaseInfoContext.Provider value={baseInfo}>
      <div className="main-container">
        <Header list={props.routes} className="header-container" />
        <div className="main-box">
          <div className="wrapper-box">
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
                {hasDid ? (
                  <Redirect from="/*" exact to="/overview" push />
                ) : (
                  <Redirect from="/*" to="/didApplication" push />
                )}
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    </BaseInfoContext.Provider>
  )
}

export default Layout
