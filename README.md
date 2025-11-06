# SpeakEase Backend
## 💡 Project Name:
### SpeakEase

### 🎯 Project Description:
SpeakEase Backend is a Django REST Framework API that powers an AI-driven platform designed to help individuals improve their speaking fluency and communication skills. The backend handles user authentication, voice analysis, training session management, and progress tracking.

## Tech Stack

React 19.1.1

React Router 7.9.4

Axios - HTTP client

jwt-decode

JavaScript (ES6+)

CSS3 - Custom styling

@ffmpeg/ffmpeg 0.12.15 (Video/audio processing in browser)

audiobuffer-to-wav 1.0.0 (Audio conversion)

Web Audio API - Audio recording



## Backend Repo Link
https://github.com/Jnoox/SpeakEase-backend



## 🔁 Routing Table:
![alt text](image.png)


## 🎯Key Features
### Authentication:

JWT-based authentication with token refresh.

Secure login/signup with validation.

Protected routes for authenticated users.

Automatic token management (localStorage).

Logout functionality.

### Voice Training Module:

Record audio up to 5 minutes.

Real-time countdown timer (5:00).

Describe a Word exercise with random vocabulary.

Audio conversion (WebM → WAV).

Instant AI analysis with detailed feedback:

- Overall score (0-100).

- Words per minute (WPM).

- Speech rate category (Slow/Normal/Fast).

- Mispronounced words detection.

- Repeated words analysis.

- Pause percentage.

- Full transcription.

Delete and re-record capability.

New word generation.


### Tips & Tricks:

Random motivational tips.

Categories: Voice, Conversation, General.

Refresh for new tips.

Expert guidance and techniques.


### Dashboard (Progress Analytics):

Average Score - Overall performance metric.

Best Score - Highest achievement.

Worst Score - Area for improvement tracking.

Total Sessions - Training frequency.

Total Training Time - Cumulative practice duration.

Real-time data refresh.

Visual stat cards with color coding.


### Profile Management:

View account information.

Edit profile (full name, age).

Track total training time.

Account deletion with confirmation

Real-time profile updates


## 🧊 IceBox Features:
### Daily Conversation via Camera

#### Workflow:

Camera interface to record answers.

Timer for each question.

Upload video for AI analysis.

Display feedback results in charts and scores.

Why: Visual feedback improves confidence and presentation skills.

### User Goals Page

#### Workflow:

List user goals.

Add, update, or delete goals.

Track goal completion progress.

### AI Coach for Interview Training

#### Workflow:

Camera interface for interview questions.

Display AI coaching feedback per session.

Option to retry and track progress.
