export interface UserProps {
  id: any | string;
  address: string | any;
  avatar: any;
  bio: string;
  email: string;
  name: string;
  orders: any[];
  phone: number | any;
  rating: number;
  revenue: number;
  socketId: any | string | null;
  userType: "Admin" | "Business" | "Demo" | null;
};