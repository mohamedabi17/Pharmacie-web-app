"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Profile } from '../types';

const UserProfile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.user) {
        setUserId(userData.user._id || '');
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/pharmacie/users/${userId}`);
        setUserData(response.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
const date = new Date(); // Change this to the actual date

  return (
    <section className="max-w-[80%] mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg min-h-[140vh]">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{date.toDateString()}</span>
        <span className="text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </span>
      </div>
      <div className="mt-6 w-fit mx-auto">
        <img src={userData?.profile?.coverPhoto} className="rounded-full w-45" alt="profile picture" srcSet="" />
      </div>

      <div className="mt-8 ">
        <h2 className="text-white font-bold text-2xl tracking-wide">
          {userData?.personalInfo?.firstName} {userData?.personalInfo?.lastName}
        </h2>
        <p className="text-emerald-400 font-semibold mt-2.5">Active</p>
      </div>

      <div className="h-1 w-full bg-black mt-8 rounded-full">
        <div className="h-1 rounded-full w-2/5 bg-yellow-500"></div>
      </div>

      <div className="mt-3 text-white text-sm">
        <p className="text-gray-400 font-semibold">Personal Info</p>
        <p className="text-gray-400">Email: {userData?.personalInfo?.email}</p>
        <p className="text-gray-400">Country: {userData?.personalInfo?.country}</p>
        <p className="text-gray-400">Street Address: {userData?.personalInfo?.streetAddress}</p>
        <p className="text-gray-400">City: {userData?.personalInfo?.city}</p>
        <p className="text-gray-400">Region: {userData?.personalInfo?.region}</p>
        <p className="text-gray-400">Postal Code: {userData?.personalInfo?.postalCode}</p>
      </div>

      <div className="mt-3 text-white text-sm">
        <p className="text-gray-400 font-semibold">Email Notifications</p>
        <ul>
          <li className="flex items-center">
            <p className="text-gray-400">Comments:</p>
            <p className="font-semibold">{userData?.notifications?.email?.comments ? 'On' : 'Off'}</p>
          </li>
          <li className="flex items-center">
            <p className="text-gray-400">Candidates:</p>
            <p className="font-semibold">{userData?.notifications?.email?.candidates ? 'On' : 'Off'}</p>
          </li>
          <li className="flex items-center">
            <p className="text-gray-400">Offers:</p>
            <p className="font-semibold">{userData?.notifications?.email?.offers ? 'On' : 'Off'}</p>
          </li>
        </ul>
      </div>

      <div className="mt-3 text-white text-sm">
        <p className="text-gray-400 font-semibold">Storage:</p>
        <p className="text-gray-400">40%</p>
      </div>
    </section>
  );
};

export default UserProfile;