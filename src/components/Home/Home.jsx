
import { Link } from 'react-router';

export default function Home({ user }) {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Section 1: Welcome Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginBottom: '50px',gap: '40px',flexWrap: 'wrap'}}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '10px', color: '#2c3e50' }}>
            Welcome to SpeakEase! 🎤
          </h1>
          <p style={{ fontSize: '18px', color: '#7f8c8d', fontStyle: 'italic' }}>
            Your journey to confident and fluent speaking starts here
          </p>
        </div>
        
      </div>

      {/* Section 2: What is SpeakEase */}
      <div style={{ marginBottom: '50px', padding: '40px', background: '#f8f9fa', borderRadius: '15px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#2c3e50', textAlign: 'center' }}>
          What is SpeakEase? 🤔
        </h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          SpeakEase is an innovative AI-powered platform designed to help individuals improve their speaking fluency and communication skills. 
          Using advanced voice analysis and personalized feedback, we help you overcome speaking challenges, boost your confidence, 
          and express yourself more clearly. Whether you're preparing for a presentation, improving your pronunciation, 
          or simply want to communicate more effectively, SpeakEase is here to guide you every step of the way.
        </p>
      </div>

      {/* Section 3: SpeakEase Benefits */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '40px', color: '#2c3e50', textAlign: 'center' }}>
          SpeakEase Benefits ✨
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px',flexWrap: 'wrap',alignItems: 'center'}}>
          <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',color: 'white',padding: '20px',textAlign: 'center',boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎯</div>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>Improve Pronunciation</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: '0.9' }}>Master clear speech</p>
          </div>

          <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',color: 'white',
            padding: '20px',textAlign: 'center',boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>💪</div>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>Build Confidence</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: '0.9' }}>Speak with certainty</p>
          </div>

          <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',display: 'flex',flexDirection: 'column',justifyContent: 'center',
            alignItems: 'center',color: 'white',padding: '20px',textAlign: 'center',boxShadow: '0 10px 30px rgba(79, 172, 254, 0.3)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📈</div>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>Track Progress</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: '0.9' }}>See your growth</p>
          </div>
        </div>
      </div>

      {/* Section 4: Training Options */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '40px', color: '#2c3e50', textAlign: 'center' }}>
          Training Options 🚀
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px',flexWrap: 'wrap'
        }}>
          <div style={{ width: '280px',padding: '30px',border: '2px solid #667eea',borderRadius: '15px',
            textAlign: 'center',background: 'white',boxShadow: '0 5px 20px rgba(0,0,0,0.1)',transition: 'transform 0.3s'
          }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎤</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#2c3e50' }}>Voice Training</h3>
            <p style={{ fontSize: '14px', color: '#7f8c8d', lineHeight: '1.6' }}>
              Practice pronunciation and speaking with AI-powered feedback
            </p>
          </div>

          <div style={{ width: '280px',padding: '30px',border: '2px solid #f093fb',borderRadius: '15px',textAlign: 'center',background: 'white',boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s'
          }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>💡</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#2c3e50' }}>Tips & Tricks</h3>
            <p style={{ fontSize: '14px', color: '#7f8c8d', lineHeight: '1.6' }}>
              Learn expert techniques to improve your speaking skills
            </p>
          </div>

          <div style={{ width: '280px',padding: '30px',border: '2px solid #4facfe',borderRadius: '15px',
            textAlign: 'center',background: 'white',boxShadow: '0 5px 20px rgba(0,0,0,0.1)',transition: 'transform 0.3s',opacity: '0.7'
          }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎥</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#2c3e50' }}>Video Training</h3>
            <p style={{ fontSize: '14px', color: '#7f8c8d', lineHeight: '1.6' }}>
              Coming soon! Facial expression and body language analysis
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/training" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '18px 50px',fontSize: '20px',fontWeight: 'bold',background: 'yellow',
              color: 'white',border: 'none',borderRadius: '50px',
            }}
            
           >
              Start Training Now! 🚀
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}