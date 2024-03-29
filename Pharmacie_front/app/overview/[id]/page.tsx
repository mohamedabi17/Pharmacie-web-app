"use client"
import React, { useState, useEffect } from "react";
import { Medicament } from "@/app/types";
import MedicamentCard from "@/app/MedicamentCard";

const Overview = ({ params: { id } }: { params: { id: number } }) => {
  const [medicament, setMedicament] = useState<Medicament | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/pharmacie/medicaments/${id}`);
        const medicamentData: Medicament = await res.json();
        setMedicament(medicamentData);
      } catch (error) {
        console.error("Error fetching medicament:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {medicament ?  (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
          <div>
            <MedicamentCard medicament={medicament} />
          </div>
          <div></div>
        </div>
      ) : (
        <>
          <span className="loading loading-infinity loading-xs"></span>
          <span className="loading loading-infinity loading-sm"></span>
          <span className="loading loading-infinity loading-md"></span>
          <span className="loading loading-infinity loading-lg"></span>
        </>
      )}
    </>
  );
};

export default Overview;

// grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 
