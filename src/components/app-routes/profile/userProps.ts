export interface UserProps {
  id: any | string;
  address: string | any;
  age: number;
  avatar: any;
  bio: string;
  company: string;
  email: string;
  name: string;
  orders: any[] | null;
  phone: number | any;
  rating: number;
  revenue: number;
  socketId: any | string | null;
  userType: "Admin" | "Business" | "Demo" | null;
};