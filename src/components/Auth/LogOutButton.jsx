import React from "react"
import { clearTokens } from "../../lib/auth"
import { useNavigate } from "react-router"

export default function LogOutButton({ setUser }) {
  const navigate = useNavigate()

  function handleLogOut() {
    clearTokens()
    setUser(null)
    navigate("/login")
  }

  return <button onClick={handleLogOut}>Log Out</button>
}
