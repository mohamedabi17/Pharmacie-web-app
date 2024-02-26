"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Search from "./search";

export default function Navbar() {
    const router = useRouter();
    const [sessionID, setSession] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
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
  setRole('');

  // Redirect to the login page or any other desired page
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
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="">Homepage</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/sign">Sign In</Link>
              </li>
              <li>
                <Link href="/login">Log In</Link>
              </li>

              <li>
                <Link href="/buy">Buy</Link>
              </li>
              {role == "admin"&& <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>}
             
            </ul>
          </div>
          <Search/>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <img className="h-16 w-auto" src="logo_new.png" alt="pharma" />
          </Link>
        </div>
        <div className="navbar-end">
          {username ? (
            <>
              <p className="text-base-40 mr-2">{username}</p>
              <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={handleSignOut} >                Sign Out
       </button>
            </>
          ) : (
             <>
             
            <div className="avatar offline">
              <div className="w-24 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"onClick={handleSignIn}>  Sign In</button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
