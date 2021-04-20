


import SiderBar from './components/SiderBar'
import Header from './components/Header'
import App from '../pages/App'
// import { getPageTitle, systemRouteList } from '../router/utils';
export const Layout = () => {
    return (
        <>
            <div className="">
                <Header></Header>
                <div className="">
                    <SiderBar></SiderBar>
                    <App />
                </div>
            </div>
        </>)
}

