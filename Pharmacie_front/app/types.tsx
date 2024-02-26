
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  __v: number;
}

export interface Profile {
  profile: {
    username: string;
    password: string;
    confirmPassword: string;
    about?: string;
    coverPhoto?: string;
    secretCode?: string;
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
    pushNotifications: boolean;
  };
  role: 'customer' | 'admin';
}

export interface Medicament {
  _id: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  __v: number;
}

export interface Order {
  _id: string;
  customer: string;
  products: string[];
  status: 'pending' | 'processing' | 'shipped';
  totalPrice: number;
}

export interface Payment {
  _id: string;
  order: string;
  paymentMethod: string;
  transactionId: string;
  status: 'pending' | 'paid';
}

export interface Prescription {
  _id: string;
  customer: string;
  prescriptionImage: string;
  status: 'pending' | 'approved';
}

export interface Review {
  _id: string;
  product: string;
  user: string;
  rating: number;
  text: string;
}

export interface Cart {
  _id: string;
  user: string;
  products: {
    product: string;
    quantity: number;
  }[];
  totalPrice: number;
}

export interface Address {
  _id: string;
  user: string;
  type: 'shipping' | 'billing';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface MedicamentId {
  id: string;
}
