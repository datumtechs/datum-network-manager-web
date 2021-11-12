/* eslint-disable react/no-array-index-key */
import { FC, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Spin, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import zh from 'antd/lib/locale/zh_CN'
import en from 'antd/lib/locale/en_GB'
import layoutRoutes, { IRoute } from './router'
import useWinWidth from './hooks/useWinWidth'

const App: FC<any> = () => {
  const initralFn = () => {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    const htmlDom = document.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = `${htmlWidth / 13.66}px`
  }
  const winWidth = useWinWidth()
  const { i18n } = useTranslation()
  useEffect(() => initralFn(), [winWidth])

  return (
    <ConfigProvider locale={i18n.language === 'zh' ? zh : en}>
      <Suspense fallback={<Spin size="large" className="global-loading" />}>
        <Router>
          <Switch>
            {layoutRoutes.map((route: IRoute, key: number) => (
              <Route
                key={route.path + key}
                path={route.path}
                render={props => <route.component {...props} routes={route.children} />}
              />
            ))}
          </Switch>
        </Router>
      </Suspense>
    </ConfigProvider>
  )
}

export default App
