import { Redirect, RouteComponentProps } from 'react-router-dom';
import { IRoute } from "../router/index";
import { getToken } from '../utils/cookie';


interface AuthProps extends RouteComponentProps {
    route: IRoute;
    children: React.ReactNode;
}

function checkAuth(location: RouteComponentProps['location']): boolean {
    return true
}



function Auth(props: AuthProps) {
    if (getToken()) {
        return <Redirect to="/login"></Redirect>
    }

    if (!checkAuth(props.location)) {
        return <Redirect to="/login"></Redirect>
    }

    if (props.route.redirect) {
        return <Redirect to="/login"></Redirect>
    }
    return <>{props.children}</>
}


export default Auth;