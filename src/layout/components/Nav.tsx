import { useHistory } from 'react-router-dom';
import { IRoute } from '../../router/index'


const Nav = (props: any) => {
  const history = useHistory()
  const linkTo = (item: IRoute) => (
    history.push(item.path)
  )
  return (
    <div className="nav-box">{
      props.list.map((item: IRoute) =>
        <div className="sub-nav pointer" key={item.name} onClick={() => linkTo(item)}> {item.name}</div>
      )
    }</div >
  )
}
export default Nav