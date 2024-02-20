"use client"
import React from 'react'
import Link from 'next/link'
const SellButton = () => {
  return (
    // <div>
    //   <div className="indicator">
    //     <span className="indicator-item indicator-center indicator-middle badge badge-secondary"> <button className="btn glass"onClick="/sell">Sell</button></span> 
    //     <img alt="Tailwind CSS examples" src=".../public/auction.jpg" />
    //    </div>
    // </div>

<div className="hero min-h-screen" style={{backgroundImage: "url('/sell.jpg')"}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">GET THE BEST BID</h1>
            <p className="mb-5">The best selling expierience you can get.</p>
            <button className="btn glass"><Link href="/sell">Sell</Link></button>
            </div>
        </div>
    </div>
  )
}
export default SellButton
