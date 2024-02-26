"use client"
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Medicament } from './types';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);

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
    <div>
      <input
        type="text"
        placeholder="Search your medicine"
        value={searchQuery}
        onChange={handleChange}
      />
      <button onClick={() => setSearchQuery('')}>Clear</button>
      <ul>
        {medicaments.map((medicament) => (
          <li key={medicament._id}>{medicament.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
