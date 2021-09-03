import React from 'react'
import './scss/myTag.scss'

function MyTag(props: any) {
  const { content, bgColor, color, border, radius, padding } = props
  return (
    <div className="my-tag-box" style={{ padding: `0 ${padding}px`, borderRadius: `${radius}px`, backgroundColor: bgColor, border: `1px solid ${border || color}`, color }}>
      {content}
    </div>
  )
}

export default MyTag
