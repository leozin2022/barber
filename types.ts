
export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  popular?: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    week: string;
    saturday: string;
  };
}
