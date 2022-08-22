import { FC, useState, useEffect } from "react";
import { connect } from 'react-redux'
import './scss/style.scss'
import * as Affairs from "./components/CommitteeAffairs";
import * as Statistics from "./components/CommitteeStatistics";
import CommitteeList from "./components/CommitteeList";
import Application from './components/Application'




const OrgManage: FC<any> = (props) => {


  // const { isAdmin } = props?.loginInfo?.loginInfo
  const { isAuthority } = props?.org?.orgInfo
  // debugger
  // const isAdmin = 0


  return <div className="layout-box">
    <Statistics.default isAdmin={isAuthority} />
    {!!isAuthority ?
      <>
        <CommitteeList />
        <Affairs.default />
      </> :
      <Application />
    }
  </div>
}


export default connect(state => state)(OrgManage)