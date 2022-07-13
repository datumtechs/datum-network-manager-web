/* eslint-disable react/no-string-refs */
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { IRoute } from '@/router'
import { dropByCacheKey, getCachingKeys } from 'react-router-cache-route'
const Nav = (props: any) => {
  const { loginInfo } = props.state.loginInfo
  const { state: { isReg } } = props
  const menu = props.state.menu.curMenu
  const history = useHistory()
  const { pathname } = useLocation()
  const [curPath, SetCurPath] = useState('')
  const [showMenu, showMenuSet] = useState(false)

  useEffect(() => {
    SetCurPath(pathname === '/' ? '/overview' : pathname)
  }, [pathname])

  const clearCache = () => {
    const keepAliveList = getCachingKeys()
    keepAliveList.forEach(v => {
      dropByCacheKey(v)
    })
  }

  const linkTo = (item: IRoute, e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation()
    clearCache()
    if (item.children) {
      props.setMenu(item.name)
      return
    }
    if (!isReg) {
      SetCurPath('/didApplication')
      history.push('/didApplication')
      return
    }

    SetCurPath(item.path)
    history.push(item.path)
  }
  const { t, i18n } = useTranslation()

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

  const juris = (juris: string) => {
    const list = loginInfo?.resourceList || []
    return list.some(v => {
      return juris && juris.includes(v.value)
    });
  }

  return (
    <div className="nav-box">
      {/* 权限控制目前暂只控制页面显示，不控制具体路由 */}
      {props.list.map((item: IRoute | any) =>
        item.meta.show && juris(item.path) ? (
          <div className="nav-wrapper pointer" key={item.name}>
            {item.children ?
              <div className={`nav-label-box ${curPath.includes(item.path) ? 'activeMenu' : ''}`}>
                <div className="nav-label"
                  onClick={(evt) => showSubMenu(item, evt)}>
                  {t(`${item.label}`)}
                  <div className={`hasChild ${menu === item.name ? 'triangle-down' : 'triangle-up'}`}>
                  </div>
                </div>
                <ul className={`sub-nav-box ${menu === item.name ? 'active' : 'inActive'}`}>
                  {item.children.map(child =>
                    child.meta.show && juris(item.path) ?
                      <li
                        className={`sub-nav-label ${curPath.includes(child.path) ? 'activeSubMenu' : ''}`}
                        key={child.name}
                        onClick={e => linkTo(child, e)}
                      >
                        {t(`${child.label}`)}
                      </li>
                      :
                      ''
                    ,
                  )}
                </ul>
              </div>
              :
              <div className="nav-label-box">
                <div
                  className={`nav-label ${curPath.includes(item.path) ? 'activeMenu activeMenuBeforeTop' : ''} ${item.meta?.class && i18n.language == 'en' ? "word-brack" : " "}`}
                  onClick={e => linkTo(item, e)}
                >
                  {t(`${item.label}`)}
                </div>
              </div>
            }
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
