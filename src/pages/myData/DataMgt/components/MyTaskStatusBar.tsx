
import { FC, useEffect, useState } from 'react'
import MyTag from '../../../../components/MyTag'

const MyTaskStatusBar: FC<any> = (props: any) => {
  const { status, padding = 10 } = props
  const [color, colorSet] = useState<string>('')
  const [bgColor, bgColorSet] = useState<string>('')
  const [content, contentSet] = useState<string>('')
  useEffect(() => {

    switch (status) {
      case 'pending':
        colorSet('#B7EB8F')
        bgColorSet('#EBFDDA')
        contentSet('pending')
        break;
      default:
        break;
    }

  }, [status])

  return <MyTag content={content} radius='2' color={color} bgColor={bgColor} padding={padding}></MyTag>

}

export default MyTaskStatusBar