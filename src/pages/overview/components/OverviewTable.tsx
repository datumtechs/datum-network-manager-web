import React, { FC, useState, useEffect, useMemo } from 'react'
import { Progress, Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import '../scss/OverviewTable.scss'
import memoryImg from '../../../assets/images/overview/2.icon_Memory.svg'
import BandwidthImg from '../../../assets/images/overview/2.icon_Bandwidth.svg'
import { fileSizeChange } from '../../../utils/utils'

const OverviewTable: FC<any> = (props: any) => {
  const { t, i18n } = useTranslation()
  const { globalObj, tableData } = props

  const cpu = useMemo(() => {
    return isNaN(globalObj.usedProcessor / globalObj.totalProcessor)
      ? '0'
      : ((globalObj.usedProcessor / globalObj.totalProcessor) * 100).toFixed(2)
  }, [globalObj.usedProcessor, globalObj.totalProcessor])

  const memory = useMemo(() => {
    return isNaN(globalObj.usedMem / globalObj.totalMem) ? '0' : (globalObj.usedMem / globalObj.totalMem).toFixed(2)
  }, [globalObj.totalMem, globalObj.usedMem])

  const bandWidth = useMemo(() => {
    return isNaN(globalObj.usedBandwidth / globalObj.totalBandwidth)
      ? '0'
      : (globalObj.usedBandwidth / globalObj.totalBandwidth).toFixed(2)
  }, [globalObj.totalBandwidth, globalObj.usedBandwidth])

  return (
    <div className="my-table-box">
      {/* <Table pagination={false} dataSource={dataSource} columns={columns} />; */}
      <div className="my-table-head">
        {i18n.language === 'en' ? (
          <div className="head-box-name">
            <p>{t('overview.commuting')}</p>
            <p>{t('overview.resources')}</p>
          </div>
        ) : (
          <div className="head-box-name">
            <p>计算资源</p>
          </div>
        )}

        <div className="head-box">
          <div className="left">
            <Progress
              type="circle"
              percent={Number(cpu)}
              showInfo={false}
              width={50}
              strokeWidth={10}
              trailColor="#6359D1"
              strokeColor="#FFA505"
            />
          </div>
          <div className="right">
            <p className="top">CPU</p>
            <p className="bottom">{cpu}%</p>
          </div>
        </div>
        <div className="head-box">
          <div className="left">
            <img src={memoryImg} alt="" />
          </div>
          <div className="right">
            <p className="top"> {t('overview.memory')}</p>
            <p className="bottom">{memory}%</p>
          </div>
        </div>
        <div className="head-box">
          <div className="left">
            <img src={BandwidthImg} alt="" />
          </div>
          <div className="right">
            <p className="top"> {t('overview.bandwidth')}</p>
            <p className="bottom">{bandWidth}%</p>
          </div>
        </div>
      </div>
      <div className="my-table-body">
        {tableData?.length > 0 ? (
          tableData.map(item => {
            return (
              <div className="my-table" key={item.jobNodeName}>
                <div className="line-first">
                  <div className="name">
                    {t('overview.computeNode')} ：{item.jobNodeName}
                  </div>
                  {item.runTime ? <div className="time">Continuous run time：{item.runTime}</div> : <></>}
                </div>
                <div className="line-second">
                  <div className="table-cell work-status">
                    {item.status.toUpperCase() === '0' ? (
                      <span className="free"> {t('overview.free')} </span>
                    ) : (
                      <span className="occupied">{t('overview.occupied')} </span>
                    )}
                  </div>
                  <div className="table-cell cpu-status">
                    <p className="table-title "> CPU</p>
                    <p className="table-content">
                      {isNaN(item.usedProcessor / item.totalProcessor)
                        ? '0'
                        : ((item.usedProcessor / item.totalProcessor) * 100).toFixed(2)}
                      %
                    </p>
                  </div>
                  <div className="table-cell memory-status">
                    <p className="table-title "> {t('overview.memory')}</p>
                    <p className="table-content">
                      {isNaN(item.usedMem / item.totalMem) ? '0B' : fileSizeChange(Number(item.usedMem))}
                    </p>
                  </div>
                  <div className="table-cell bandwidth-status">
                    <p className="table-title ">{t('overview.bandwidth')}</p>
                    <p className="table-content">
                      {isNaN(item.usedBandwidth / item.totalBandwidth)
                        ? '0B'
                        : fileSizeChange(Number(item.usedBandwidth))}
                      P/S
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <Empty className="empty-box" />
        )}
      </div>
    </div>
  )
}

export default OverviewTable
