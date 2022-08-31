import { FC, useState, useEffect, useRef } from "react";
import { connect } from 'react-redux'
import './scss/style.scss'
import * as Affairs from "./components/CommitteeAffairs";
import * as Statistics from "./components/CommitteeStatistics";
import CommitteeList from "./components/CommitteeList";
import Application from './components/Application'

const OrgManage: FC<any> = (props) => {
  const { isAuthority } = props?.org?.orgInfo
  const [data, setData] = useState({})
  const committeeRef = useRef<any>(null)
  const StatisticsRef = useRef<any>(null)
  const query = () => {
    committeeRef?.current?.query()
    StatisticsRef?.current?.query()
  }

  return <div className="layout-box">
    <Statistics.default isAdmin={isAuthority}
      ref={StatisticsRef}
      query={query}
      parentData={data}
      setData={setData} />
    {!!isAuthority ?
      <>
        <CommitteeList ref={committeeRef} identityId={props?.org?.orgInfo} />
        <Affairs.default />
      </> :
      <Application query={query} parentData={data} />
    }
  </div>
}


export default connect(state => state)(OrgManage)