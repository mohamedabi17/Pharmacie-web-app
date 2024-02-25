"use client"
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Sell() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: [] as string[],
    quantity: 0,
    price: 0,
  });
  const [sessionID, setSession] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log(userData);

      if (userData.user) {
        setToken(token || '');
        console.log(token);
        // setSession(userData.user.session.cookie || '');
        // console.log(userData.user.session.cookie);
        setUsername(userData.user.profile.username || '');
        console.log(userData.user.profile.username);
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
        'http://127.0.0.1:5000/pharmacie/medicaments',
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
  if (e.target instanceof HTMLInputElement) {
    const { name, value, files } = e.target;


    if (name === 'images' && files) {
      const selectedFiles = Array.from(files);
      const imagePromises = selectedFiles.map((file: File) => {
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
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-30 min-h-screen mb-20">
      <div className="space-y-12 w-4/5 mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sell Your Medicament
          </h2>
        </div>
        <div className="border-b pb-12">
          <h2 className="text-base font-semibold leading-7">Medicament Details</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="image" className="block text-sm font-medium leading-6">
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
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="quantity" className="block text-sm font-medium leading-6">
                Quantity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="price" className="block text-sm font-medium leading-6">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 w-4/5">
          <button type="button" className="text-sm font-semibold leading-6">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
}
export default Sell;
