import React, { FC } from 'react'
import { Table, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import './scss/OverviewTable.scss'
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
    },
    {
      key: '2',
      name: '胡彦祖',
      age: '西湖区湖底公园1号',
      address: '西湖区湖底公园1号',
    },
  ]

  const columns = [
    {
      title: () => {
        return (
          <div className="task-col">
            <p>Tasks</p>
            <p>in Computing</p>
          </div>
        )
      },
      dataIndex: 'name',
      key: 'name',
      // textWrap: 'word-break',
      ellipsis: true,
      render: (text: any, row: any, index: any) => {
        console.log(text)
        console.log(row)
        console.log(index)
        return (
          <div className="task-cell">
            <div>XXXXX task</div>
          </div>
        )
      },
    },
    // cpu
    {
      title: () => {
        return (
          <div className="cpu-col">
            <div className="left">
              {/* <img src={memoryImg} alt="" /> */}
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
              <p className="name">CPU</p>
              <p className="precent">75%</p>
            </div>
          </div>
        )
      },
      dataIndex: 'age',
      key: 'age',
      render: (text: any, row: any, index: any) => {
        console.log(text)
        console.log(row)
        console.log(index)
        return (
          <div className="table-cell cpu-status">
            {/* <div>
            <p className="cpu-status"></p>
          </div> */}
            <p className="table-title"> CPU</p>
            <p className="table-content">{text}</p>
          </div>
        )
      },
    },
    // memo
    {
      title: () => {
        return (
          <div className="cpu-col">
            <div className="left">
              <img src={memoryImg} alt="" />
            </div>
            <div className="right">
              <p className="name">{t('overview.memory')}</p>
              <p className="precent">50%</p>
            </div>
          </div>
        )
      },
      dataIndex: 'address',
      key: 'address',
      render: (text: any, row: any, index: any) => {
        console.log(text)
        console.log(row)
        console.log(index)
        return (
          <div className="table-cell memory-status">
            <p className="table-title"> {t('overview.memory')}</p>
            <p className="table-content">{text}</p>
          </div>
        )
      },
    },
    // band
    {
      title: () => {
        return (
          <div className="cpu-col">
            <div className="left">
              <img src={BandwidthImg} alt="" />
            </div>
            <div className="right">
              <p className="name">{t('overview.bandWidth')}</p>
              <p className="precent">80%</p>
            </div>
          </div>
        )
      },
      dataIndex: 'address',
      key: 'address',
      render: (text: any, row: any, index: any) => {
        console.log(text)
        console.log(row)
        console.log(index)
        return (
          <div className="table-cell bandwidth-status">
            <p className="table-title">{t('overview.bandWidth')}</p>
            <p className="table-content">{text}</p>
          </div>
        )
      },
    },
  ]

  return (
    <div className="my-table-box">
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default OverviewTable
