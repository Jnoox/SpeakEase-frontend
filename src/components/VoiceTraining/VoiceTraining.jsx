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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Describe a Word</h1>
      <div>
        {word ? (
          <div>
            <div>{word.word}</div>
          </div>
        ) : (
          <p>Loading words...</p>
        )}
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <h2>{timer}</h2>
        {result ? (
          <div>
            <h3>Result:</h3>
            <p>Score: {result.score}%</p>
            <p>Rating: {result.analysis.rating}</p>
            <p>Words Per Minutes/WPM: {result.analysis.wpm}</p>
            <p>Transcript: {result.transcribed_text}</p>
            {/* source helper: https://javascript.info/keys-values-entries */}
            <p>
              Repeated Words:{" "}
              {Object.keys(result.analysis.repeated_words).length > 0
                ? Object.entries(result.analysis.repeated_words).map(([word, count]) => (
                  <span key={word}>{word} ({count}) </span>
                ))
                : "None"}
            </p>
            <p>Mispronounced Words:
              {result.analysis.mispronounced_words.length > 0 ? (
                <span>{result.analysis.mispronounced_words.join(", ")}</span>

              ) : (
                <p>None</p>
              )}
            </p>
            <p>Pauses: {result.analysis.pauses_percentage}%</p>
            <p>FeedBack: {result.feedback_text}</p>
          </div>
        ) : (
          <p></p>
        )}

        {recordingStatus === "done" && (
          <p>The audio recorded successfully</p>
        )}

        {recordingStatus === "done" && (
          <div>
            <button onClick={sendAudio}>Send</button>

            <button onClick={() => {
              setRecordedUrl(""); setAudioRecord(null); setWavAudio(null); setRecordingStatus(null); setTimer("00:05:00"); setResult(null);
            }}> Delete </button>
          </div>
        )}

        <button onClick={() => { stopRecording(); clearTimer(); setRecordingStatus(null); setRecordedUrl(""); setAudioRecord(null); setWavAudio(null); setResult(null); getRandomWord();}}> Describe another word </button>
      </div>
    </div>
  )
}