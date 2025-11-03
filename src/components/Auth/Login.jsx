import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../lib/auth"
import { useNavigate } from "react-router"

export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password
      })
      saveTokens(res.data.access, res.data.refresh)
      setUser(getUserFromToken())
      navigate("/training")
    } catch (err) {
      console.error(err)
      alert("Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  )
}
