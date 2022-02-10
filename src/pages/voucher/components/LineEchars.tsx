import { FC, useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
// import { useTranslation } from 'react-i18next'
// import { Button, Card, Tabs, Radio, Divider } from 'antd'
import "../scss/styles.scss"
// const { TabPane } = Tabs;
let date: any[] = ["1-1", '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11']
let data = [Math.random() * 50];
for (let i = 1; i < 11; i++) {
  data.push(parseInt(`${Math.random() * 100}`));
}


const Echsrs: FC<any> = (props: any) => {
  const charDom = useRef<any>(null)
  const option = {
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 20,
    },
    toolbox: {
      show: true
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    xAxis: {
      data: date
    },
    series:
    {
      type: 'line',
      smooth: .4,//true,//是否平滑曲线显示 biilean number
      itemStyle: {
        color: 'rgba(60,53,136,1)',
      },
      lineStyle: {
        shadowColor: "rgba(60,53,136,.1)",
        shadowOffsetY: 10,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: .6,
            color: 'rgba(1,5,138,.2)'
          },
          {
            offset: 0.3,
            color: 'rgba(60,53,136,.6)'
          }
        ]),
      },
      data: data
    }
  }
  // debugger
  useEffect(() => {
    // debugger
    const chart = echarts.init(charDom.current)
    // debugger
    chart.setOption(option)
  }, [])
  return <div style={{ height: '165px', width: "100%" }} ref={charDom}></div>
}

export default Echsrs