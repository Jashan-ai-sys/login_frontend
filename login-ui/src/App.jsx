import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();


  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });

    if (res.ok) {
      setMessage("✅ Login successful! Credentials saved.");
    } else {
      setMessage("❌ Login failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    setMessage("⚠️ Server error.");
  }
};


  return (
    <div className="split-container">
      {/* Left side - 70% */}
      <div className="left-side">
        {/* Content */}
        <div className={`left-content ${isLoaded ? 'loaded' : ''}`}>
          <div className="welcome-section">
            <h1>👋 Welcome</h1>
            <div className="divider"></div>
            <p>Stay updated with your LPU classes and reminders.</p>
          </div>

          {/* Modern decorative elements */}
          <div className="decoration-grid">
            <div className="decoration-item decoration-1"></div>
            <div className="decoration-item decoration-2"></div>
            <div className="decoration-item decoration-3"></div>
            <div className="decoration-item decoration-4"></div>
          </div>
        </div>

        {/* Floating background elements */}
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
        <div className="floating-element floating-4"></div>
        <div className="floating-element floating-5"></div>
      </div>

      {/* Right side - 30% */}
      <div className="right-side">
        <div className={`login-card ${isLoaded ? 'loaded' : ''}`}>
          <div className="login-header">
            <h2>🔐 LPU Login</h2>
            <div className="divider"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Registration Number"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-input"
              />
              <div className="input-icon">👤</div>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;