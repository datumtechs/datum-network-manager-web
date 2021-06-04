/* eslint-disable react/no-array-index-key */
import { FC, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Spin } from 'antd'
import layoutRoutes, { IRoute } from './router/index'
import useWinWidth from './hooks/useWinWidth'

const App: FC<any> = () => {
  const initralFn = () => {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    const htmlDom = document.getElementsByTagName('html')[0]
    console.log(htmlWidth)
    htmlDom.style.fontSize = `${htmlWidth / 13.66}px`
  }
  const winWidth = useWinWidth()
  useEffect(() => initralFn(), [winWidth])
  return (
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
  )
}

export default App
