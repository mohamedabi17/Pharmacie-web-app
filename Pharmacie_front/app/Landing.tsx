"use client"
import { useState } from 'react';
import Image from 'next/image';
import Navbar from './navbar';
import ToggleBtn from './components/toogleBtn';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Function to get the value of a cookie by its name
// const getCookie = () => {
//   const cookies = document.cookie.split(';');
//   for (const cookie of cookies) {
//     const [cookieName, cookieValue] = cookie.trim().split('=');
//     if (cookieName === 'sessionID') {
//       return cookieValue;
//     }
//   }
//   return null;
// };


export default function Landing() {
    const router = useRouter();
    const [sessionID, setSession] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

  const handleSignIn = () => {
    router.push('/login');
  };


   useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log(userData)
          
          if (userData.user){
            setToken(userData.token || '');
            console.log(userData.token)
            setSession(userData.user.session.cookie || '');
            console.log(userData.user.session.cookie)
            setUsername(userData.user.user.username || '');
            console.log(userData.user.user.username )
          }
          else{
            console.log("userData.user is not defined")
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
            'url(https://news.artnet.com/app/news-upload/2016/06/christies-auction.jpg)',
        }}
      >
        <h2 >Hello, {username}!</h2>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Dlala</h1>
            <p className="mb-5 mt-5">The First online Auction in Algeria.</p>
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
