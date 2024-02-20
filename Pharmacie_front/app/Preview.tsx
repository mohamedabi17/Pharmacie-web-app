"use client";
import React from "react";
import Link from "next/link";
import {Product,User,ProuductId,CountdownTimerProps} from "./types"
const Preview: React.FC<ProuductId> = ({ id }) => {
  return (
    <Link className="btn glass flex-center mt-5" href={`overview/${id}`}>
      View
    </Link>
  );
};

export default Preview;
