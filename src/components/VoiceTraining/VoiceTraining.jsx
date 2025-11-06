import { useState, useEffect, useRef } from "react"
import { authRequest } from "../../lib/auth"
import toWav from "audiobuffer-to-wav";

export default function VoiceTraining() {

  const [word, setWord] = useState(null)
  const [audioRecord, setAudioRecord] = useState(null)
  const [result, setResult] = useState(null)
  const [wavAudio, setWavAudio] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState(null)
  const [audioDuration, setAudioDuration] = useState(0);
  const [timer, setTimer] = useState("00:05:00");


  // source helper: https://www.geeksforgeeks.org/reactjs/how-to-create-a-countdown-timer-using-reactjs/
  const Ref = useRef(null);
  const getTimeRemaining = (e) => {
    const total =
      Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor(
      (total / 1000 / 60) % 60
    );
    const hours = Math.floor(
      (total / 1000 / 60 / 60) % 24
    );
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } =
      getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9
          ? minutes
          : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    }
    // if the timer finish it should stop recording automatically 
     if (total <= 0) {
    stopRecording();           
    setRecordingStatus("done"); 
  }
  };


  const clearTimer = () => {
    setTimer("00:05:00");
    if (Ref.current) clearInterval(Ref.current);
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 300);
    return deadline;
  };

  //source helper: https://www.cybrosys.com/blog/how-to-implement-audio-recording-in-a-react-application
  async function getRandomWord() {
    try {
      const response = await authRequest({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/vocabulary/'
      })
      console.log(response.data)
      setWord(response.data)
      setResult(null);
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

      // so that not display that record done
      setRecordingStatus(null);
      // this start timer when click start record
      clearTimer();
      const deadline = getDeadTime();
      Ref.current = setInterval(() => startTimer(deadline), 1000);

      
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

    // stop the timer 
    if (Ref.current) clearInterval(Ref.current);

    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    //to set record status to done when user stop record 
    setRecordingStatus("done");
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

            //count audio duration
            const duration = audioBuffer.duration;
            setAudioDuration(duration);

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
      // reset the timer
      setTimer("00:00:00");
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
     <div style={{  border: '2px solid #667eea', borderRadius: '15px',padding: '30px',
        marginTop: '20px',background: 'white',
          }}>
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Describe a Word</h1>
      <p style={{ margin: '0 0 20px 0', color: '#7f8c8d', fontSize: '14px' }}>
        Practice describing words to improve your vocabulary and speaking fluency with AI-powered feedback.
      </p>
      <div>
        {word ? (
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', 
          textAlign: 'center',marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '48px', color: '#667eea' }}>{word.word}</h3>
          </div>
        ) : (
          <p>Loading words...</p>
        )}
       <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* change timer color to red when finish */}
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: timer === "00:00:00" ? '#dc3545' : '#2c3e50',margin: '0'
        }}>
          {timer}</h2>
          </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button 
          onClick={startRecording}
          style={{padding: '12px 30px',background: '#28a745',color: 'white',border: 'none',
            borderRadius: '8px',fontSize: '16px',fontWeight: 'bold'}}>
          Start Recording
        </button>
        
        <button 
          onClick={stopRecording}
          style={{ padding: '12px 30px',background: '#dc3545',color: 'white',border: 'none',
            borderRadius: '8px',fontSize: '16px',fontWeight: 'bold'}}>
          Stop Recording
        </button>
        </div>

        {recordingStatus === "done" && (
         <div style={{ background: '#d4edda', padding: '15px',borderRadius: '8px',marginBottom: '20px',
          textAlign: 'center',color: '#155724',fontWeight: 'bold'
        }}>
          Audio recorded successfully
        </div>
        )}

        {recordingStatus === "done" && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <button 
            onClick={sendAudio}
            style={{padding: '12px 30px',background: '#667eea',color: 'white',borderRadius: '8px',fontSize: '16px',fontWeight: 'bold'}}>
            Send for Analysis
          </button>
          <button 
            onClick={() => {
              setRecordedUrl(""); 
              setAudioRecord(null); 
              setWavAudio(null); 
              setRecordingStatus(null); 
              setTimer("00:05:00"); 
              setResult(null);
            }}
            style={{padding: '12px 30px',background: '#6c757d',color: 'white',
             borderRadius: '8px',fontSize: '16px',fontWeight: 'bold'}}>
            Delete Recording
          </button>
        </div>
      )}

        {result ? (
          <div style={{ background: 'white', padding: '25px', borderRadius: '10px',marginBottom: '20px'}}>
            <h3 style={{ margin: '0 0 20px 0', color: '#667eea', fontSize: '24px' }}>Result:</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: result.score >= 70 ? '#28a745' : result.score >= 50 ? '#ffc107' : '#dc3545',marginLeft: '10px'
            }}>Score: {result.score}%</p>
            <p style={{ marginBottom: '10px', color: '#2c3e50' }}>Rating: {result.analysis.rating}</p>
            <p style={{ marginBottom: '10px', color: '#2c3e50' }}>Words Per Minutes/WPM: {result.analysis.wpm}</p>
            <p style={{ marginBottom: '10px', color: '#2c3e50' }}>Transcript: {result.transcribed_text}</p>
            {/* source helper: https://javascript.info/keys-values-entries */}
            <p style={{ marginBottom: '10px', color: '#2c3e50' }}>
              Repeated Words:{" "}
              {Object.keys(result.analysis.repeated_words).length > 0
                ? Object.entries(result.analysis.repeated_words).map(([word, count]) => (
                  <span key={word}>{word} ({count}) </span>
                ))
                : "None"}
            </p>
            <p style={{ marginBottom: '10px', color: '#2c3e50' }}>Mispronounced Words:
              {result.analysis.mispronounced_words.length > 0 ? (
                <span>{result.analysis.mispronounced_words.join(", ")}</span>

              ) : (
                <p>None</p>
              )}
            </p>
            <p style={{ marginBottom: '10px', color: '#2c3e50' }}>Pauses: {result.analysis.pauses_percentage}%</p>
            {/* source helper: https://codelucky.com/css-border-left/#google_vignette */}
            <p style={{ marginTop: '15px', padding: '15px', background: '#f8f9fa', borderRadius: '8px',borderLeft: '4px solid #667eea'
          }}>FeedBack: {result.feedback_text}</p>
          </div>
        ) : (
          <p></p>
        )}

        <div style={{ textAlign: 'center' }}>
        <button style={{padding: '12px 30px',background: '#667eea',color: 'white',borderRadius: '8px',
            fontSize: '16px',fontWeight: 'bold'
          }}onClick={() => { stopRecording(); clearTimer(); setRecordingStatus(null); setRecordedUrl(""); setAudioRecord(null); setWavAudio(null); setResult(null); getRandomWord();}}> Describe another word </button>
          </div>
      </div>
    </div>
    </div>
  )
}