"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Landing() {
    const router = useRouter();
    const [sessionID, setSession] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
  const handleSignIn = () => {
    router.push('/login');
  };


useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      console.log(userData);
      
      if (userData.user) {
        setToken(token || '');
        setUsername(userData.user.profile.username || '');
        setRole(userData.user.role)
        console.log(userData.user.role)
      } else {
        console.log("userData.user is not defined");
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      console.log("Stored user data:", storedUser);
    }
  } else {
    console.log("No user data found in localStorage");
  }
}, []);

   return (
    <main>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(pharmacie.jpg)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Pharma</h1>
            <p className="mb-5 mt-5">The first Onligne Medicaments strore</p>
                <h2 >Hello, {username}!</h2>
            {!token && (
              <button className="btn btn-primary" onClick={handleSignIn}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
