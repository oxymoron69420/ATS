// pages/newuser.js
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      window.location.href = '/dashboard'; // will create this page next
    } else {
      setError(data.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', fontFamily: 'Arial' }}>
      <h2>AWAN Infotech</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required style={{ width: '100%', padding: 8, marginBottom: 10 }} />
        <input type="password" name="password" placeholder="Password" required style={{ width: '100%', padding: 8, marginBottom: 10 }} />
        <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p><a href="/forgot-password">Forgot Password?</a></p>

      </form>
    </div>
  );
}
