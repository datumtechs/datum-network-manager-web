import React from 'react'

function UsFilterTime(props: any) {
  const { isStamp, time } = props
  let newTime = time
  const newisStamp = !!isStamp
  if (newisStamp) newTime = String(time) + '000'
  const dateList = new Date(newisStamp ? +newTime : newTime).toLocaleString().split(' ')
  return <> {dateList[0]}< br />{dateList[1]}</>
}

export default UsFilterTime