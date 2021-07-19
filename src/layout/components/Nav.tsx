import { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import useDid from '../../hooks/useHasDid'
import { IRoute } from '../../router/index'
import { businessRouteList } from '../../router/utils'
import { BaseInfoContext } from '../index'

console.log(businessRouteList)

const Nav = (props: any) => {
  const menu = props.state.menu.curMenu
  const history = useHistory()
  const { pathname } = useLocation()
  const [curPath, SetCurPath] = useState('')
  const baseInfo = useContext(BaseInfoContext)
  console.log(curPath)

  const hasDid = useDid()

  useEffect(() => {
    console.log('pathname=====>', pathname)
    SetCurPath(pathname === '/' ? '/overview' : pathname)
  }, [pathname])

  const linkTo = (item: IRoute, e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation()
    if (item.children) return
    if (!baseInfo?.identityId) {
      SetCurPath('/didApplication')
      history.push('/didApplication')
      return
    }
    SetCurPath(item.path)
    history.push(item.path)
  }
  const { t, i18n } = useTranslation()
  const mouseEnter = (item: IRoute, e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation()
    if (item.children) {
      props.setMenu(item.name)
    }
  }
  const mouseLeave = (e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation()
    props.setMenu('')
  }

  return (
    <div className="nav-box">
      {props.list.map((item: IRoute) =>
        item.meta.show ? (
          <div
            className="sub-nav-box pointer"
            key={item.name}
            onMouseEnter={e => mouseEnter(item, e)}
            onMouseLeave={e => mouseLeave(e)}
          >
            <div
              className={`sub-nav ${curPath.includes(item.path) ? 'activeMenu' : null}`}
              key={item.name}
              onClick={e => linkTo(item, e)}
            >
              {t(`${item.label}`)}
              {item.children && item.name === menu ? (
                <div className="child-box">
                  <ul className="child-nav" style={{ width: i18n.language === 'en' ? '137px' : '107px' }}>
                    {item.children.map(child =>
                      child.meta.show ? (
                        <li
                          className={`${curPath.includes(child.path) ? 'activeSubMenu' : ''}`}
                          key={child.name}
                          onClick={e => linkTo(child, e)}
                        >
                          {t(`${child.label}`)}
                        </li>
                      ) : (
                        ''
                      ),
                    )}
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          ''
        ),
      )}
    </div>
  )
}

export default connect(
  (state: any) => ({ state }),
  (dispatch: any) => ({
    setMenu: (menu: string) => {
      dispatch({
        type: 'SETMENU',
        data: menu,
      })
    },
  }),
)(Nav)
