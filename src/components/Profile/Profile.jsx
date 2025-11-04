import React, { useState, useEffect } from "react"
import { authRequest } from "../../lib/auth"
import axios from 'axios'

export default function Profile({user}) {

  const [profileData, setProfileData] = useState(null)
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
    setProfileData(profileResponse.data)
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

// source helper: https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/CatForm/CatForm.jsx


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Profile</h1>
      <h2>Account Information</h2>
      { userData && profileData ?(
      <div>
        <div>Username: {userData.username}</div>
        <div>Email: {userData.email}</div>
        {/* <div>First Name: {userData.first_name}</div>
        <div>Last Name: {userData.last_name}</div> */}
        <div>Full Name: {profileData.full_name}</div>
        <div>Age: {profileData.age}</div>
        <div>Total Training Time: {profileData.total_training_time}</div>
      </div>
      ) :(
        <p>Loading Account Information...</p>
      )}


    </div>
  )
}