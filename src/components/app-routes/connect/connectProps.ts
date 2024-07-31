export interface ConnectProps {
  address: string;
  bio: string;
  distance: number | string | null | undefined;
  online: boolean;
  username: string;
  userType: "Admin" | "Business" | "Individual" | "Demo" | "Provider Guest" | null;
  rating: number | any;
  revenue: number;
  service: string;
}

export type Coordinates = [
  number,
  number
 ] | null;