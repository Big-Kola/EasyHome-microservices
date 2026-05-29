import { Link } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">EasyHomes</Link>
      <div className="navbar-links">
        <Link to="/cart">Cart</Link>
        {token ? (
          <>
            <Link to="/orders">Orders</Link>
            <button className="btn btn-danger" onClick={handleLogout} style={{ padding: '6px 16px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
