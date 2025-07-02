// pages/index.js
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1>Welcome to AwanTech Recruitment Portal</h1>
      <p>Select your login role:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button onClick={() => router.push('/login/admin')}>Admin Login</button>
        <button onClick={() => router.push('/login/hr')}>HR Login</button>
        <button onClick={() => router.push('/login/newuser')}>User Login</button>
      </div>
    </div>
  );
}
