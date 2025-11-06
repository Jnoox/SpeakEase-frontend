import { useState, useEffect } from "react"
import { authRequest } from "../../lib/auth"

export default function Dashboard() {

    const [analytics, setAnalytics] = useState(null)
    const [errors, setErrors] = useState(null)


    async function getProgressAnalytics() {
    try {
      const response = await authRequest({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/progress/'
      })
      setAnalytics(response.data)
    }catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
}
    
   useEffect(() => {
    getProgressAnalytics()
  }, [])

  return (
    
    <div  style={{ maxWidth: '600px', width: '100%', padding: '20px'  }}>
       <h1 style={{ fontSize: '48px', marginBottom: '10px', color: '#2c3e50', textAlign:'center' }}>Dashboard</h1>
      {analytics ? (
        <div>
          <h2 style={{textAlign:'center' }}>Your Progress Analytics</h2>
          
          <div style={{ border: '2px solid #667eea', borderRadius: '15px',padding: '30px',
            marginTop: '20px',background: 'white',boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            {/* source helper: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template */}
            {/* https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',gap: '20px',marginBottom: '20px'}}>
              <div style={{ padding: '20px', borderRadius: '8px',textAlign: 'center',background: '#f8f9fa'}}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#667eea' }}>Average Score</h3>
                <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{analytics.average_score.toFixed(1)}%</p>
              </div>

              <div style={{ padding: '20px', borderRadius: '8px',textAlign: 'center',background: '#f8f9fa'}}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#28a745' }}>Best Score</h3>
                <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{analytics.best_score.toFixed(1)}%</p>
              </div>

              <div style={{ padding: '20px', borderRadius: '8px',textAlign: 'center',background: '#f8f9fa' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#dc3545' }}>Worst Score</h3>
                <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{analytics.worst_score.toFixed(1)}%</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',gap: '20px'}}>
              <div style={{ padding: '20px', borderRadius: '8px',textAlign: 'center',background: '#f8f9fa'
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#667eea' }}>Total Sessions</h3>
                <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{analytics.total_sessions}</p>
              </div>

              <div style={{ padding: '20px', borderRadius: '8px',textAlign: 'center',background: '#f8f9fa'}}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#667eea' }}>Total Training Time</h3>
                <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{analytics.total_training_time} seconds</p>
              </div>
            </div>
          </div>

          <p style={{ marginTop: '15px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
            Last Updated: {new Date(analytics.last_updated).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
      
      <button 
        style={{ display: 'block', margin: '20px auto', padding: '12px 30px',background: '#667eea',color: 'white',borderRadius: '8px',fontSize: '16px',fontWeight: 'bold'}} onClick={getProgressAnalytics}>
        Refresh Data
      </button> 
    </div>
  )
}