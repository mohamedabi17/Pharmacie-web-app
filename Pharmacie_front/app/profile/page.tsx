"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types'

const UserProfile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.user) {
        setUserId(userData.user.id || '');
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dlala_auction/users/${userId}`);
        const data = await response.json();
        setUserData(data);
        console.log(data)
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

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {userData.profile.username}</p>
      <p>About: {userData.profile.about}</p>
      <p>Photo: {userData.profile.photo}</p> 
      <p>Cover Photo: {userData.profile.coverPhoto}</p>
      <p>First Name: {userData.personalInfo.firstName}</p>
      <p>Last Name: {userData.personalInfo.lastName}</p>
      <p>Email: {userData.personalInfo.email}</p>
      <p>Country: {userData.personalInfo.country}</p>
      <p>Street Address: {userData.personalInfo.streetAddress}</p>
      <p>City: {userData.personalInfo.city}</p>
      <p>Region: {userData.personalInfo.region}</p>
      <p>Postal Code: {userData.personalInfo.postalCode}</p>
      <p>Email Notifications:</p>
      <ul>
        <li>Comments: {userData.notifications.email.comments ? 'On' : 'Off'}</li>
        <li>Candidates: {userData.notifications.email.candidates ? 'On' : 'Off'}</li>
        <li>Offers: {userData.notifications.email.offers ? 'On' : 'Off'}</li>
      </ul>
    </div>
  );
};

export default UserProfile;
