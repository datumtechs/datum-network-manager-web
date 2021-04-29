/* eslint-disable react/jsx-key */
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Header from './components/Header'
import { IRoute } from '../router/index'
import './css/layout.scss'
// import { getPageTitle, systemRouteList } from '../router/utils';
export const Layout = (props: any) => {
  console.log(props);
  // 
  // const isLogin = () => {

  // }
  return (
    <div className="container">
      <Header />
      <div className="main-box">
        <Router>
          <Switch>
            {props.routes.map((route: IRoute) => {
              console.log(route);
              return (
                <Route path={route.path} key={route.path} exact={route.meta.exact} component={route.component} />
              )
            }
            )}

            <Redirect from="/*" to="/" />
            <Redirect from='/' exact to="/overview" push />
          </Switch>
        </Router>
      </div>
    </div>
  )
}

