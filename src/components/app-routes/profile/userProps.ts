export interface UserProps {
  address: string | undefined;
  age: number | undefined;
  avatar: any | null | undefined;
  bio: string | undefined;
  company: string | undefined;
  email: string | undefined;
  name: string | undefined;
  orders: any[] | null | undefined;
  phone: any | number | undefined;
  rating: number | any;
  revenue: number | undefined;
  socketId: any | null | undefined;
  userType: "Admin" | "Business" | "Demo" | "Provider Guest" | null | undefined;
};