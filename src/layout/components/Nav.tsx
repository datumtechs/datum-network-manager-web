import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { IRoute } from '../../router/index'

const Nav = (props: any) => {
  const menu = props.state.menu.curMenu;
  const history = useHistory()
  const curUrl = history.location.pathname;

  const [curPath, SetCurPath] = useState('')
  useEffect(() => {
    console.log("更新了curUrl=====>", curUrl);
    SetCurPath(curUrl === '/' ? '/overview' : curUrl)
  }, [])
  console.log("curPath", curPath);

  const linkTo = (item: IRoute, e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation()
    if (item.children) return
    history.push(item.path)
    SetCurPath(item.path)
  }
  const { t } = useTranslation()
  const mouseEnter = (item: IRoute) => {
    if (item.children) {
      console.log(item.children)
      props.setMenu(item.name)
    }
  }
  const mouseLeave = () => {
    props.setMenu('')
  }

  return (
    <div className="nav-box">
      {props.list.map((item: IRoute) => (
        <div
          className={`sub-nav pointer ${curPath.includes(item.path) ? 'activeMenu' : null}`}
          onMouseEnter={() => mouseEnter(item)}
          onMouseLeave={() => mouseLeave()}
          key={item.name}
          onClick={e => linkTo(item, e)}
        >
          {t(`${item.label}`)}
          {item.children && item.name === menu ? (
            <ul className="child-nav">
              {item.children.map(child => (
                <li key={child.name} onClick={e => linkTo(child, e)}>
                  {t(`${child.label}`)}
                </li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  )
}

export default connect((state: any) => ({ state }), (dispatch: any) => ({
  setMenu: (menu: string) => {
    dispatch({
      type: 'SETMENU',
      data: menu
    })
  },
}))(Nav)
