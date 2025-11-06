import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth";
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
    <div style={{
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '20px',
  maxWidth: '1200px'
}}>
    <form style={{background: 'white',padding: '40px',borderRadius: '15px',boxShadow: '0 5px 20px rgba(0,0,0,0.1)',width: '100%',maxWidth: '400px'}} onSubmit={handleSubmit}>
      <h2 style={{textAlign: 'center',color: '#2c3e50',marginBottom: '30px',fontSize: '28px'}}>Login</h2>
          <label style={{display: 'block',marginBottom: '8px',color: '#2c3e50',fontWeight: '500'}}>Username</label>
      <input style={{width: '100%',padding: '12px',border: '2px solid #e0e0e0',borderRadius: '8px',
              fontSize: '16px'}}value={username} onChange={e => setUsername(e.target.value)} />
          <label style={{display: 'block',marginBottom: '8px',color: '#2c3e50',fontWeight: '500'}}>Password</label>
      <input style={{width: '100%',padding: '12px',border: '2px solid #e0e0e0',borderRadius: '8px',fontSize: '16px'}} type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button style={{width: '100%',padding: '14px',background: '#667eea',color: 'white',border: 'none',
            borderRadius: '8px',fontSize: '16px',fontWeight: 'bold',}}>Login</button>
    </form>
    </div>
  )
}
