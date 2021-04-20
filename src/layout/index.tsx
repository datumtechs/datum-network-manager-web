import SiderBar from './components/SiderBar'
import Header from './components/Header'
import App from '../pages/App'
// import { getPageTitle, systemRouteList } from '../router/utils';
export const Layout = () => (
  <div className="">
    <Header />
    <div className="">
      <SiderBar />
      <App />
    </div>
  </div>
)
