import React, { FC, memo, useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { IRoute } from '../../router/index'
import { getBreadcrumbs } from '../../router/utils'

const Bread: FC<any> = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<IRoute[]>([])
  const { t } = useTranslation()
  const history = useHistory()
  const curUrl = history.location.pathname
  console.log(curUrl)

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbs())
    const unListen = history.listen(() => {
      setBreadcrumbs(getBreadcrumbs())
    })

    return () => {
      unListen()
    }
  }, [])
  const goBack = () => {
    history.goBack()
  }
  return (
    <>
      <div className="pointer" onClick={goBack}>
        <LeftOutlined />
      </div>
      <Breadcrumb>
        {breadcrumbs.map((route: IRoute) => (
          <Breadcrumb.Item key={route.path}>{t(route.breadcrumbName)}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  )
}

export default memo(Bread)
