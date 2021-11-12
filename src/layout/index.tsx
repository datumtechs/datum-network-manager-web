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
  const { state: { Loading } } = props
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
  const [sum, setSum] = useState<number>(0)
  const fetchData = async () => {
    const result = await loginApi.queryBaseInfo()
    setInfo(result?.data)
  }

  useEffect((): any => {
    isLoadingSet(true)
    loginApi.queryBaseInfo().then(res => {
      isLoadingSet(false)
      if (res.status === 1001) {
        props.setIsReg(false)
        history.push('/didApplication')
        return
      }
      if (res.status === 0) {
        props.setOrg(res.data)
      }
      props.setIsReg(true)
    })
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
            {/* {isLoading ? (
              <div className="layout__loading">
                <Spin size="large" />
              </div>
            ) : ( */}
            {/* <Spin spinning={Loading.Loading}> */}
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
