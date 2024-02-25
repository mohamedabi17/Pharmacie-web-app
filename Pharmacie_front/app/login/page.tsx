"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {handleServerLogin} from './server'
const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
  
      const res = await handleServerLogin({username,password})
      console.log(res);
      if(res.user){
          localStorage.setItem('user', JSON.stringify(res.user));
          router.push('/');
      }
      else{
           setError("user is undefined");
           console.error("Login failed", error);
      }
      
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <div className="hero min-h-screen  pb-20 bg-base-200 min-h-screen mb-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="text-center lg:text-left">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-10 w-auto" src="logo_new.png" alt="Your Company" />
                  <div className="text-center lg:text-center flex-start">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                      Login to Pharma for free to get full access to view all the Medicaments details 
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              {error && (
                <div className="text-red-500 mt-2">
                  <p>{error}</p>
                </div>
              )}
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a
                  href="/sign"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Create An account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

