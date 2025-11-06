import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import { getUserFromToken } from "./lib/auth";
import NavBar from "./components/NavBar/NavBar"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/SignUp"
import VoiceTraining from "./components/VoiceTraining/VoiceTraining"
import TipTraining from "./components/TipTraining/TipTraining"
import Profile from "./components/Profile/Profile"
import Dashboard from "./components/Dashboard/Dashboard"
import Home from "./components/Home/Home";


export default function App() {
  // Read user from saved JWT
  const [user, setUser] = useState(getUserFromToken())

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <Home user={user} />
          } />
        <Route
          path="/training"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                <Dashboard />
              </div>
              <h1 style={{ fontSize: '48px', marginBottom: '10px', color: '#2c3e50', textAlign:'center' }}>Training Options</h1>
              <div style={{  marginLeft:'30px', display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom:'40px' }}>
                <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
                  
                  <VoiceTraining /> 
                </div>
                <div style={{flex: "1 1 400px", maxWidth: "600px" }}>
                   <TipTraining /> 
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  )
}
