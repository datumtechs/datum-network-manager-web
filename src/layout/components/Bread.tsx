import { FC, memo, useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory, Link } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { IRoute } from '../../router/index'
import { getBreadcrumbs } from '../../router/utils'

const Bread: FC<any> = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<IRoute[]>([])
  const { t } = useTranslation()
  const history = useHistory()
  const len = breadcrumbs.length

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
        <LeftOutlined className="pointer" />
      </div>
      <Breadcrumb>
        {breadcrumbs.map((route: IRoute, index: number) => {
          if (index !== 0 && index !== len - 1)
            return (
              <Breadcrumb.Item key={route.path}>
                <Link to={route.path}>{t(route.breadcrumbName)}</Link>
              </Breadcrumb.Item>
            )
          return (
            <Breadcrumb.Item key={route.path}>
              <span>{t(route.breadcrumbName)}</span>
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </>
  )
}

export default memo(Bread)
