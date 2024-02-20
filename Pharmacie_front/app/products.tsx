"use client";
import CountdownTimer from "./components/CountdownTimer";
import Preview from "./Preview";
import { Auction } from './types'; // Assuming you have an Auction type
import { useEffect, useState } from "react";

const Products = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/dlala_auction/auctions`);
        const data = await res.json();
        console.log(data)

        if (!Array.isArray(data)) {
          console.error("Invalid response format. Expected an array.");
          return;
        }

        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, []);

  return (
<div>
  <div className="mx-auto mb-20 max-w-2xl" style={{ maxWidth: "120rem" }}>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {auctions.map((auction) => (
        <div key={auction._id} className="flex flex-col min-h-screen mb-20">
          <div className="card-body">
            <div className="carousel">
              {auction.product.image.map((imageUrl, index) => (
                <div key={index} className="carousel-item h-full">
                  <img src={imageUrl} alt={`Carousel Item ${index + 1}`} width={500} height={500} />
                </div>
              ))}
            </div>
            <div className="card-details">
              <h2 className="card-title">{auction.product.title}</h2>
              <div className="badge badge-secondary">
                start Price {auction.startPrice}$
              </div>
              <p style={{margin: '10% 0'}} >{auction.product.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  <CountdownTimer targetDate={auction.auctionCloseTime} />
                </div>
                <div className="badge badge-outline  " />
                <Preview  id={auction._id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


  );
};

export default Products;
