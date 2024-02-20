"use client"
import React, { useState, useEffect } from "react";
import { Auction, Product } from "@/app/types";
export interface BidsTablePrices {
  bidsprices: number[]; // Update the type to accept an array of numbers
}

export interface BidsBtnProps {
  openingPrice: number ;
  bidsprices: number[];
  onBidsUpdate: (updatedBids: number[]) => void;
}


export interface BidopeningPrice {
  openingPrice: number; // Update the type to accept a Date object
}

const Overview = ({ params: { id } }: { params: { id: number } }) => {
 
const [bidspricestab, setBidspricestab] = useState<number[]>([]);
const [auction, setAuction] = useState<Auction | null>(null);
const [product, setProduct] = useState<Product | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/dlala_auction/auctions/${id}`);
      const auctionData: Auction = await res.json();
      setAuction(auctionData);
      setProduct(auctionData?.product);

      // Add the start price to the bidspricestab array if it's not empty
      if (auctionData?.startPrice && bidspricestab.length === 0) {
        setBidspricestab([auctionData.startPrice]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  fetchData();
}, [id]);


  const handleBidsUpdate = (updatedBids: number[]) => {
    setBidspricestab(updatedBids);
    console.log("Updated Bids:", updatedBids);
  };

  return (
    <>
      {auction && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  min-h-screen mb-20">
          <div>
            <figure>
              <h1 className="text-center text-xl font-extrabold mb-5">{auction.product.title}</h1>

              <div className="h-96 carousel carousel-vertical rounded-box">
                  {auction.product.image.map((imageUrl, index) => (
                    <div key={index} className="carousel-item h-full">
                      <img  src={imageUrl} alt={`Carousel Item ${index + 1}`} width={500} height={500} />
                    </div>
                  ))}
                  </div> 
              {/* {auction.product.image.map((imageUrl, index) => (
                    <div key={index} className="carousel-item h-full">
                      <img  src={imageUrl} alt={`Carousel Item ${index + 1}`} width={500} height={500} />
                    </div>
                  ))} */}
            </figure>
          </div>
          <BidsStps bidsprices={bidspricestab} />
          <div>
            <div>
              <h1 className="text-center  text-x1 font-extrabold  mb-5">Auction Ends after</h1>
              <CountdownTimer targetDate={auction?.auctionCloseTime} />
              <div className="flex justify-end">
              <BidsBtn openingPrice={auction.startPrice} bidsprices={bidspricestab} onBidsUpdate={handleBidsUpdate} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
