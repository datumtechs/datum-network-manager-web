import { FC, useState, useEffect } from "react";
import { connect } from 'react-redux'
import './scss/style.scss'
import * as Affairs from "./components/CommitteeAffairs";
import * as Statistics from "./components/CommitteeStatistics";
import CommitteeList from "./components/CommitteeList";
import Application from './components/Application'




const OrgManage: FC<any> = (props) => {
  const { isAuthority } = props?.org?.orgInfo
  const [data, setData] = useState({})
  console.log(props);

  return <div className="layout-box">
    <Statistics.default isAdmin={isAuthority} parentData={data} setData={setData} />
    {!!isAuthority ?
      <>
        <CommitteeList identityId={props?.org?.orgInfo} />
        <Affairs.default />
      </> :
      <Application parentData={data} />
    }
  </div>
}


export default connect(state => state)(OrgManage)