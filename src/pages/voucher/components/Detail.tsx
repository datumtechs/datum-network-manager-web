import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card } from 'antd'
import "../scss/styles.scss"

const Details: FC<any> = (props: any) => {
  const { t } = useTranslation()

  return <div>
    <Card className='details-top-box'>
      <div className='details-name-box'>
        <div className='address'>
          <p>123</p>
          <p>123</p>
        </div>
        <Button>123</Button>
      </div>
      <div className='proce-box'>
        <div className='proce-left'>
          <p></p>
          <div></div>
        </div>
        <div className='proce-right'>
          <div>
            <Button></Button>
            <Button></Button>
          </div>
          <div></div>
        </div>
      </div>

    </Card>












  </div>
}

export default Details