export interface User {
  profile: {
    username: string;
    about: string;
    photo: string;
    coverPhoto: string;
  };
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    streetAddress: string;
    city: string;
    region: string;
    postalCode: string;
  };
  notifications: {
    email: {
      comments: boolean;
      candidates: boolean;
      offers: boolean;
    };
  };
  _id: string;
  __v: number;
}



export interface SellerAuction {
  id: number;
  seller: User;
  auction: Auction;
}

export interface Bid {
  id: number;
  auction: Auction;
  bidder: User;
  price: number;
}

export interface BuyerAuction {
  id: number;
  buyer: User;
  auction: Auction;
}

export interface Product {
  _id: number;
  title: string;
  description: string;
  image: string[]; // Change this to an array of strings
}

export interface Auction {
 _id: number;
  product: Product;
  seller: SellerAuction;
  startPrice: number;
  bestPrice: number;
  auctionCloseTime: Date;
  startDate: Date;
}


export interface CountdownTimerProps {
  targetDate: Date; // Update the type to accept a Date object
}

export interface ProuductId {
  id: number; // Update the type to accept a Date object
}
