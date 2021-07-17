import React, { FC, useEffect, useState } from 'react'
import SeedCard from './components/SeedCard'
import ComputeCard from './components/ComputeCard'
import DataCard from './components/DataCard'
import OverviewTable from './components/OverviewTable'
import { overviewApi } from '../../api/index'

export const Overview: FC<any> = () => {
  const showName = () => {}

  const [dataNodeObj, setDataNodeObj] = useState<Object>({
    dataNodeCount: 0,
    publishedDataCount: 0,
    unpublishedDataCount: 0,
  })

  const [powerDataObj, setPowerDataObj] = useState<Object>({
    powerNodeCount: 0,
    runningTaskCount: 0,
  })

  const [serviceStatus, setServiceStatus] = useState<String>()

  const [globalObj, setGlobalObj] = useState<Object>({
    totalBandwidth: 0,
    totalMem: 0,
    totalProcessor: 0,
    usedBandwidth: 0,
    usedMem: 0,
    usedProcessor: 0,
  })

  const [tableData, setTableData] = useState<Array<{}>>()

  const initGlobalData = () => {
    overviewApi.overviewData().then(res => {
      if (res.status === 0) {
        setDataNodeObj({
          dataNodeCount: res.data?.dataNodeCount,
          publishedDataCount: res.data?.publishedDataCount,
          unpublishedDataCount: res.data?.unpublishedDataCount,
        })
        setPowerDataObj({
          powerNodeCount: res.data?.powerNodeCount,
          runningTaskCount: res.data?.runningTaskCount,
        })
        setServiceStatus(res.data?.status)
        setGlobalObj({
          totalBandwidth: res.data?.totalBandwidth,
          totalMem: res.data?.totalMem,
          totalProcessor: res.data?.totalProcessor,
          usedBandwidth: res.data?.usedBandwidth,
          usedMem: res.data?.usedMem,
          usedProcessor: res.data?.usedProcessor,
        })
      }
    })
  }
  const initTableData = () => {
    overviewApi.queryNodelist().then(res => {
      if (res.status === 0) {
        setTableData(res.data)
      }
    })
  }

  useEffect(() => {
    initGlobalData()
    initTableData()
  }, [])
  return (
    <div onClick={showName} className="main-wrapper">
      <div className="left-side">
        <SeedCard serviceStatus={serviceStatus} schedueStatus="true" />
        <DataCard dataNodeObj={dataNodeObj} />
        <ComputeCard powerDataObj={powerDataObj} precent={75} />
      </div>
      <div className="right-side">
        <OverviewTable globalObj={globalObj} tableData={tableData} />
      </div>
    </div>
  )
}
