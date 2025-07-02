// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    const token = cookie?.split('=')[1];
  
    console.log("Full cookie:", document.cookie);
    console.log("Extracted token:", token);
  
    if (!token) {
      router.push('/');
      return;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded JWT Payload:", payload);
      setUserId(payload.userId);
    } catch (err) {
      console.error('Invalid token:', err.message);
      router.push('/');
    }
  }, []);
  

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AWAN Infotech</h1>
      {userId ? (
        <>
          <p>Welcome, user ID: <strong>{userId}</strong></p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
