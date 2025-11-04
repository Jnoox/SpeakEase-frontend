import React, { useState, useEffect } from "react"
import { authRequest } from "../../lib/auth"
import axios from 'axios'

// source helper: https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/CatDetail/CatDetail.jsx
export default function TipTraining() {

  const [tip, setTip] = useState(null)
  const [errors, setErrors] = useState(null)

  async function getRandomTip() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tip/')
      console.log(response.data)
      setTip(response.data)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  useEffect(() => {
    getRandomTip()
  }, [])

  if (errors) {
    return <h3>{errors}</h3>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Tips & Motivation</h1>
      { tip ?(
      <div>
        <div>{tip.category}</div>
        <h2>{tip.title}</h2>
        <p>{tip.content}</p>
        <p>— {tip.author}</p>
      </div>
      ) :(
        <p>Loading tips...</p>
      )}
      <button onClick={getRandomTip}>Get Another Tip</button>
    </div>
  )
}