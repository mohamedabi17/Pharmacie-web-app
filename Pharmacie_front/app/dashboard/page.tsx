"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const [sessionID, setSession] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');



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
          setRole(userData.user.role);
          console.log(userData.user.role);
        } else {
          console.log('userData.user is not defined');
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        console.log('Stored user data:', storedUser);
      }
    } else {
      console.log('No user data found in localStorage');
    }
     if (role === "admin") {
    // If the user does not have an admin role, redirect to the homepage or any other desired page
    router.push('/'); }
 
  }, []);



  return (
<div className="hero min-h-screen bg-base-200 pb-20 mb-20">
  <Link href="/" className="btn btn-ghost text-xl">
    <img src="logo_new.png" alt="pharma" />
  </Link>
  <div className="navbar-center text-center">
    <h1 className="mb-5 text-5xl font-bold">Pharma Admin Dashboard</h1>
    <div className="flex justify-between">
      <Link href="/dashboard/sell">
        <button className="btn btn-accent">
          Sell Medicine
        </button>
      </Link>
      <button className="btn btn-primary">
        Search Stock
      </button>
      <button className="btn btn-secondary">
        Analyse Stock
      </button>
    </div>
  </div>
</div>

);

}

export default Dashboard;
