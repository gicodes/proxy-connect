export interface ConnectProps {
  location: [ number, number ] | any | undefined;
  address: string;
  age: number;
  bio: string;
  distance: number | string;
  online: boolean;
  username: string;
  userType: "Admin" | "Business" | "Individual" | "Demo" | null;
  rating: number;
  revenue: number;
  service: string;
}

export type Coordinates = [
  number,
  number
 ] | null;