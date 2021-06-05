import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IRoute } from '../../router/index'

const Nav = (props: any) => {
  const history = useHistory()
  const linkTo = (item: IRoute, e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation()
    if (item.children) return
    console.log(item.path)
    history.push(item.path)
  }
  const { t } = useTranslation()
  const mouseEnter = (item: IRoute) => {
    if (item.children) {
      console.log(item.children)
    }
  }

  return (
    <div className="nav-box">
      {props.list.map((item: IRoute) => (
        <div
          className="sub-nav pointer"
          onMouseEnter={() => mouseEnter(item)}
          key={item.name}
          onClick={e => linkTo(item, e)}
        >
          {t(`${item.name}`)}
          {/* {item.children ? (
            <ul className="child-nav">
              {item.children.map(child => (
                <li key={child.name} onClick={e => linkTo(child, e)}>
                  {t(`${child.name}`)}
                </li>
              ))}
            </ul>
          ) : (
            ''
          )} */}
        </div>
      ))}
    </div>
  )
}
export default Nav
