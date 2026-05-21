import { useState } from 'react'
import axios from 'axios'
import './App.css'

const API = "http://192.168.236.130/api"

function App() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ email: '', username: '', password: '' })
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    setStatus(null)
    setLoading(true)
    try {
      if (mode === 'register') {
        await axios.post(`${API}/register`, {
          email: form.email,
          username: form.username,
          password: form.password,
        })
        setStatus({ type: 'success', message: 'Account created! You can now log in.' })
        setMode('login')
        setForm({ email: '', username: '', password: '' })
      } else {
        const { data } = await axios.post(`${API}/login`, {
          email: form.email,
          password: form.password,
        })

        console.log(data)

        setStatus({ type: 'success', message: `Welcome back, ${data.user?.username || 'user'}!` })
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.'
      setStatus({ type: 'error', message: msg })
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (next: 'login' | 'register') => {
    setMode(next)
    setStatus(null)
    setForm({ email: '', username: '', password: '' })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0f;
          min-height: 100vh;
          font-family: 'DM Mono', monospace;
        }

        .auth-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #0a0a0f;
        }

        .panel-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 64px;
          overflow: hidden;
          background: #0d0d14;
          border-right: 1px solid #1e1e2e;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,.07) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 { width: 340px; height: 340px; background: rgba(99,102,241,.18); top: -60px; left: -80px; }
        .orb-2 { width: 220px; height: 220px; background: rgba(168,85,247,.12); bottom: 80px; right: -40px; }

        .brand {
          position: relative;
          z-index: 1;
        }
        .brand-mark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #e2e2f0;
          letter-spacing: -.3px;
        }
        .brand-icon {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .brand-icon svg { width: 18px; height: 18px; }

        .hero-block { position: relative; z-index: 1; }
        .hero-label {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 800;
          line-height: 1.05;
          color: #e2e2f0;
          margin-bottom: 20px;
        }
        .hero-title span {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: 13px;
          color: #5a5a7a;
          line-height: 1.7;
          max-width: 360px;
        }

        .features { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; }
        .feature { display: flex; align-items: center; gap: 12px; font-size: 12px; color: #4a4a6a; }
        .feature-dot {
          width: 6px; height: 6px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 50%; flex-shrink: 0;
        }

        .panel-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: #0a0a0f;
        }

        .auth-card { width: 100%; max-width: 400px; }

        .card-header { margin-bottom: 40px; }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #e2e2f0;
          margin-bottom: 6px;
        }
        .card-sub { font-size: 12px; color: #3a3a5a; }

        .tabs {
          display: flex;
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 36px;
          gap: 4px;
        }
        .tab {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 7px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .2s;
          font-weight: 500;
        }
        .tab-active {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          box-shadow: 0 4px 20px rgba(99,102,241,.35);
        }
        .tab-inactive { background: transparent; color: #3a3a5a; }
        .tab-inactive:hover { color: #6a6a8a; }

        .fields { display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px; }

        .field { display: flex; flex-direction: column; gap: 6px; }
        .field-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #3a3a5a;
          font-weight: 500;
        }
        .field-input {
          width: 100%;
          padding: 14px 16px;
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 8px;
          color: #e2e2f0;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .field-input::placeholder { color: #2a2a40; }
        .field-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,.12);
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .5px;
          cursor: pointer;
          transition: opacity .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 4px 24px rgba(99,102,241,.3);
        }
        .submit-btn:hover:not(:disabled) {
          opacity: .92;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(99,102,241,.4);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: .5; cursor: not-allowed; }

        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin .6s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .status-msg {
          margin-top: 20px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 12px;
          line-height: 1.5;
          animation: fadeIn .25s ease;
        }
        .status-success {
          background: rgba(34,197,94,.08);
          border: 1px solid rgba(34,197,94,.2);
          color: #4ade80;
        }
        .status-error {
          background: rgba(239,68,68,.08);
          border: 1px solid rgba(239,68,68,.2);
          color: #f87171;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

        .field-appear { animation: slideDown .22s ease forwards; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: none; }
        }

        .switch-link {
          margin-top: 24px;
          text-align: center;
          font-size: 12px;
          color: #3a3a5a;
        }
        .switch-link button {
          background: none;
          border: none;
          color: #6366f1;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          margin-left: 4px;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .switch-link button:hover { color: #a855f7; }

        @media (max-width: 768px) {
          .auth-root { grid-template-columns: 1fr; }
          .panel-left { display: none; }
          .panel-right { padding: 24px; align-items: flex-start; padding-top: 60px; }
        }
      `}</style>

      <div className="auth-root">
        {/* Left panel */}
        <div className="panel-left">
          <div className="grid-overlay" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />

          <div className="brand">
            <div className="brand-mark">
              <div className="brand-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              Nexus
            </div>
          </div>

          <div className="hero-block">
            <p className="hero-label">Secure Access</p>
            <h1 className="hero-title">
              Your gateway<br />to <span>everything</span>
            </h1>
            <p className="hero-sub">
              A minimal, secure auth system. Sign in to access your workspace or create a new account to get started.
            </p>
          </div>

          <div className="features">
            {['bcrypt password hashing', 'drizzle orm + postgres', 'cors-protected api', 'express json middleware'].map((f) => (
              <div className="feature" key={f}>
                <div className="feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="panel-right">
          <div className="auth-card">
            <div className="card-header">
              <h2 className="card-title">
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </h2>
              <p className="card-sub">
                {mode === 'login'
                  ? 'Enter your credentials to continue'
                  : 'Fill in the details below to get started'}
              </p>
            </div>

            <div className="tabs">
              <button
                className={`tab ${mode === 'login' ? 'tab-active' : 'tab-inactive'}`}
                onClick={() => switchMode('login')}
              >
                Login
              </button>
              <button
                className={`tab ${mode === 'register' ? 'tab-active' : 'tab-inactive'}`}
                onClick={() => switchMode('register')}
              >
                Register
              </button>
            </div>

            <div className="fields">
              <div className="field">
                <label className="field-label">Email</label>
                <input
                  className="field-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>

              {mode === 'register' && (
                <div className="field field-appear">
                  <label className="field-label">Username</label>
                  <input
                    className="field-input"
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>
              )}

              <div className="field">
                <label className="field-label">Password</label>
                <input
                  className="field-input"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            </div>

            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {status && (
              <div className={`status-msg ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                {status.message}
              </div>
            )}

            <div className="switch-link">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? 'Register' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App