import React, { useState, useEffect } from "react"
import { authRequest, getUserFromToken } from "../../lib/auth"
import axios from 'axios'

export default function Profile({user}) {

  const [profile, setProfile] = useState('')
  const [userData, setUserData] = useState('')
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    owner: user
  })

  async function getUserData() {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/current/`)
        console.log(response.data)
        setUserData(response.data)
    }

    useEffect(() => {
        if (user) {
            getUserData()
        }
    }, [])

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Profile</h1>

    </div>
  )
}