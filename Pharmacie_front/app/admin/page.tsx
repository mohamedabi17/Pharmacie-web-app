"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [sessionID, setSession] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignOut = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');

    // Reset state variables related to user
    setToken('');
    setSession('');
    setUsername('');
    setIsAdmin(false);

    // Redirect to the login page or any other desired page
    router.push('/login');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log(userData);
      if (userData.user) {
        setToken(userData.token || '');
        console.log(userData.token);
        setSession(userData.user.session.cookie || '');
        console.log(userData.user.session.cookie);
        setUsername(userData.user.user.username || '');
        console.log(userData.user.user.username);

        // Check if the user is an admin
        if (userData.user.user.role === 'admin') {
          setIsAdmin(true);
        }
      } else {
        console.log('userData.user is not defined');
      }
    } else {
      console.log('No user data found in localStorage');
    }
  }, []);

  if (!isAdmin) {
    // If the user is not an admin, render a message or redirect to another page
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  // If the user is an admin, render the admin page
  return (
    <div>
      <div className="dashboard">
        {/* Dashboard content for admin users */}
      </div>
    </div>
  );
};

export default Page;
