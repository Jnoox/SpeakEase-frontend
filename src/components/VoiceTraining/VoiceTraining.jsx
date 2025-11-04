import { useState, useEffect, useRef } from "react"
import { authRequest } from "../../lib/auth"
import axios from 'axios'
import toWav from "audiobuffer-to-wav";

export default function VoiceTraining() {

  const [word, setWord] = useState(null)
  const [audioRecord, setAudioRecord] = useState(null)
  const [result, setResult] = useState(null)
  const [timer, setTimer] = useState(null)
  const [wavAudio, setWavAudio] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState(null)
  const [audioDuration, setAudioDuration] = useState(0);

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


  const [recordedUrl, setRecordedUrl] = useState('');
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const mediaStream = useRef(null);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { audio: true }
      );
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(
          chunks.current, { type: 'audio/webm' }
        );
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        // save the audio 
        setAudioRecord(recordedBlob)

        convertWebmToWav(recordedBlob).then((wavBlob) => {
          console.log(wavBlob);
          setWavAudio(wavBlob);
        });

        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  //source helper: https://gist.github.com/Bang9/637655131120b37bbf76c392d1ef99a8
  async function convertWebmToWav(webmBlob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      fileReader.onloadend = () => {
        const arrayBuffer = fileReader.result;

        audioContext.decodeAudioData(
          arrayBuffer,
          (audioBuffer) => {

            const duration = audioBuffer.duration;
            setAudioDuration(duration);

            // // source helper: https://stackoverflow.com/questions/65520105/how-to-get-audio-file-duration-in-react-typescript
            // // get audio duration
            // const audio = document.createElement("audio");
            // audio.src = url;
            // audio.addEventListener("loadedmetadata", () => {
            //   setAudioDuration(audio.duration);
            // });
            const wavData = toWav(audioBuffer);
            const wavBlob = new Blob([new DataView(wavData)], {
              type: "audio/wav",
            });

            resolve(wavBlob);
          },
          (error) => reject(error)
        );
      };

      fileReader.readAsArrayBuffer(webmBlob);
    });
  }

  async function sendAudio(e) {
    e.preventDefault()
    try {

      // source helper:https://stackoverflow.com/questions/12989442/uploading-multiple-files-using-formdata
      const formData = new FormData();
      formData.append('audio_file', wavAudio, 'recording.wav');
      formData.append('duration', Math.ceil(audioDuration).toString());
      formData.append('word', word);

      const response = await authRequest({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/training/voice/',
        data: formData
      })

      setResult(response.data)
      console.log(result)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Describe a Word</h1>
      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <button onClick={sendAudio}>Send Audio</button>
        <h3>Result:</h3>
        {result && (
          <div>
            <h3>Result:</h3>
            <p>Score: {result.score}</p>
            <p>Word: {result.matched_word}</p>
            <p>Repeated Words: {result.repeated_words}</p>
            <p>Transcript: {result.transcribed_text}</p>
          </div>
        )}
      </div>
    </div>
  )
}