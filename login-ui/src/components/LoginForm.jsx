import { useState } from "react";

export default function LoginForm({ chatId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/login/${chatId}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });

    if (res.ok) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="card">
        <h2>✅ Success!</h2>
        <p>Credentials saved securely. You can now use the bot 🎉</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🔑 Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
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
      </form>
    </div>
  );
}
