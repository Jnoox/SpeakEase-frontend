import axios from "axios"

const BASE = "http://127.0.0.1:8000/api"

export const authAPI = {
  login: (data) => axios.post(`${BASE}/login/`, data),
  signup: (data) => axios.post(`${BASE}/users/signup/`, data),
  currentUser: (token) =>
    axios.get(`${BASE}/users/current/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
}
