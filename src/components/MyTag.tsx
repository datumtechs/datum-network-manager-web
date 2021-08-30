import React from 'react'
import './scss/myTag.scss'

function MyTag(props: any) {
  const { content, bgColor, color, border } = props
  return (
    <div className="my-tag-box" style={{ backgroundColor: bgColor, border: `1px solid ${border || color}`, color }}>
      {content}
    </div>
  )
}

export default MyTag
