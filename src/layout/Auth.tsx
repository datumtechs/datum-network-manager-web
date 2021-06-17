import React, { memo } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { IRoute } from '../router/index'

interface AuthProps extends RouteComponentProps {
  route: IRoute
  children: React.ReactNode
  routes: Array<any>
}

function checkAuth(location: RouteComponentProps['location']): boolean {
  return !!location
}

function Auth(props: AuthProps) {
  // if (getToken()) {
  //   return <Redirect to="/login" />
  // }

  if (!checkAuth(props.location)) {
    return <Redirect to="/login" />
  }

  if (props.route.redirect) {
    return <Redirect to="/login" />
  }

  return <>{props.children}</>
}

export default memo(Auth)
