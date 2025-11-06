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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
     <div style={{ border: '2px solid #667eea', borderRadius: '15px',padding: '30px',
            marginTop: '20px',background: 'white'
          }}>
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Tips & Tricks</h1>
       <p style={{ margin: '0 0 20px 0', color: '#7f8c8d', fontSize: '14px' }}>
        Get helpful speaking tips and motivational quotes to improve your communication skills.
      </p>
      { tip ?(
      <div  >
        <div >{tip.category}</div>
        <h2 style={{ margin: '0 0 15px 0', color: '#2c3e50',fontSize: '22px'
            }}>{tip.title}</h2>
        <p style={{ margin: '0 0 15px 0', color: '#34495e',fontSize: '16px', lineHeight: '1.8'
            }}>{tip.content}</p>
        <p style={{ margin: '0',color: '#7f8c8d',fontSize: '14px',fontStyle: 'italic',textAlign: 'right'
            }}>— {tip.author}</p>
      </div>
      ) :(
        <p style={{ textAlign: 'center' }}>Loading tips...</p>
      )}
      <button style={{padding: '12px 30px',background: '#667eea',color: 'white',borderRadius: '8px',
            fontSize: '16px',
fontWeight: 'bold'
          }}onClick={getRandomTip}>Get Another Tip</button>
    </div>
    </div>
    </div>
  )
}