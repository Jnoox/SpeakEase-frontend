import { useState, useEffect } from "react"
import { authRequest } from "../../lib/auth"
import axios from 'axios'

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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
       <h1>Dashboard</h1>
      {analytics ? (
        <div>
          <h2>Your Progress Analytics</h2>
          
          <div>
            <h3>Total Sessions</h3>
            <p>{analytics.total_sessions}</p>
          </div>

          <div>
            <h3>Total Training Time</h3>
            <p>{analytics.total_training_time}</p>
          </div>

          {/*source helper: https://stackoverflow.com/questions/62576661/how-do-i-round-a-react-component-property-value-to-2-decimal-places */}
          <div>
            <h3>Average Score</h3>
            <p>{analytics.average_score.toFixed(1)}%</p>
          </div>

          <div>
            <h3>Best Score</h3>
            <p>{analytics.best_score.toFixed(1)}%</p>
          </div>

          <div>
            <h3>Worst Score</h3>
            <p>{analytics.worst_score.toFixed(1)}%</p>
          </div>

          <p>Last Updated: {new Date(analytics.last_updated).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
      
    <button onClick={getProgressAnalytics}>Refresh Data</button> 
    </div>
  )
}