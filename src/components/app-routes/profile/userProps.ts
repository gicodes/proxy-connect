export interface UserProps {
  id: any | string | null;
  address: string;
  age: number;
  avatar: any | null;
  bio: string;
  company: string;
  email: string;
  name: string;
  orders: any[] | null | undefined;
  phone: any | number;
  rating: number;
  revenue: number;
  socketId: any | string | null;
  userType: "Admin" | "Business" | "Demo" | "Provider Guest" | null;
};