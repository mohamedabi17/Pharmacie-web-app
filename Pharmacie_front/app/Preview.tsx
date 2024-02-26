"use client";
import React from "react";
import Link from "next/link";
import {Medicament,User,MedicamentId} from "./types"
const Preview: React.FC<MedicamentId> = ({ id }) => {
  return (
   <Link className="btn glass flex-center absolute right-0 bottom-0 m-2" href={`overview/${id}`}>
  View
</Link>

  );
};

export default Preview;
