/* eslint-disable react/no-array-index-key */
import { FC, Suspense, useEffect, useState, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Spin, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import zh from 'antd/lib/locale/zh_CN'
import en from 'antd/lib/locale/en_GB'
import layoutRoutes, { IRoute } from './router'
import { verifyRout } from './router/utils'
import useWinWidth from './hooks/useWinWidth'
import Web3Service from "./utils/Web3Service"
import { connect } from 'react-redux'
// import myStore from './store/index'

const mapDispatchToProps = (dispatch: any) => ({
  updataWallet: (data) => {
    dispatch({
      type: 'SET_WALLET',
      data
    })
  },
  loginOut: () => {
    dispatch({
      type: 'LOGOUT',
    })
  },
  setLoginInfo: (data) => {
    dispatch({
      type: 'LOGININFO',
      data
    })
  }
})



const App: FC<any> = (props: any) => {
  const winWidth = useWinWidth();
  const { i18n } = useTranslation()
  const { loginInfo } = props?.state?.loginInfo
  const [newRoute, setNewRoute] = useState<any[]>([])

  const initralFn = () => {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = `${htmlWidth / 13.66}px`
  };



  const walletChange = () => {
    console.log(loginInfo);
    if (loginInfo.address) {
      props.loginOut()
      props.setLoginInfo()
    }
  }

  useEffect(() => {
    if (loginInfo?.resourceList?.length) {
      const list = verifyRout(loginInfo?.resourceList)
      setNewRoute(list)
    }
  }, [loginInfo])



  useEffect(() => initralFn(), [winWidth])


  useEffect(() => {
    const WEB3 = new Web3Service()
    if (WEB3.eth) {
      props.updataWallet(WEB3)
      WEB3.eth.on('accountsChanged', account => {
        walletChange()
      })

      WEB3.eth.on('chainChanged', account => {
        walletChange()
      })
    } else {
      props.updataWallet(undefined)
    }
  }, [])




  return (
    <ConfigProvider locale={i18n.language === 'zh' ? zh : en}>
      <Suspense fallback={<Spin size="large" className="global-loading" />}>
        <Router>
          <Switch>
            {layoutRoutes.map((route: IRoute | any, key: number) => {
              const list = route?.children || []
              return (
                <Route
                  key={route.path + key}
                  path={route.path}
                  render={props => <route.component {...props} routes={[...list, ...newRoute]} />}
                />
              )
            })}
          </Switch>
        </Router>
      </Suspense>
    </ConfigProvider>
  )
}

export default connect((state: any) => ({ state }), mapDispatchToProps)(App)
