import { NavLink } from 'react-router'
import { useCart } from '../hooks/useCart'

function Header() {
  const { count } = useCart()

  return (
    <header className="header">
      <NavLink to="/" end className="logo-link">
        <h1 className="logo">CampusEats</h1>
      </NavLink>
      <nav className="nav">
        <NavLink to="/" end>Vendors</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/cart" className="link cart">
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header