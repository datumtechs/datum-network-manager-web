import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { IRoute } from '../../router'

const Nav = (props: any) => {
  const { state: { isReg } } = props
  const menu = props.state.menu.curMenu
  const history = useHistory()
  const { pathname } = useLocation()
  const [curPath, SetCurPath] = useState('')
  const [showMenu, showMenuSet] = useState(false)

  useEffect(() => {
    SetCurPath(pathname === '/' ? '/overview' : pathname)
  }, [pathname])

  const linkTo = (item: IRoute, e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation()
    if (item.children) {
      props.setMenu(item.name)
      return
    }
    if (!isReg) {
      SetCurPath('/didApplication')
      history.push('/didApplication')
      return
    }
    // if (!baseInfo?.identityId) {
    //   SetCurPath('/didApplication')
    //   history.push('/didApplication')
    //   return
    // }
    SetCurPath(item.path)
    history.push(item.path)
  }
  const { t } = useTranslation()

  const judgeAnimation = (evt) => {
    if (evt.target.lastChild) {
      const dom = evt.target.lastChild
      const names = evt.target.lastChild.className
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      names && names.indexOf('triangle-up') !== -1 ? dom.style = "animation: down 0.2s linear" : dom.style = "animation: up 0.2s linear"
    }
  }

  const showSubMenu = (item, evt) => {
    showMenuSet(!showMenu)
    judgeAnimation(evt)
    if (item.name !== menu) return props.setMenu(item.name)
    return props.setMenu('')
  }

  return (
    <div className="nav-box">
      {props.list.map((item: IRoute) =>
        item.meta.show ? (
          <div className="nav-wrapper pointer" key={item.name}>
            {item.children ? (
              <div className={`nav-label-box ${curPath.includes(item.path) ? 'activeMenu' : ''}`}>
                <div
                  className="nav-label"
                  onClick={(evt) => showSubMenu(item, evt)}
                >
                  {t(`${item.label}`)}
                  <div className={`hasChild ${menu === item.name ? 'triangle-down' : 'triangle-up'}`}>
                  </div>
                </div>
                <ul className={`sub-nav-box ${menu === item.name ? 'active' : 'inActive'}`}>
                  {item.children.map(child =>
                    child.meta.show ? (
                      <li
                        className={`sub-nav-label ${curPath.includes(child.path) ? 'activeSubMenu' : ''}`}
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
              <div className="nav-label-box">
                <div
                  className={`nav-label ${curPath.includes(item.path) ? 'activeMenu activeMenuBeforeTop' : ''}`}
                  onClick={e => linkTo(item, e)}
                >
                  {t(`${item.label}`)}
                </div>
              </div>
            )}
          </div>
        ) : (
          ''
        ),
      )}
    </div >
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
    }
  }),
)(Nav)
