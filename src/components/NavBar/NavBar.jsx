import React from "react"
import { Link } from "react-router"
import LogOutButton from "../Auth/LogOutButton"

export default function NavBar({ user, setUser }) {
  return (
    <nav>
      <Link to="/">Home</Link>

      {user && <Link to="/training">Training</Link>}
      {user && <Link to="/profile">Profile</Link>}

      {user ? (
        <LogOutButton setUser={setUser} />
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </nav>
  )
}
