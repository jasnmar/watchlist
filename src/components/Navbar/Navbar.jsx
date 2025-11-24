import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "./Navbar.css"

export default function Navbar() {
  const { currentUser, loginWithGoogle, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          Watchlist
        </Link>

        <div className="navbar-actions">
          {currentUser ? (
            <>
              <span className="navbar-user">
                {currentUser.displayName || currentUser.email}
              </span>
              <button onClick={logout} className="btn btn-ghost">
                Logout
              </button>
            </>
          ) : (
            <button onClick={loginWithGoogle} className="btn btn-primary">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
