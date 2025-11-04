import { useState, useEffect, useRef } from "react"
import { authRequest } from "../../lib/auth"
import axios from 'axios'

export default function VoiceTraining() {

  const [word, setWord] = useState(null)
  const [audioRecord, setAudioRecord] = useState(null)
  const [result, setResult] = useState(null)
  const [timer , setTimer ] = useState(null)
  const [recordingStatus , setRecordingStatus ] = useState(null)

//source helper: https://www.cybrosys.com/blog/how-to-implement-audio-recording-in-a-react-application
 async function getRandomWord() {
    try {
        const response = await authRequest({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/vocabulary/'
      })
        console.log(response.data)
        setWord(response.data.word)
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    getRandomWord()
  }, [])


  
  const mediaStream = useRef(null);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { audio: true }
      );
      mediaStream.current = stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Describe a Word</h1>
      <div>
      <button onClick={startRecording}>Start Recording</button>
    </div>
    </div>
  )
}