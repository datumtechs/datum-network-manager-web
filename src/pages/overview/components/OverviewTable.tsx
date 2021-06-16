import React, { FC } from 'react'
import { Table, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import '../scss/OverviewTable.scss'
import memoryImg from '../../../assets/images/overview/2.icon_Memory.svg'
import BandwidthImg from '../../../assets/images/overview/2.icon_Bandwidth.svg'

const OverviewTable: FC<any> = (props: any) => {
  console.log(props)
  const { t } = useTranslation()
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: '西湖区湖底公园1号',
      address: '西湖区湖底公园1号',
      cpu: '75',
      memory: '123',
      status: 'free',
      runTime: '',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: '西湖区湖底公园1号',
      address: '西湖区湖底公园1号',
      cpu: '75',
      memory: '123',
      status: 'Occupied',
      runTime: '12: 23: 59',
    },
  ]

  // const columns = [
  //   {
  //     title: () => {
  //       return (
  //         <>
  //           <div className="task-col">
  //             <p>Commuting</p>
  //             <p>Resources</p>
  //           </div>
  //         </>
  //       )
  //     },
  //     dataIndex: 'name',
  //     key: 'name',
  //     // textWrap: 'word-break',
  //     ellipsis: true,
  //     render: (text: any, row: any, index: any) => {
  //       console.log(text)
  //       console.log(row)
  //       console.log(index)
  //       return (
  //         <div className="task-cell">
  //           <div className="top-block">Computation node：{text}</div>
  //           <div className="bottom-block">{text}</div>
  //         </div>
  //       )
  //     },
  //   },
  //   // cpu
  //   {
  //     title: () => {
  //       return (
  //         <div className="cpu-col">
  //           <div className="left">
  //             {/* <img src={memoryImg} alt="" /> */}
  //             <Progress
  //               type="circle"
  //               percent={75}
  //               showInfo={false}
  //               width={50}
  //               strokeWidth={10}
  //               trailColor="#6359D1"
  //               strokeColor="#FFA505"
  //             />
  //           </div>
  //           <div className="right">
  //             <p className="name">CPU</p>
  //             <p className="precent">75%</p>
  //           </div>
  //         </div>
  //       )
  //     },
  //     dataIndex: 'age',
  //     key: 'age',
  //     render: (text: any, row: any, index: any) => {
  //       console.log(text)
  //       console.log(row)
  //       console.log(index)
  //       return (
  //         <>
  //           <div></div>
  //           <div className="table-cell cpu-status">
  //             {/* <div>
  //           <p className="cpu-status"></p>
  //         </div> */}
  //             <p className="table-title"> CPU</p>
  //             <p className="table-content">{text}</p>
  //           </div>
  //         </>
  //       )
  //     },
  //   },
  //   // memo
  //   {
  //     title: () => {
  //       return (
  //         <div className="cpu-col">
  //           <div className="left">
  //             <img src={memoryImg} alt="" />
  //           </div>
  //           <div className="right">
  //             <p className="name">{t('overview.memory')}</p>
  //             <p className="precent">50%</p>
  //           </div>
  //         </div>
  //       )
  //     },
  //     dataIndex: 'address',
  //     key: 'address',
  //     render: (text: any, row: any, index: any) => {
  //       console.log(text)
  //       console.log(row)
  //       console.log(index)
  //       return (
  //         <div className="table-cell memory-status">
  //           <p className="table-title"> {t('overview.memory')}</p>
  //           <p className="table-content">{text}</p>
  //         </div>
  //       )
  //     },
  //   },
  //   // band
  //   {
  //     title: () => {
  //       return (
  //         <div className="cpu-col">
  //           <div className="left">
  //             <img src={BandwidthImg} alt="" />
  //           </div>
  //           <div className="right">
  //             <p className="name">{t('overview.bandWidth')}</p>
  //             <p className="precent">80%</p>
  //           </div>
  //         </div>
  //       )
  //     },
  //     dataIndex: 'address',
  //     key: 'address',
  //     render: (text: any, row: any, index: any) => {
  //       console.log(text)
  //       console.log(row)
  //       console.log(index)
  //       return (
  //         <div className="table-cell bandwidth-status">
  //           <p className="table-title">{t('overview.bandWidth')}</p>
  //           <p className="table-content">{text}</p>
  //         </div>
  //       )
  //     },
  //   },
  // ]

  return (
    <div className="my-table-box">
      {/* <Table pagination={false} dataSource={dataSource} columns={columns} />; */}
      <div className="my-table-head">
        <div className="head-box-name">
          <p>Commuting</p>
          <p>Resources</p>
        </div>
        <div className="head-box">
          <div className="left">
            <Progress
              type="circle"
              percent={75}
              showInfo={false}
              width={50}
              strokeWidth={10}
              trailColor="#6359D1"
              strokeColor="#FFA505"
            />
          </div>
          <div className="right">
            <p className="top">CPU</p>
            <p className="bottom">75%</p>
          </div>
        </div>
        <div className="head-box">
          <div className="left">
            <img src={memoryImg} alt="" />
          </div>
          <div className="right">
            <p className="top"> {t('overview.memory')}</p>
            <p className="bottom">50%</p>
          </div>
        </div>
        <div className="head-box">
          <div className="left">
            <img src={BandwidthImg} alt="" />
          </div>
          <div className="right">
            <p className="top"> {t('overview.bandWidth')}</p>
            <p className="bottom">80%</p>
          </div>
        </div>
      </div>
      <div className="my-table-body">
        {dataSource.map(item => {
          return (
            <div className="my-table" key={item.name}>
              <div className="line-first">
                <div className="name">Computation node：{item.name}</div>
                {item.runTime ? <div className="time">Continuous run time：{item.runTime}</div> : <></>}
              </div>
              <div className="line-second">
                <div className="table-cell work-status">
                  {item.status.toUpperCase() === 'FREE' ? (
                    <span className="free"> Free </span>
                  ) : (
                    <span className="occupied"> Occupied</span>
                  )}
                </div>
                <div className="table-cell cpu-status">
                  <p className="table-title "> CPU</p>
                  <p className="table-content">{item.cpu}%</p>
                </div>
                <div className="table-cell memory-status">
                  <p className="table-title "> {t('overview.memory')}</p>
                  <p className="table-content">{item.memory}MB</p>
                </div>
                <div className="table-cell bandwidth-status">
                  <p className="table-title ">{t('overview.bandWidth')}</p>
                  <p className="table-content">80%</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OverviewTable
