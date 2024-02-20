"use client"
import React from 'react'
import { useEffect, useState } from "react";
const Animation = () => {
  const terms = ["BID", "SELL", "BUY"];
  const [currentTermIndex, setCurrentTermIndex] = useState(0);

     useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTermIndex((prevIndex) => (prevIndex + 1) % terms.length);
    }, 800); // Change term every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        
          <style jsx>{`
        .rolling-text {
          display: inline-block;
          overflow: hidden;
        }

        .rolling-item {
          display: inline-block;
          animation: roll 2s infinite;
        }

        @keyframes roll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          20% {
            transform: translateY(-30px);
            opacity: 1;
          }
          80% {
            transform: translateY(30px);
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0;
          }
        }
      `}</style>
      
            <div className="diff aspect">
        <div className="diff-item-1">
            <div className="bg-primary text-primary-content text-9xl font-black grid place-content-center">{terms[currentTermIndex]}</div>
        </div>
        </div>
    </div>
  )
}

export default Animation
