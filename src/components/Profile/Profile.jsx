import React, { useState, useEffect } from "react"
import { authRequest } from "../../lib/auth"
import axios from 'axios'

export default function Profile({user}) {

  const [profile, setProfile] = useState(null)
  const [userData, setUserData] = useState(null)
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
  })

  //Source helper: https://stackoverflow.com/questions/50046841/proper-way-to-make-api-fetch-post-with-async-await
  async function getProfileData() {
  try {
    // Get user info (id, username, email, first_name, last_name )
    const userResponse = await authRequest({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/users/current/'
    })
    setUserData(userResponse.data)
    console.log(userResponse.data)

    // Get profile info (full_name, age, total_training_time, created_at)
    const profileResponse = await authRequest({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/profile/'
    })
    setProfile(profileResponse.data)
    console.log(profileResponse.data)
    
    setFormData({
      full_name: profileResponse.data.full_name ,
      age: profileResponse.data.age
    })
  } catch (err) {
    console.error(err)
  }
}

useEffect(() => {
  getProfileData()
}, [])


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Profile</h1>

    </div>
  )
}