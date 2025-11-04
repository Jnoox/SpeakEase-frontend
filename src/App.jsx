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
          path="/training"
          element={
            <ProtectedRoute>
              <VoiceTraining />
              <TipTraining/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile  user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<h1>Welcome to SpeakEase 🎤✨</h1>}
        />
      </Routes>
    </Router>
  )
}
