"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent  } from 'react';

function Sell() {
  const [formData, setFormData] = useState({
  title: '',
  description: '',
  image: [] as string[],
  startDate: '',
  auctionCloseTime: '',
  startPrice: 0,
});


  const [sessionID, setSession] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const router = useRouter();

  const handleSignIn = () => {
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
      } else {
        console.log('userData.user is not defined');
      }
    } else {
      console.log('No user data found in localStorage');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post(
        'http://127.0.0.1:5000/dlala_auction/sell',
        formData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      console.log('Data posted successfully', response.data);
      router.push('/');
    } catch (error) {
      console.error('Error posting data', error);
    }
  };

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  if (e.target.type === 'file') {
    const fileInput = e.target as HTMLInputElement;
    const selectedFiles = fileInput.files;

    if (selectedFiles) {
      const imagesArray = Array.from(selectedFiles);
      const imagePromises = imagesArray.map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const dataUrl = reader.result as string;
            resolve(dataUrl);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((imageDataArray) => {
        setFormData((prevData) => ({
          ...prevData,
          image: [...prevData.image, ...imageDataArray],
        }));
      });
    }
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="mb-30 min-h-screen mb-20"
    >
      <div className="space-y-12 w-4/5 mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sell Your Product
          </h2>
        </div>
        <div className="border-b border-white pb-12">
          <h2 className="text-base font-semibold leading-7 white">Product Details</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 white">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="off"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 white">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="image" className="block text-sm font-medium leading-6 white">
                Image
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  id="images"
                  multiple // Allow for multiple file selection
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="startDate" className="block text-sm font-medium leading-6 white">
                Start Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="auctionCloseTime" className="block text-sm font-medium leading-6 white">
                Auction Close Time
              </label>
              <div className="mt-2">
                <input
                  type="datetime-local"
                  name="auctionCloseTime"
                  id="auctionCloseTime"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="startPrice" className="block text-sm font-medium leading-6 white">
                Start Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="startPrice"
                  id="startPrice"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 w-4/5">
          <button type="button" className="text-sm font-semibold leading-6 text-white">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Sell;
