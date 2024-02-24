"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


 function Dashboard() {
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

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log(userData)
          
          if (userData.user){
            setToken(userData.token || '');
            console.log(userData.token)
            // setSession(userData.user.session.cookie || '');
            // console.log(userData.user.session.cookie)
            setUsername(userData.user.username || '');
            // setRole(userData.user.role || '');
            // console.log(userData.user.username )
          }
          else{
            console.log("userData.user is not defined")
          }
         
        } else {
          console.log("No user data found in localStorage");
        }
  }, []);


  return (
          <div>
            <div className="stats shadow">
        
              <div className="stat place-items-center">
                <div className="stat-title">Downloads</div>
                <div className="stat-value">31K</div>
                <div className="stat-desc">From January 1st to February 1st</div>
              </div>
              
              <div className="stat place-items-center">
                <div className="stat-title">Users</div>
                <div className="stat-value text-secondary">4,200</div>
                <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
              </div>
              
              <div className="stat place-items-center">
                <div className="stat-title">New Registers</div>
                <div className="stat-value">1,200</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
              </div>
      </div>
          </div>
  )
}

export default Dashboard
