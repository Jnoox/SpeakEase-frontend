import React from "react"
import { Link, useLocation  } from "react-router"
import LogOutButton from "../Auth/LogOutButton"

export default function NavBar({ user, setUser }) {


  return (
    <>
    <style>
        {`
          .navbar {
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }

          .nav-link {
            display: block;
            padding: 12px 25px;
            text-decoration: none;
            color: #2c3e50;
            margin-bottom: 8px;
            border-radius: 8px;
            transition: all 0.3s;
            background: transparent;
          }

          .nav-link:hover {
            color: #667eea;
            background: #f0f0f0;
          }

          .nav-link.active {
            background: #f0f0f0;
          }
        `}
      </style>

    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>

      {user && <Link className="nav-link" to="/training">Training</Link>}
      {user && <Link className="nav-link" to="/profile">Profile</Link>}

      {user ? (
        <LogOutButton style={{ marginTop: '10px' }} setUser={setUser} />
      ) : (
        <>
          <Link  className="nav-link" to="/signup">Sign Up</Link>
          <Link className="nav-link" to="/login">Log In</Link>
        </>
      )}
    </nav>
    </>
  )
}
