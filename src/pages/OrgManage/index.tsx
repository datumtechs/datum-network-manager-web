import { FC, useState, useEffect } from "react";
import { connect } from 'react-redux'
import './scss/style.scss'
import * as Affairs from "./components/CommitteeAffairs";
import * as Statistics from "./components/CommitteeStatistics";
import CommitteeList from "./components/CommitteeList";
import Application from './components/Application'





const OrgManage: FC<any> = (props) => {
  const query = () => { }

  useEffect(() => {
    query()
  }, [])

  return <div className="layout-box">
    <Statistics.default />
    <CommitteeList />
    <Affairs.default />
    <Application />
  </div>
}


export default connect(state => state)(OrgManage)