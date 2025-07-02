import { useState } from 'react';

export default function AdminLogin() {
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('/api/login?role=admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      window.location.href = '/admin/dashboard';
    } else {
      setError(data.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', fontFamily: 'Arial' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}