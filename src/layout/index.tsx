/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
import { Suspense, useEffect, createContext, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, useHistory, Switch, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import Header from './components/Header'
import SideBar from './components/sideBar'
import { IRoute } from '../router'
import Auth from './Auth'
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
  const { state: { Loading } } = props,
    history = useHistory(),
    { pathname } = useLocation(),
    [info, setInfo] = useState<BaseInfo>({
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

  const fetchData = async (type?: boolean) => {
    const result = await loginApi.queryBaseInfo()
    // console.log(result);
    if (type) {
      if (result.status === 1001) {
        props.setIsReg(false)
        history.push('/didApplication')
        return
      }
      if (result.status === 0) {
        props.setOrg(result.data)
      }
      props.setIsReg(true)
    }
    setInfo(result?.data)
  }

  useEffect((): any => {
    fetchData(true)
  }, [])

  useInterval(() => {
    fetchData()
  }, tableInterVal)

  return (
    <BaseInfoContext.Provider value={info}>
      <div className="main-container">
        <SideBar list={props.routes}></SideBar>
        <div className="main-box">
          <Header className="header-container" />
          <div className={pathname === '/overview' ? 'wrapper-box' : 'main-wrapper-box '}>
            <Spin size="large" spinning={Loading.Loading} style={{ height: '90vh', maxHeight: '90vh' }}>
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
                </Switch>
              </Suspense>
            </Spin>
            {/* )} */}
          </div>
        </div>
      </div>
    </BaseInfoContext.Provider>
  )
}
const mapDispatchToProps = (dispatch: any) => ({
  setIsReg: (data) => {
    dispatch({
      type: 'SET_ISREG',
      data
    })
  },
  setOrg: (data) => {
    dispatch({
      type: 'SET_ORG_INFO',
      data
    })
  },
})
export default connect((state: any) => ({ state }), mapDispatchToProps)(Layout)
