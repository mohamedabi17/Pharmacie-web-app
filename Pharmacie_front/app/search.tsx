"use client"
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Medicament } from './types';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        let url = 'http://127.0.0.1:5000/pharmacie/medicaments';

        // Add search query to URL if it exists
        if (searchQuery) {
          url += `?search=${searchQuery}`;
        }

        const response = await axios.get(url);
        setMedicaments(response.data);
        console.log('Data received:', response.data); // Log the data received
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (

  <div className='grid col-span-3'>
  <div className="flex flex-row items-center justify-between">
    <div className="dropdown dropdown-bottom">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <button  className="btn btn-ghost btn-circle cursor-pointer w-8 h-8 text-white"
          onClick={() => setSearchQuery('')} >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
      </div>
      {isDropdownOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {medicaments.map((medicament) => (
            <li key={medicament._id}>
              <a href={`/overview/${medicament._id}`}>{medicament.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="flex flex-row items-center">
      <img
        src="clear.png"
        alt="Clear"
        className="cursor-pointer w-8 h-8 mr-1"
        onClick={() => setSearchQuery('')}
      />
      <input
        type="text"
        placeholder="Search your medicine"
        value={searchQuery}
        onChange={handleChange}
        className="focus:outline-none border-none bg-transparent"
      />
    </div>
  </div>
</div>

    
  );
}

export default Search;

