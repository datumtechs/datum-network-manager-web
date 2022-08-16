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
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { KeepAliveInclude } from '@/router/utils'

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
    if (result.status === 1005 || !result.data.identityId) {
      props.setIsReg(false)
      history.push('/didApplication')
      return
    }
    if (result.status === 0) {
      props.setOrg(result.data)
    }
    // props.setIsReg(true)
    setInfo(result?.data)
  }

  const timeFetchData = () => {
    fetchData()
  }

  useEffect((): any => {
    if (!Object.keys(props?.state?.loginInfo?.loginInfo).length) {
      history.push('/login')
      console.log(111);

      return
    }
    fetchData(true)
  }, [])

  useInterval(() => {
    timeFetchData()
  }, tableInterVal)
  return (
    <BaseInfoContext.Provider value={{ ...info, fetchData }}>
      <div className="main-container">
        <SideBar list={props.routes}></SideBar>
        <div className="main-box">
          <Header className="header-container" />
          <div className={'wrapper-box'}>
            <Spin size="large" spinning={Loading.Loading} style={{ height: '90vh', maxHeight: '90vh' }}>
              <Suspense
                fallback={
                  <div className="layout__loading">
                    <Spin size="large" />
                  </div>
                }
              >
                <CacheSwitch>
                  {props.routes.map((route: IRoute) => {
                    if (KeepAliveInclude.includes(route.path)) {
                      return <CacheRoute
                        path={route.path}
                        key={route.path}
                        cacheKey={route.path}
                        exact={route.meta.exact}
                        render={prop => (
                          <Auth {...props} route={route}>
                            <route.component {...prop} routes={route.children} />
                          </Auth>
                        )}
                      />
                    }
                    return <Route
                      path={route.path}
                      key={route.path}
                      exact={route.meta.exact}
                      render={prop => (
                        <Auth {...props} route={route}>
                          <route.component {...prop} routes={route.children} />
                        </Auth>
                      )}
                    />
                  })}
                  <Redirect from="/*" exact to="/overview" push />
                </CacheSwitch>
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
